# Architecture

Status: **proposed (Phase 0)**. Describes the intended design, not implemented behavior.

## Style

Modular monolith. The API and the worker are separate processes that share packages and the Prisma schema. No microservices.

```text
React + Vite Frontend
        | REST
        v
    NestJS API ------------> AI Provider (Mock / Real)
        |
        v
   PostgreSQL  <---- source of truth
        |
        v
  BullMQ / Redis  (job execution only)
        |
        v
  Background Worker
        |
        v
  SocialPublisher
     |         |
 Mock Platform  Telegram Adapter
```

## Module responsibilities

| Module          | Owns                                                                        | Must not                                           |
| --------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| auth / users    | Registration, login, password hashing, JWT, refresh rotation and revocation | Log tokens or secrets                              |
| campaigns       | Campaign CRUD, status, search                                               | Know about any platform                            |
| posts           | Drafts, versions, target destinations, editorial state                      | Contain publishing logic                           |
| social-accounts | Connected accounts, adapter binding, connection status                      | Store real credentials in plaintext                |
| publishing      | Validation, adapter dispatch, deliveries, attempts, idempotency             | Live in controllers or React                       |
| scheduling      | Schedules, enqueueing, due-job handling, recovery                           | Hold business state only in Redis                  |
| webhooks        | HMAC verification, replay protection, dedup                                 | Trust a request because of its URL                 |
| ai-content      | Provider interface, prompts, schema validation, sessions                    | Depend on publishing or frontend; publish anything |
| analytics       | Outcome and retry statistics, audit events                                  | Invent engagement metrics                          |
| common          | Config validation, logging, errors                                          |                                                    |

## Publication lifecycle (proposed)

A **Post** is content. A **Delivery** is that content going to one destination (a social account). One post has many deliveries, each with its own state and attempts.

Delivery states:

`PENDING` -> `SCHEDULED` -> `IN_PROGRESS` -> `PUBLISHED`

Failure branches from `IN_PROGRESS`:

- `RETRY_WAITING` (transient error or 429; honors `Retry-After`; bounded exponential backoff with jitter), then back to `IN_PROGRESS`.
- `FAILED` (permanent error, invalid content, auth failure, or retries exhausted).
- `RECONCILIATION_REQUIRED` (ambiguous outcome such as a timeout after send; never blindly republished).
- `CANCELLED` (user action).

Rules:

- Every state change is persisted in PostgreSQL in a transaction; BullMQ jobs carry only an identifier.
- Jobs may be delivered more than once. The worker must re-read the delivery, check its state and a version/lease, and no-op if it is stale or already terminal.
- One delivery's failure never alters another delivery's state.
- No claim of exactly-once external delivery. Idempotency applies to our own records and enqueueing.

## Idempotency (proposed)

- Client sends an `Idempotency-Key` on publish/schedule requests.
- Stored in PostgreSQL with a unique constraint on (user, key), plus a hash of the request payload.
- Same key + same payload: return the original result. Same key + different payload: `422`/`409` error.
- Concurrency handled by the unique constraint inside a transaction.
- Scope and retention window (proposed: 24 hours) to be documented when implemented.

## AI writing workflow (proposed)

1. User edits a draft; the original text is never overwritten by an AI call.
2. User requests an operation (correct, improve, review, explain, variants, adapt). The API loads the post with an ownership check and calls `AIWritingProvider`.
3. The provider response is validated against a schema. Malformed output becomes a safe error; the draft is untouched.
4. Results are stored as **suggestions** attached to an `AIWritingSession`, separate from post content.
5. The user accepts or rejects each suggestion. Accepting creates a new `PostVersion`. Undo and restore operate on versions.
6. Publishing uses only the selected post version through the normal publishing path. AI output is never published automatically.

Provider interface (illustrative, signatures to be finalized in Phase 8): `correctText`, `improveWriting`, `reviewPost`, `explainPost`, `generateVariants`, `adaptForPlatform`. Implementations: `MockAIProvider` (default, deterministic) and one real provider chosen later after checking access, pricing, privacy and Arabic quality.

## Security boundaries

- Every resource query is scoped by owner; ownership tests are required.
- Provider API keys and bot tokens exist only on the server.
- User post text is untrusted input to the AI; instructions inside it must not override system rules.
- Webhooks: HMAC over the raw body, constant-time compare, timestamp window, replay and duplicate rejection.
- Logs exclude passwords, tokens and, by default, post content.

## Timezones

All timestamps stored in UTC. The frontend converts to and from the user's local zone; the API accepts ISO 8601 with offset.

## Risks and open decisions

| Item                       | Notes                                                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Rich-text editor           | Must be evaluated for RTL, mixed text, selection/inline suggestions, accessibility, licensing. Decide in Phase 9 prep. |
| Real AI provider           | Do not assume a Claude.ai subscription includes API access. Verify access and pricing first.                           |
| Scheduling source of truth | Proposed: due time in PostgreSQL, BullMQ delayed job as the trigger, plus a periodic sweep to recover missed jobs.     |
| Version storage            | Full-text snapshots per version (simple) vs diffs. Proposed: snapshots.                                                |
| Telegram limits            | Document and test limits when the adapter is built; do not hardcode from memory.                                       |
