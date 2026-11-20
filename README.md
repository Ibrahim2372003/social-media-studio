# Social Media Studio

An AI-powered social media management platform: create campaigns, write and review posts with an AI writing assistant (Modern Standard Arabic, Egyptian Arabic, English, and mixed text), schedule them, and publish them reliably across platforms.

> **Status: Phase 1 (foundation) in review.** Only the project skeleton exists: a NestJS API with a `/health` endpoint, a minimal React app, and Docker Compose for PostgreSQL and Redis. No product features (auth, database models, publishing, scheduling, AI) are implemented yet.

## Goals

- Campaign and post management with draft versions.
- AI writing assistant that preserves meaning, dialect and user control.
- Reliable publishing: idempotency, retries, rate limits, per-destination state.
- Scheduling with a separate background worker.
- Mock platform first, then a real Telegram integration.
- A React dashboard with correct RTL and mixed Arabic-English support.

The core app, tests and local development must never require a paid AI API.

## Planned stack

| Area     | Choice                                                           |
| -------- | ---------------------------------------------------------------- |
| Backend  | TypeScript, NestJS, REST, Swagger/OpenAPI                        |
| Auth     | JWT with refresh-token rotation                                  |
| Database | PostgreSQL, Prisma (versioned migrations)                        |
| Queue    | BullMQ on Redis, separate worker app                             |
| Frontend | React, Vite, Tailwind CSS, TanStack Query                        |
| Testing  | Jest, Supertest                                                  |
| DevOps   | Docker Compose (Postgres, Redis), GitHub Actions, npm workspaces |

## Getting started

Prerequisites: Node.js 22 or newer (see `.nvmrc`), npm 10+, and Docker with Docker Compose.

```bash
# 1. Install dependencies for all workspaces
npm install

# 2. Create your local environment file (placeholders only, never commit .env)
cp .env.example .env

# 3. Start PostgreSQL and Redis in Docker
npm run infra:up
docker compose ps          # both services should become "healthy"

# 4. Run the API (http://localhost:3000) and the web app (http://localhost:5173)
npm run dev:api
npm run dev:web            # in a second terminal
```

Check the API: `curl http://localhost:3000/health` returns `{"status":"ok",...}`. Swagger UI is at <http://localhost:3000/docs>. The web app proxies `/api/*` to the API during development.

In Phase 1 the API does not connect to PostgreSQL or Redis yet. They are provisioned so later phases can use them, so `/health` reports process liveness only.

Stop the infrastructure with `npm run infra:down`. Avoid `docker compose down -v`: it deletes the database volume and its data.

## Scripts

| Command                | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `npm run lint`         | ESLint over the whole repo                            |
| `npm run format:check` | Prettier check (`npm run format` to fix)              |
| `npm run typecheck`    | TypeScript type check in every workspace              |
| `npm run build`        | Build the API and web app                             |
| `npm test`             | Jest (API unit and HTTP tests), Vitest (web)          |
| `npm run check`        | Lint, format check, typecheck, build and test in turn |

CI (`.github/workflows/ci.yml`) runs lint, format check, typecheck, build and tests, and validates the Compose file.

## Repository layout

```text
apps/api    NestJS API (ESM)
apps/web    React + Vite + Tailwind CSS + TanStack Query
docs/       Master plan, architecture, data model, backlog, ADRs
```

`apps/worker`, `packages/`, `prisma/` and `apps/mock-platform` are added in the phases that need them.

## Known limitations

- NestJS 12 is ESM-only, so the API is an ES module project (`"type": "module"`, `.js` suffixes on relative imports) and its Jest tests run with `--experimental-vm-modules`.
- There is no worker, database access, authentication or product UI yet.

## Documentation

- [Master plan and roadmap](docs/master-plan.md)
- [Architecture](docs/architecture.md)
- [Data model proposal](docs/data-model.md)
- [Implementation backlog](docs/backlog.md)
- [Architecture decision records](docs/decisions/)

## Roadmap

| Phase | Name                                    | Status      |
| ----- | --------------------------------------- | ----------- |
| 0     | Architecture and project design         | Done        |
| 1     | Foundation (monorepo, API, web, Docker) | In review   |
| 2     | Database and authentication             | Not started |
| 3     | Campaigns and posts                     | Not started |
| 4     | Mock platform                           | Not started |
| 5     | Publishing engine and idempotency       | Not started |
| 6     | Scheduling and worker                   | Not started |
| 7     | Telegram integration                    | Not started |
| 8     | AI writing assistant                    | Not started |
| 9     | Dashboard and writing workspace         | Not started |
| 10    | Hardening, CI, documentation            | Not started |

## License

MIT, see [LICENSE](LICENSE).
