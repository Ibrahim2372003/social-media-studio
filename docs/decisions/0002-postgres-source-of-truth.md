# ADR 0002: PostgreSQL is the source of truth; Redis only runs jobs

Status: Accepted (from master plan)

## Context

BullMQ jobs can be lost, delayed or delivered more than once.

## Decision

All business state (schedules, delivery state, attempts, idempotency) lives in PostgreSQL. Jobs carry identifiers only, and the worker re-reads state and no-ops on stale or terminal deliveries.

## Consequences

- Redis loss is recoverable by re-enqueueing from PostgreSQL.
- Slightly more database reads per job.
- Exactly-once delivery to external platforms is not claimed; ambiguous outcomes go to `RECONCILIATION_REQUIRED`.
