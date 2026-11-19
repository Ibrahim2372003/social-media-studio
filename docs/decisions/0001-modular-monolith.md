# ADR 0001: Modular monolith with a separate worker

Status: Accepted (from master plan)

## Context
The project needs clear boundaries between publishing, AI, auth and scheduling, but is built by one developer and must stay easy to run and explain.

## Decision
One codebase with well-defined modules. The API and worker run as separate processes sharing packages and the Prisma schema.

## Consequences
- Simple local setup and refactoring.
- Module boundaries must be enforced by convention and review, since the compiler will not enforce them.
- Services can be split out later if a real need appears.
