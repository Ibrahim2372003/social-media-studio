# Data Model Proposal

Status: **proposed (Phase 0)**. Conceptual only. The Prisma schema will be written in Phase 2 and extended per phase; entities are added when their use case is implemented.

## Entities

| Entity | Phase | Purpose |
|---|---|---|
| User | 2 | Account, password hash |
| RefreshToken | 2 | Hashed token, family id, expiry, revoked/rotated-at |
| Campaign | 3 | Name, description, goal, status; owned by User |
| Post | 3 | Content container; belongs to Campaign; owner; current version pointer; editorial status |
| PostVersion | 3 | Immutable text snapshot; source (`USER`, `AI_ACCEPTED`, `RESTORED`); parent version |
| SocialAccount | 4-5 | Platform type, display name, connection status, encrypted credentials (real platforms only) |
| Delivery | 5 | Post version -> SocialAccount; state; scheduled time; remote id; version/lease field |
| PublishAttempt | 5 | One per try: started/finished, outcome class, HTTP status, error summary, next retry time |
| IdempotencyRecord | 5 | User, key, request hash, response reference, expiry |
| WebhookEvent | 4-5 | Event id, signature status, received time, processed flag; unique on event id |
| AIWritingSession | 8 | Owner, post, operation history with retention limit |
| AISuggestion | 8 | Provider output tied to a session and a base version; status `PENDING/ACCEPTED/REJECTED` |
| AuditEvent | 10 (if justified) | Important user actions |

## Key relationships

```text
User 1--* Campaign 1--* Post 1--* PostVersion
User 1--* SocialAccount
Post 1--* Delivery *--1 SocialAccount
Delivery *--1 PostVersion
Delivery 1--* PublishAttempt
Post 1--* AIWritingSession 1--* AISuggestion
```

## Modeling rules

- Post content and AI suggestions live in different tables; a suggestion becomes content only by creating a new PostVersion on user acceptance.
- A Delivery references a specific PostVersion so later edits do not change what was scheduled.
- Unique constraints back idempotency: `(userId, key)` on IdempotencyRecord, event id on WebhookEvent.
- Every owned table carries `userId` (directly or via parent) and is queried with it.
- All timestamps are UTC.
- Migrations are committed, tested on a clean database, and destructive changes need explicit approval.
