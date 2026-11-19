# Implementation Backlog

Ordered by the roadmap in [master-plan.md](master-plan.md). Work one small slice at a time; run checks before moving on.

## Next: Phase 1, Foundation

1. npm workspaces root with shared TypeScript config, ESLint and Prettier.
2. `apps/api`: NestJS skeleton with `/health`, validated env config, Pino logging, Swagger.
3. `docker-compose.yml` for PostgreSQL and Redis, plus `.env.example`.
4. `apps/web`: Vite + React + TypeScript + Tailwind + TanStack Query skeleton.
5. `apps/worker`: only when the first job type exists (Phase 6) unless needed sooner.
6. GitHub Actions: install, lint, typecheck, test.
7. README setup instructions verified by actually running them.

## Phase 2: Database and auth

- Prisma init, User and RefreshToken models, first migration.
- Register, login, refresh (rotation with reuse detection), logout.
- Password hashing, ownership guard pattern, seed script.
- Tests: auth boundaries, token rotation, clean-database migration.

## Phases 3-10

Tracked at the roadmap level in the master plan. Detailed tasks will be added here when each phase starts.

## Open decisions to resolve before their phase

- Rich-text editor evaluation (before Phase 9).
- Real AI provider: access, pricing, privacy, Arabic quality (before Phase 8).
- Scheduling recovery strategy details (Phase 6).
- Password hashing library choice, argon2 vs bcrypt (Phase 2).
