# Social Media Studio

An AI-powered social media management platform: create campaigns, write and review posts with an AI writing assistant (Modern Standard Arabic, Egyptian Arabic, English, and mixed text), schedule them, and publish them reliably across platforms.

> **Status: Phase 0 (architecture and design). No application code exists yet.**
> Everything below describes the planned system. Nothing listed under "Planned stack" has been implemented or verified.

## Goals

- Campaign and post management with draft versions.
- AI writing assistant that preserves meaning, dialect and user control.
- Reliable publishing: idempotency, retries, rate limits, per-destination state.
- Scheduling with a separate background worker.
- Mock platform first, then a real Telegram integration.
- A React dashboard with correct RTL and mixed Arabic-English support.

The core app, tests and local development must never require a paid AI API.

## Planned stack

| Area | Choice |
|---|---|
| Backend | TypeScript, NestJS, REST, Swagger/OpenAPI |
| Auth | JWT with refresh-token rotation |
| Database | PostgreSQL, Prisma (versioned migrations) |
| Queue | BullMQ on Redis, separate worker app |
| Frontend | React, Vite, Tailwind CSS, TanStack Query |
| Testing | Jest, Supertest |
| DevOps | Docker Compose (Postgres, Redis), GitHub Actions, npm workspaces |

## Documentation

- [Master plan and roadmap](docs/master-plan.md)
- [Architecture](docs/architecture.md)
- [Data model proposal](docs/data-model.md)
- [Implementation backlog](docs/backlog.md)
- [Architecture decision records](docs/decisions/)

## Roadmap

| Phase | Name | Status |
|---|---|---|
| 0 | Architecture and project design | In progress |
| 1 | Foundation (monorepo, API, web, Docker) | Not started |
| 2 | Database and authentication | Not started |
| 3 | Campaigns and posts | Not started |
| 4 | Mock platform | Not started |
| 5 | Publishing engine and idempotency | Not started |
| 6 | Scheduling and worker | Not started |
| 7 | Telegram integration | Not started |
| 8 | AI writing assistant | Not started |
| 9 | Dashboard and writing workspace | Not started |
| 10 | Hardening, CI, documentation | Not started |

## License

MIT, see [LICENSE](LICENSE).
