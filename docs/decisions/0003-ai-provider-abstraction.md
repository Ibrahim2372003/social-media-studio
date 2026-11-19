# ADR 0003: Provider-independent AI interface with a mock default

Status: Accepted (from master plan)

## Context
AI is a core feature, but the app, tests and demos must not depend on a paid API, and vendor access is unverified.

## Decision
AI is accessed only through an `AIWritingProvider` interface. `MockAIProvider` is the default. A real provider is added later as an adapter. Provider output is schema-validated, prompts are versioned, and keys stay on the server.

## Consequences
- Deterministic tests for success, malformed output and timeouts.
- Real-provider quality must be evaluated separately on a small documented set.
- AI output is stored as suggestions and never published without explicit user approval.
