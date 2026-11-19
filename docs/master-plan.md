```
# Social Media Studio
```

```
## Project Master Plan & Technical Roadmap
```

```
**Project Type:** AI-Powered Social Media Management Platform
**Repository:** https://github.com/Ibrahim2372003/social-media-studio
**Architecture:** Modular Monolith + Background Worker
**Development Approach:** Incremental, Test-Driven, Production-Oriented
**Primary Goal:** Build a complete, maintainable portfolio project that
demonstrates strong backend engineering, AI integration, asynchronous
processing, security, testing, and frontend development.
```

# `# 1. Project Vision` 

```
Social Media Studio is a platform for creating, reviewing, organizing,
scheduling, and publishing social media content across multiple platforms.
```

```
The platform combines two main capabilities:
```

```
1. **Social Media Management:** Campaigns, posts, connected accounts,
scheduling, publishing, delivery tracking, retries, and analytics.
```

```
2. **AI Writing Assistant:** An intelligent writing workspace that helps users
write, understand, correct, review, and improve posts in Arabic, Egyptian
Arabic, English, and mixed Arabic-English text.
```

```
The AI assistant is a core product capability, not an isolated chatbot or a
feature added at the end of development.
```

```
However, the AI functionality must be integrated into the original architecture
and roadmap without replacing the publishing engine, background jobs, database
design, mock platform, authentication, or other essential engineering
requirements.
```

```
The project must remain useful even when no external AI provider is configured.
Core features, automated tests, and development workflows must not depend on a
paid AI API.
```

# `## 1.1 Main Product Goals` 

- `Create and manage social media campaigns.` 

- `Draft and edit posts for different platforms.` 

- `Review and improve posts using AI.` 

- `Correct spelling, grammar, punctuation, and clarity.` 

- `Preserve the user's intended meaning, writing style, and dialect.` 

- `Adapt content to the audience, platform, and communication goal.` 

- `Manage multiple social accounts.` 

- `Publish immediately or schedule posts for later.` 

- `Track publication status and individual delivery attempts.` 

- `Handle retries, rate limits, duplicate requests, and failures safely.` 

- `Integrate a real social platform after establishing a reliable mock implementation.` 

- `Provide a modern dashboard for managing the complete workflow.` 

- `Demonstrate professional software engineering through architecture, tests, documentation, CI, and security.` 

# `# 2. Core Technology Stack` 

```
The following stack is the agreed foundation. Do not replace it with a different
stack without explaining the technical reason and receiving approval.
```

# `## 2.1 Backend` 

- `**Language:** TypeScript` 

- `**Framework:** NestJS` 

- `**API Style:** REST` 

- `**API Documentation:** Swagger / OpenAPI` 

- `**Validation:** DTO validation using `class-validator` and `classtransformer`, where appropriate` 

- `**Authentication:** JWT-based authentication with refresh-token rotation` 

- `**Logging:** Structured logging using Pino or a suitable NestJS-compatible solution` 

```
- **Testing:** Jest and Supertest
```

```
## 2.2 Frontend
```

```
- **Framework:** React
```

- `**Build Tool:** Vite` 

- `**Styling:** Tailwind CSS` 

- `**API State:** TanStack Query` 

- `**Language:** TypeScript` 

- `**UI Requirements:** Responsive, accessible, maintainable, and suitable for a professional portfolio` 

```
A rich-text editor must be evaluated for the AI writing workspace. Before
selecting one, compare its support for:
```

- `Arabic and right-to-left text.` 

- `Mixed Arabic-English content.` 

- `Text selection and inline suggestions.` 

- `Accessibility and keyboard navigation.` 

- `Editor extensibility.` 

- `Licensing and maintenance.` 

- `Integration with React.` 

- `Do not choose an editor simply because it is popular.` 

- `## 2.3 Database and Background Processing` 

```
- **Primary Database:** PostgreSQL
```

- `**ORM:** Prisma` 

- `**Schema Management:** Version-controlled Prisma migrations` 

- `**Queue:** BullMQ` 

- `**Queue Backend:** Redis` 

- `**Background Processing:** A separate worker application` 

```
PostgreSQL is the source of truth for application data and publication state.
Redis and BullMQ manage asynchronous job execution.
```

```
Redis must not become the only place where important business state is stored.
```

```
## 2.4 Development and DevOps
```

- `Docker and Docker Compose` 

- `Git and GitHub` 

- `GitHub Actions` 

- `npm Workspaces` 

- `Environment-based configuration` 

- `Automated linting, type checking, and tests` 

- `Reproducible local development setup` 

```
Initially, run the NestJS API, React application, and worker directly on Windows
when convenient. Use Docker Compose for PostgreSQL and Redis to keep local
development understandable.
```

```
Containerizing the entire application can be introduced later if it provides a
```

# `concrete benefit.` 

```
## 2.5 AI Integration
```

```
AI functionality must be accessed through a provider-independent interface.
```

```
The application must support:
```

- `A mock AI provider for deterministic tests.` 

- `A configurable real AI provider.` 

- `Structured responses validated by application code.` 

- `Timeouts and controlled retries.` 

- `Usage limits and appropriate error handling.` 

- `Versioned prompts.` 

- `Protection against exposing provider API keys to the browser.` 

```
Do not assume that a Claude.ai subscription includes API credits or access.
Verify provider access and pricing before choosing a real provider.
```

```
Do not make a paid AI API mandatory for installing, running, testing, or
demonstrating the core application.
```

# `# 3. Architecture` 

```
Use a **Modular Monolith** as the primary application architecture.
```

```
Do not begin with microservices. Keep related business capabilities in well-
defined modules, with explicit responsibilities and interfaces.
```

```
The API and worker can run as separate processes while sharing application
packages and database models.
```

```
## 3.1 High-Level Architecture
```

```
```text
React + Vite Frontend
          |
          | REST API
          v
     NestJS API
          |
          +-------------------+
          |                   |
          v                   v
     PostgreSQL          AI Provider
          |              (Mock / Real)
          |
          v
     BullMQ / Redis
          |
          v
     Background Worker
          |
          v
    SocialPublisher
          |
          +----------------------+
          |                      |
          v                      v
    Mock Platform          Telegram Adapter
```
```

```
The architecture must keep these responsibilities separate:
```

- `User interface and editor state.` 

- `Authentication and authorization.` 

- `Campaign and post management.` 

- `AI writing assistance.` 

- `Scheduling and background processing.` 

- `Social platform integrations.` 

- `Publication state and delivery attempts.` 

- `Webhook verification and processing.` 

- `Analytics and audit events.` 

```
The AI assistant helps prepare content. It must not bypass normal post ownership
checks, publication validation, scheduling, or publishing safeguards.
```

```
AI-generated content must never be published automatically without explicit user
authorization.
```

```
## 3.2 Recommended Monorepo Structure
```

```
This is the intended direction, not a requirement to generate every directory
immediately.
```

```
```text
social-media-studio/
âââ apps/
â   âââ api/
â   â   âââ src/
â   â       âââ auth/
â   â       âââ users/
â   â       âââ campaigns/
â   â       âââ posts/
â   â       âââ social-accounts/
â   â       âââ publishing/
â   â       âââ scheduling/
â   â       âââ webhooks/
â   â       âââ ai-content/
â   â       âââ analytics/
â   â       âââ common/
â   âââ worker/
â   â   âââ src/
â   âââ web/
â   â   âââ src/
â   âââ mock-platform/
â       âââ src/
âââ packages/
â   âââ contracts/
â   âââ config/
âââ prisma/
â   âââ schema.prisma
â   âââ migrations/
âââ docs/
â   âââ architecture.md
â   âââ api.md
â   âââ security.md
â   âââ testing.md
â   âââ decisions/
âââ tests/
â   âââ integration/
â   âââ e2e/
âââ .github/
â   âââ workflows/
âââ docker-compose.yml
âââ package.json
```

```
âââ .env.example
âââ .gitignore
âââ README.md
```

```
Use the existing repository as the starting point. Inspect its current contents
before deciding how to create or reorganize files.
```

```
Do not delete or overwrite existing work merely to match this proposed
structure.
```

```
Do not create empty modules, meaningless placeholder files, or unnecessary
abstractions.
```

- `# 4. Core Product Modules` 

```
## 4.1 Authentication and Users
```

```
Responsibilities:
```

- `Registration and login.` 

- `Password hashing.` 

- `JWT access tokens.` 

- `Refresh-token rotation.` 

- `Refresh-token revocation.` 

- `User profile management.` 

- `Authorization and resource ownership.` 

- `Secure authentication error handling.` 

```
Requirements:
```

- `Users must only access their own campaigns, posts, accounts, and related records unless a future collaboration feature explicitly permits shared access.` 

- `Never store plaintext passwords.` 

- `Never expose refresh tokens or secrets in logs.` 

- `Add tests for authentication and authorization boundaries.` 

```
## 4.2 Campaign Management
```

```
Responsibilities:
```

- `Create, read, update, and delete campaigns.` 

- `Store campaign names, descriptions, goals, and relevant metadata.` 

- `Associate posts with campaigns.` 

- `Track campaign status.` 

- `Filter and search campaigns.` 

```
Campaign management must be independent of any specific social platform.
```

```
## 4.3 Post Management
```

# `Responsibilities:` 

- `Create and edit drafts.` 

- `Associate posts with campaigns.` 

- `Select target platforms and social accounts.` 

- `Store scheduling information.` 

- `Track editorial and publication states.` 

- `Save draft versions where appropriate.` 

- `Support AI-assisted editing without losing the original text.` 

```
A post and its delivery to a platform are not the same entity.
```

```
One post may have several destinations, each with its own publication status and
delivery attempts.
```

```
## 4.4 Social Account Management
```

```
Responsibilities:
```

- `Register and manage connected social accounts.` 

- `Associate accounts with supported platform adapters.` 

- `Track connection status.` 

- `Store credentials securely when real integrations are introduced.` 

- `Support disconnection and credential revocation where applicable.` 

```
The mock platform must work without requiring real social account credentials.
```

```
## 4.5 Publishing Engine
```

```
Responsibilities:
```

- `Validate a post before publishing.` 

- `Send the post to the correct platform adapter.` 

- `Record publication results.` 

- `Track individual delivery attempts.` 

- `Handle rate limits and transient failures.` 

- `Prevent duplicate publication when the supported idempotency guarantees permit it.` 

- `Preserve independent results for multiple destinations.` 

```
Publishing logic must not be embedded in controllers or React components.
```

```
## 4.6 Scheduling and Worker
```

```
Responsibilities:
```

- `Schedule future posts.` 

- `Execute due publication jobs.` 

- `Recover from worker restarts.` 

- `Handle retries and delayed jobs.` 

- `Persist job-related business state in PostgreSQL.` 

- `Prevent stale or duplicate jobs from causing unsafe side effects.` 

```
BullMQ jobs must be treated as potentially delivered more than once. Design
application logic to handle this safely.
```

```
## 4.7 Webhooks
```

```
Responsibilities:
```

- `Verify HMAC signatures.` 

- `Validate timestamps where the protocol supports them.` 

- `Reject invalid signatures.` 

- `Prevent replay attacks.` 

- `Handle duplicate events idempotently.` 

- `Store relevant event metadata.` 

- `Return appropriate HTTP responses.` 

```
Never trust a webhook solely because it reached the correct URL.
```

```
## 4.8 AI Content Assistant
```

```
Responsibilities:
```

```
- Correct text.
```

- `Improve writing.` 

- `Review posts.` 

- `Explain meaning and possible interpretations.` 

- `Generate alternative versions.` 

- `Adapt posts to different platforms.` 

- `Preserve user intent and writing voice.` 

- `Support iterative refinement.` 

```
The AI module must remain independent of the publishing engine and the frontend.
```

```
## 4.9 Analytics and Audit
```

```
Responsibilities:
```

- `Display publication outcomes.` 

- `Track delivery failures and retry counts.` 

- `Provide basic campaign and post statistics.` 

- `Record important user actions.` 

- `Support troubleshooting through structured logs and audit events.` 

```
Do not invent real engagement statistics when a platform does not provide them.
Clearly distinguish actual metrics from mock or calculated data.
```

```
# 5. AI Writing Assistant: Core Product Requirement
```

```
This is a major feature of the product and must be considered from the
architecture stage.
```

```
The AI assistant should help users produce better content while leaving
editorial control with the user.
```

```
## 5.1 Supported Languages and Writing Styles
```

```
The system should support:
```

- `Modern Standard Arabic.` 

- `Egyptian Arabic.` 

- `English.` 

- `Mixed Arabic-English writing.` 

- `Technical terms, product names, abbreviations, and code-related terminology.` 

```
The system must not automatically convert Egyptian Arabic into formal Arabic
unless the user requests it.
```

```
It must distinguish between a genuine spelling or grammar error and an
intentional dialect expression.
```

```
Mixed right-to-left and left-to-right text must be displayed and edited
correctly.
```

```
## 5.2 AI Writing Operations
```

```
Design the AI provider interface around operations similar to the following.
Exact TypeScript signatures should be determined during implementation.
```

```
```typescript
```

```
interface AIWritingProvider {
  correctText(input: CorrectTextInput): Promise<CorrectionResult>;
```

```
  improveWriting(input: ImproveWritingInput): Promise<WritingResult>;
```

```
  reviewPost(input: ReviewPostInput): Promise<PostReviewResult>;
```

```
  explainPost(input: ExplainPostInput): Promise<PostExplanationResult>;
```

```
  generateVariants(input: GenerateVariantsInput): Promise<WritingVariant[]>;
```

```
  adaptForPlatform(input: AdaptForPlatformInput): Promise<AdaptedPostResult>;
}
```

```
These names describe intended capabilities, not pre-existing code.
```

```
### A. Text Correction
```

```
Correct:
```

- `Spelling.` 

- `Grammar.` 

- `Punctuation.` 

- `Obvious typing errors.` 

- `Incorrect word forms.` 

- `Readability problems when appropriate.` 

```
Requirements:
```

- `Preserve meaning.` 

- `Preserve dialect unless conversion is requested.` 

- `Preserve intentional code-switching.` 

- `Avoid changing technical terminology without justification.` 

- `Report uncertain corrections rather than silently making risky changes.` 

# `### B. Writing Improvement` 

```
Allow the user to request improvements such as:
```

- `Clearer writing.` 

- `More concise writing.` 

- `More professional writing.` 

- `More friendly writing.` 

- `More persuasive writing.` 

- `Better structure and flow.` 

- `Stronger openings and endings.` 

- `A more suitable call to action.` 

```
The user should be able to specify how much rewriting is allowed.
```

```
For example, a light edit should not transform a casual Egyptian Arabic post
into a formal corporate announcement.
```

# `### C. Post Review` 

```
Review the post for:
```

- `Clarity.` 

- `Purpose.` 

- `Target audience.` 

- `Tone.` 

- `Structure.` 

- `Ambiguous statements.` 

- `Contradictions or unclear references.` 

- `Potentially misleading wording.` 

- `Weak openings and endings.` 

- `Unnecessary repetition.` 

- `Missing context.` 

```
The review should distinguish objective issues from subjective recommendations.
```

```
Each important recommendation should include:
```

`1. The relevant text or issue.` 

`2. Why it may be a problem.` 

`3. A suggested improvement.` 

`4. Whether the suggestion is a correction or a stylistic recommendation.` 

```
The assistant must not present subjective writing preferences as objective
grammatical rules.
```

# `### D. Explain a Post` 

```
Allow users to ask:
```

- `What does this post mean?` 

- `What is the main message?` 

- `What might a reader understand from it?` 

- `Which statements could be misunderstood?` 

- `What tone does it communicate?` 

- `Is the intended message clear?` 

```
The assistant should acknowledge uncertainty when a sentence has multiple
plausible interpretations.
```

# `### E. Generate Variants` 

```
Generate alternative versions for different goals, such as:
```

- `Short and direct.` 

- `Professional.` 

- `Friendly.` 

- `Persuasive.` 

- `Educational.` 

- `More engaging.` 

- `Suitable for a specific audience.` 

```
Users should be able to compare versions and select one as the basis for further
editing.
```

# `### F. Adapt for a Platform` 

```
Adapt a post according to the selected platform's supported content
requirements.
```

```
Consider:
```

- `Character limits where applicable.` 

- `Content format.` 

- `Audience expectations.` 

- `Links and hashtags.` 

- `Platform-specific constraints.` 

- `Whether the content needs a shorter or longer version.` 

```
Do not hardcode assumptions about platform limits without documenting and
testing them.
```

```
# 6. AI Writing Workspace and User Experience
```

```
The writing assistant must be part of the normal post creation and editing
workflow.
```

# `## 6.1 Editor Layout` 

```
The intended interface contains:
```

- `A main post editor.` 

- `A selected platform or destination.` 

- `Language and dialect preferences.` 

- `Audience and purpose settings.` 

- `Tone and writing style controls.` 

- `AI review and suggestion panel.` 

- `Original and suggested text comparison.` 

- `Save draft and version history controls.` 

```
A desktop layout may place the editor and AI panel side by side. On smaller
screens, use a responsive stacked layout.
```

```
Do not overcomplicate the initial interface with unnecessary animations or
decorative elements.
```

```
## 6.2 User Approval and Editing Controls
```

```
Users must be able to:
```

- `Request corrections.` 

- `Request a full review.` 

- `Ask for an explanation.` 

- `Apply an individual suggestion.` 

- `Accept or reject a suggestion.` 

- `Try another version.` 

- `Continue refining the selected version.` 

- `Undo a change.` 

- `Restore an earlier draft.` 

- `Compare the original and revised text.` 

```
The original text must not be overwritten automatically when an AI request
completes.
```

```
Never publish generated content without explicit user approval and the normal
publishing workflow.
```

# `## 6.3 AI Conversation Context` 

```
Support iterative refinement, such as:
```

`1. The user submits a draft.` 

`2. The AI reviews it.` 

`3. The user asks for a friendlier tone.` 

`4. The AI produces a revised version.` 

`5. The user asks to shorten the opening.` 

`6. The AI updates the relevant version.` 

```
Associate relevant conversation history with the draft or editing session.
```

```
Avoid sending unnecessary conversation history to the AI provider. Apply
sensible limits and document the retention policy.
```

```
Conversation context must not accidentally leak between users or unrelated
drafts.
```

# `## 6.4 Structured AI Responses` 

```
AI results must use validated structured output rather than relying on
unstructured prose for all application behavior.
```

```
An illustrative review response could contain:
```

```
```json
{
```

```
  "summary": "The main idea is understandable, but one sentence is ambiguous.",
```

- `"issues": [` 

- `{` 

- `"type": "clarity",` 

- `"severity": "medium",` 

- `"originalText": "The sentence being reviewed",` 

- `"explanation": "The reader may interpret this in two different ways.",` 

- `"suggestion": "A clearer alternative",` 

- `"category": "recommendation"` 

- `}` 

- `"suggestedText": "A revised version of the post" }` 

```
This is an illustrative contract, not a requirement to use these exact fields
unchanged.
```

```
Define schemas, validate provider responses, handle malformed responses, and
return safe errors to the frontend.
```

```
## 6.5 Text Comparison and Versions
```

```
Plan for a version-aware editing model.
```

```
At minimum, preserve:
```

- `Original draft.` 

- `User-approved edits.` 

- `AI-generated suggestions.` 

- `The currently selected draft version.` 

```
A future implementation may include inline diffs and per-suggestion acceptance.
Do not introduce a complex editor framework before confirming its requirements.
```

- `# 7. AI Provider Architecture and Safety` 

```
## 7.1 Provider Abstraction
```

```
Implement a provider interface so that the application does not depend on one AI
vendor.
```

```
The architecture should support:
```

- ``MockAIProvider` for tests and local demonstrations.` 

- `One real provider selected after research and configuration.` 

- `Provider-specific adapters behind a common interface.` 

```
Do not make vendor SDK calls directly from React components or unrelated
business modules.
```

```
## 7.2 Prompt Management
```

```
Prompts should be:
```

- `Versioned.` 

```
- Stored in a maintainable location.
```

- `Tested against representative examples.` 

- `Designed to preserve the user's intent.` 

- `Explicit about dialect and language requirements.` 

- `Explicit about the requested editing operation.` 

- `Clear about the difference between corrections and suggestions.` 

```
Do not assume that one generic prompt will produce reliable results for every
operation.
```

```
## 7.3 Reliability and Cost Controls
```

```
Implement appropriate controls for:
```

- `Request timeouts.` 

- `Rate limits.` 

- `Usage caps.` 

- `Provider errors.` 

- `Malformed structured output.` 

- `Retry behavior.` 

- `Logging without leaking sensitive content.` 

- `Cancellation or stale-response handling where appropriate.` 

```
Do not retry every AI request indefinitely.
```

```
Use a mock provider to test error cases deterministically.
```

```
## 7.4 Security and Privacy
```

- `Keep AI provider keys on the server.` 

- `Never expose secrets in frontend environment variables.` 

- `Never commit real credentials.` 

- `Do not log passwords, tokens, or sensitive user content unnecessarily.` 

- `Enforce ownership checks on drafts and AI sessions.` 

- `Treat user-submitted text as untrusted content.` 

- `Do not let instructions inside a submitted post override the application's system rules or security controls.` 

- `Document which text is sent to an external provider.` 

- `Avoid retaining more content than the product requires.` 

```
AI content is a suggestion, not an authorization decision.
```

- `# 8. Database and Domain Design` 

```
Use Prisma and PostgreSQL with version-controlled migrations.
```

```
The final schema must be designed after examining the actual use cases and
relationships. The following entities are conceptual starting points.
```

```
## 8.1 Core Entities
```

- `User` 

- `SocialAccount` 

- `Campaign` 

- `Post` 

- `Publication or Delivery` 

- `PublishAttempt` 

- `WebhookEvent` 

- `IdempotencyRecord` 

- `AIWritingSession` 

- `A version or revision entity where appropriate` 

- `AuditEvent, where justified` 

```
## 8.2 Important Modeling Decisions
```

```
A post represents the content being managed.
```

```
A publication or delivery represents the attempt to deliver that content to a
particular destination.
```

```
This separation allows one destination to fail while another succeeds.
```

```
AI-generated suggestions should not be confused with approved post content.
```

```
The data model must support ownership, auditability, scheduling, retry behavior,
and reliable status tracking.
```

```
Do not add every conceptual entity immediately. Introduce them when their use
cases are implemented.
```

# `## 8.3 Migrations` 

- `Commit Prisma migrations.` 

- `Test migrations against a clean database.` 

- `Avoid hand-editing migration history to hide schema problems.` 

- `Do not use destructive schema changes casually.` 

- `Explain data-loss risks before destructive operations.` 

- `Use seed data for reproducible development and tests.` 

```
PostgreSQL is the primary database. Do not replace it with SQLite merely to
simplify development.
```

- `# 9. Publishing Engine and Idempotency` 

```
Reliable publishing is a central engineering requirement.
```

```
## 9.1 SocialPublisher Interface
```

```
Define a platform-independent interface for publishing operations.
```

```
The interface should allow the publishing module to:
```

- `Validate supported content.` 

- `Publish content.` 

- `Return platform-specific identifiers.` 

- `Report success or failure.` 

- `Expose rate-limit information where available.` 

- `Support status reconciliation when the provider permits it.` 

```
The first implementation must be a deterministic Mock Platform adapter.
```

```
Telegram should be introduced after the publishing workflow and its failure
modes are tested.
```

# `## 9.2 Idempotency` 

```
Support idempotency keys for operations that could otherwise create duplicate
posts.
```

```
Requirements:
```

- `Repeated requests with the same key must not create duplicate application records or independently trigger duplicate publishing work.` 

- `Concurrent requests must be tested.` 

- `Store relevant idempotency state in PostgreSQL.` 

```
- Use database constraints and transactions where appropriate.
```

- `Define what happens when the same key is reused with a different request payload.` 

- `Document the scope and retention of idempotency keys.` 

```
Do not claim universal exactly-once external delivery. Network failures can
leave the system uncertain about whether a remote platform accepted a request.
```

```
For ambiguous outcomes, use a state such as `UNKNOWN` or
```

```
`RECONCILIATION_REQUIRED` when the platform cannot confirm the result. Do not
blindly republish and risk creating duplicates.
```

```
## 9.3 Multiple Destinations
```

```
A post may target multiple platforms.
```

```
Track the outcome for each destination independently.
```

```
A failure on one destination must not erase a successful result on another
destination.
```

# `# 10. Scheduling and Background Jobs` 

```
Use BullMQ and Redis for asynchronous processing.
```

```
## 10.1 Scheduling Requirements
```

- `Schedule posts for a future time.` 

- `Validate scheduling input.` 

- `Store the intended schedule in PostgreSQL.` 

- `Enqueue jobs reliably.` 

- `Handle jobs that become due.` 

- `Track publication status.` 

- `Handle retries and delayed execution.` 

- `Recover from worker restarts.` 

- `Prevent duplicate jobs from causing unsafe side effects.` 

```
Use a consistent timezone strategy. Store timestamps in UTC and clearly define
how the frontend presents and accepts local time.
```

```
## 10.2 Retry Strategy
```

```
Differentiate between:
```

- `Transient network failures.` 

- `Rate limits.` 

- `Authentication failures.` 

- `Invalid content.` 

- `Permanent platform errors.` 

- `Ambiguous publication outcomes.` 

```
For transient failures, use bounded exponential backoff with jitter where
appropriate.
```

```
For HTTP 429 responses, honor `Retry-After` when provided.
```

```
Do not retry permanent errors indefinitely.
```

```
Persist enough information to explain why an attempt failed and what will happen
next.
```

# `# 11. Mock Platform Server` 

```
Implement a local Mock Platform Server before relying on a real social platform.
```

```
The original project requirements allow building a small Express or FastAPI mock
server, or using a compatible mock-server tool.
```

```
Use the option that integrates most naturally with the existing TypeScript
project, unless a different choice has a clear advantage.
```

```
The mock server should support deterministic scenarios such as:
```

- `Successful publication.` 

- `Rate limiting with HTTP 429.` 

- `A supplied `Retry-After` value.` 

- `Temporary server errors.` 

- `Permanent validation errors.` 

- `Duplicate requests.` 

- `Delayed responses.` 

- `Timeouts or ambiguous outcomes where testable.` 

- `Status lookup when supported by the mock contract.` 

- `Webhook callbacks with HMAC signatures.` 

```
Provide configuration or test controls so these scenarios can be reproduced
without random failures.
```

```
The mock platform is a development and testing tool, not a replacement for the
production adapter architecture.
```

# `# 12. Telegram Integration` 

```
After the mock publishing workflow is reliable, implement a real Telegram
integration.
```

```
Telegram is the first real platform candidate, not a reason to redesign the
whole publishing system.
```

```
Requirements:
```

- `Use the official Telegram Bot API.` 

- `Keep bot tokens on the backend.` 

- `Validate that the destination can be used by the configured bot.` 

- `Handle API errors and rate limits appropriately.` 

- `Record returned message identifiers where available.` 

- `Test invalid credentials and failed requests.` 

- `Document configuration and limitations.` 

- `Keep tests independent of live Telegram credentials.` 

```
Do not require Telegram credentials for the normal local development workflow.
```

- `# 13. Webhook Security` 

```
Implement HMAC-signed webhook verification for the mock platform and any
applicable integrations.
```

```
Requirements:
```

```
- Verify the signature against the raw request body when required by the
signature protocol.
```

- `Use a cryptographically appropriate HMAC implementation.` 

- `Compare signatures in constant time.` 

- `Validate timestamps where supported.` 

- `Reject invalid signatures.` 

- `Prevent replay attacks.` 

- `Deduplicate repeated events.` 

- `Avoid logging secret keys or full sensitive payloads.` 

- `Test malformed, missing, expired, and invalid signatures.` 

```
The exact signature format and canonicalization rules must be documented and
tested.
```

# `# 14. Frontend Dashboard` 

```
Build the React dashboard after the essential backend contracts and workflows
are understood.
```

```
The dashboard should eventually support:
```

- `Authentication.` 

- `Campaign management.` 

- `Post drafts.` 

- `Social account management.` 

- `Post scheduling.` 

- `Publication status.` 

- `Delivery attempts and errors.` 

- `AI-assisted writing.` 

- `AI review and suggestions.` 

- `Draft versions.` 

- `Basic analytics.` 

# `## 14.1 Writing Workspace` 

```
The writing workspace is one of the most important screens.
```

```
It should support:
```

- `Writing and editing the original post.` 

- `Selecting the target platform.` 

- `Choosing language or dialect preferences.` 

- `Selecting audience, purpose, and tone.` 

- `Running AI corrections and reviews.` 

- `Viewing explanations and suggested edits.` 

- `Comparing original and suggested content.` 

- `Accepting or rejecting changes.` 

- `Trying alternative versions.` 

- `Saving and restoring drafts.` 

```
Do not let the AI panel become a generic chat interface disconnected from the
actual post editor.
```

# `## 14.2 UI Quality` 

- `Responsive layouts.` 

- `Accessible form controls.` 

- `Useful loading and error states.` 

- `Clear feedback after saving.` 

- `No silent data loss.` 

- `Correct RTL support.` 

- `Correct mixed Arabic-English rendering.` 

- `Consistent component styling.` 

- `Practical empty states.` 

```
- No unnecessary visual effects.
```

- `# 15. Testing Strategy` 

```
Testing is part of implementation, not a final optional phase.
```

```
## 15.1 Backend Unit Tests
```

```
Test:
```

- `Business rules.` 

- `Authorization and ownership.` 

- `Idempotency behavior.` 

- `Publication state transitions.` 

- `Retry classification.` 

- `Webhook signature validation.` 

- `AI response validation.` 

- `AI provider error handling.` 

```
## 15.2 Integration Tests
```

```
Test interactions between:
```

- `NestJS and PostgreSQL.` 

- `Prisma migrations and schema.` 

- `Publishing module and mock platform.` 

- `Scheduling logic and BullMQ.` 

- `Worker and publication state.` 

- `AI module and mock AI provider.` 

```
## 15.3 End-to-End Tests
```

```
Cover the most important workflows:
```

`1. Register or authenticate a user.` 

`2. Create a campaign.` 

`3. Create a draft.` 

`4. Request an AI review.` 

`5. Apply or reject a suggestion.` 

`6. Schedule a post.` 

`7. Execute a publishing job.` 

`8. Track the delivery result.` 

`9. Handle a retryable failure.` 

`10. Verify that duplicate requests do not create unintended duplicate publications.` 

```
## 15.4 AI-Specific Tests
```

```
Create representative test cases for:
```

- `Egyptian Arabic.` 

- `Modern Standard Arabic.` 

- `English.` 

- `Mixed Arabic-English.` 

- `Technical terminology.` 

- `Intentional dialect expressions.` 

- `Ambiguous statements.` 

- `Correct text that should not be unnecessarily rewritten.` 

- `Preservation of meaning.` 

- `Invalid provider responses.` 

- `Empty input and excessively long input.` 

- `Provider timeouts.` 

```
Mock-based tests should verify application behavior without depending on
unpredictable model output.
```

```
Use a smaller, explicitly documented evaluation set for real-provider quality
tests when a provider is configured.
```

```
Do not claim that a model preserves meaning perfectly. Evaluate and document its
limitations.
```

```
# 16. Docker and Local Development
```

```
Docker should make local infrastructure reproducible.
```

```
Initially use Docker Compose for PostgreSQL and Redis.
```

```
## 16.1 Docker Learning Sequence
```

```
Before implementing infrastructure, understand:
```

- `What an image is.` 

- `What a container is.` 

- `What a volume is.` 

- `What a port mapping does.` 

- `What an environment variable is.` 

- `Why persistent database storage matters.` 

- `What Docker Compose manages.` 

```
## 16.2 Common Commands
```

```
Verify Docker installation:
```

```
```bash
docker --version
docker compose version
docker info
```
```

```
Validate Compose configuration:
```

```
```bash
docker compose config
```
Start the infrastructure:
```

```
```bash
docker compose up -d
```
Inspect running services:
```bash
docker compose ps
```
View logs:
```

```
```bash
docker compose logs -f
```
```

```
Stop services:
```

```
```bash
```

```
docker compose down
```

```
**Warning:** `docker compose down -v` removes associated volumes and can delete
local database data. Do not use it casually.
```

```
Document the local setup, environment variables, database migration commands,
seed commands, and test commands in the README.
```

```
# 17. Environment Variables and Secrets
```

```
Provide `.env.example` with placeholder values and clear explanations.
```

```
Possible configuration categories include:
```

- `Application environment and port.` 

- `Database connection.` 

- `Redis connection.` 

- `JWT configuration.` 

- `Refresh-token configuration.` 

- `Mock platform configuration.` 

- `Telegram configuration.` 

- `AI provider selection and configuration.` 

- `AI usage limits.` 

- `Webhook secrets.` 

```
Do not commit real secrets.
```

```
Do not use real credentials in example files, logs, screenshots, or automated
tests.
```

```
Validate required configuration at application startup. Optional integrations
must remain optional when their credentials are not configured.
```

# `# 18. Documentation` 

```
Maintain documentation as the architecture evolves.
```

```
Required documents:
```

- ``README.md`: overview, prerequisites, installation, setup, usage, testing, and limitations.` 

- ``docs/architecture.md`: architecture and major component responsibilities.` 

- ``docs/api.md`: API contracts or links to generated Swagger documentation.` 

- ``docs/security.md`: authentication, secrets, ownership, webhook verification, and AI privacy.` 

- ``docs/testing.md`: test strategy and execution commands.` 

- ``docs/decisions/`: important architectural decisions when justified.` 

```
The documentation must describe implemented behavior accurately.
```

```
Do not claim that an integration, security feature, test suite, or AI capability
exists until it has been implemented and verified.
```

# `# 19. Development Roadmap` 

```
The roadmap preserves the original project phases while integrating AI writing
capabilities into the appropriate stages.
```

```
## Phase 0 â Architecture and Project Design
```

```
**Goal:** Establish a realistic architecture before building features.
```

```
Tasks:
```

- `Inspect the existing GitHub repository and local files.` 

- `Confirm the current state of the repository.` 

- `Define module responsibilities and boundaries.` 

- `Document the monorepo structure.` 

- `Define the publication lifecycle.` 

- `Define the AI writing provider interface.` 

- `Design the AI writing workflow and user approval model.` 

- `Define draft/version handling at a conceptual level.` 

- `Document security boundaries and ownership rules.` 

- `Define initial database entities and relationships.` 

- `Identify risks and open decisions.` 

- `Create an implementation backlog.` 

- `Record important architectural decisions.` 

```
Deliverables:
```

- `Architecture document.` 

- `Proposed repository structure.` 

- `Core data model proposal.` 

- `Publishing lifecycle.` 

- `AI writing workflow.` 

- `Testing strategy.` 

- `Prioritized implementation tasks.` 

```
Do not build the entire application during Phase 0.
```

```
## Phase 1 â Foundation
```

```
**Goal:** Establish a working development environment and monorepo.
```

# `Tasks:` 

- `Configure npm Workspaces.` 

- `Establish TypeScript configuration.` 

- `Create the NestJS API application.` 

- `Create the React/Vite application.` 

- `Create the worker application when justified by the initial setup.` 

- `Configure formatting, linting, and type checking.` 

- `Add environment configuration.` 

- `Add Docker Compose for PostgreSQL and Redis.` 

- `Add basic health checks.` 

- `Establish a minimal GitHub Actions workflow.` 

- `Verify that the applications start successfully.` 

```
Do not implement every business module yet.
```

```
## Phase 2 â Database and Authentication
```

```
**Goal:** Establish persistent storage and user access.
```

```
Tasks:
```

- `Configure Prisma and PostgreSQL.` 

- `Create the initial schema and migrations.` 

- `Implement authentication.` 

- `Implement password hashing and token rotation.` 

- `Add user ownership checks.` 

- `Add seed data where useful.` 

- `Test database setup from a clean environment.` 

# `## Phase 3 â Campaigns and Posts` 

```
**Goal:** Implement the main content-management workflow.
```

# `Tasks:` 

- `Create campaign CRUD.` 

- `Create post CRUD.` 

- `Add draft and basic post states.` 

- `Associate posts with campaigns.` 

- `Add target-platform metadata.` 

- `Validate content and scheduling input.` 

- `Add pagination and filtering where useful.` 

- `Define the first version of draft history.` 

- `Prepare the editor/API contracts for AI-assisted editing.` 

```
AI integration should fit naturally into the post workflow, but real-provider
implementation is not required yet.
```

# `## Phase 4 â Mock Platform` 

```
**Goal:** Create a deterministic environment for publishing tests.
```

# `Tasks:` 

- `Implement the mock platform server.` 

- `Define its API contract.` 

- `Support successful publishing.` 

- `Simulate rate limits and `Retry-After`.` 

- `Simulate temporary and permanent failures.` 

- `Support testable duplicate requests.` 

- `Define webhook callback behavior.` 

- `Document the mock scenarios.` 

```
## Phase 5 â Publishing Engine and Idempotency
```

```
**Goal:** Make publishing safe and testable.
```

# `Tasks:` 

- `Define the `SocialPublisher` interface.` 

- `Implement the mock adapter.` 

- `Track each destination independently.` 

- `Persist publication attempts.` 

- `Implement idempotency.` 

- `Test concurrent duplicate requests.` 

- `Handle permanent and transient errors.` 

- `Handle ambiguous publication outcomes.` 

- `Add structured logs and useful error details.` 

```
## Phase 6 â Scheduling and Worker
```

```
**Goal:** Execute scheduled posts reliably.
```

```
Tasks:
```

- `Integrate BullMQ and Redis.` 

```
- Create scheduling workflows.
```

- `Implement worker processing.` 

- `Persist state transitions in PostgreSQL.` 

- `Handle retries and delayed jobs.` 

- `Honor `Retry-After`.` 

- `Recover from worker restarts.` 

- `Test duplicate job delivery.` 

- `Document operational behavior.` 

# `## Phase 7 â Real Platform Integration` 

```
**Goal:** Add a real publishing destination without redesigning the engine.
```

```
Tasks:
```

- `Implement the Telegram adapter.` 

- `Configure bot credentials securely.` 

- `Handle API errors and rate limits.` 

- `Store remote identifiers where available.` 

- `Document platform limitations.` 

- `Keep automated tests independent of live credentials.` 

```
## Phase 8 â AI Writing Assistant
```

```
**Goal:** Implement the AI capabilities as a reusable backend module.
```

# `Tasks:` 

- `Define AI request and response schemas.` 

- `Implement `AIWritingProvider`.` 

- `Implement `MockAIProvider`.` 

- `Implement text correction.` 

- `Implement writing improvement.` 

- `Implement post review.` 

- `Implement post explanation.` 

- `Implement alternative generation.` 

- `Implement platform adaptation.` 

- `Validate structured responses.` 

- `Version prompts.` 

- `Add timeouts, limits, and error handling.` 

- `Add language-specific test cases.` 

- `Integrate the AI operations with saved drafts.` 

- `Preserve the original post and user approval workflow.` 

```
Select a real provider only after evaluating access, pricing, privacy, language
quality, and operational requirements.
```

```
## Phase 9 â Dashboard and Writing Workspace
```

```
**Goal:** Deliver the user-facing application.
```

# `Tasks:` 

- `Build authentication screens.` 

- `Build campaign and post management.` 

- `Build the writing workspace.` 

- `Integrate the rich-text editor.` 

- `Implement the AI review panel.` 

- `Show original and suggested content.` 

- `Add Accept, Reject, and Try Again controls.` 

- `Add version history and restoration.` 

- `Support RTL and mixed-direction text.` 

- `Add scheduling and publication status views.` 

- `Add useful loading, error, and empty states.` 

- `Add basic analytics.` 

```
The dashboard may be developed incrementally earlier when useful, but its
complete workflow should build on stable API contracts.
```

```
## Phase 10 â Hardening, CI, and Documentation
```

```
**Goal:** Make the project reliable, understandable, and demonstrable.
```

```
Tasks:
```

- `Expand unit, integration, and E2E tests.` 

- `Test migrations from a clean database.` 

- `Test scheduling recovery.` 

- `Test idempotency and webhook security.` 

- `Test authentication and ownership boundaries.` 

- `Add CI checks.` 

- `Review logging and error handling.` 

- `Review secret management.` 

- `Review AI privacy and usage limits.` 

- `Improve documentation.` 

- `Prepare seed data and a repeatable demo.` 

- `Document known limitations and future improvements.` 

```
# 20. Definition of Done
```

```
A feature is not complete merely because its code exists.
```

```
Before marking a feature complete:
```

- `The intended behavior is implemented.` 

- `Inputs are validated.` 

- `Authentication and authorization are considered.` 

- `Errors are handled deliberately.` 

- `Relevant tests pass.` 

- `Type checking passes.` 

- `Existing features have not been unintentionally broken.` 

- `Documentation is updated when needed.` 

- `No real secrets are committed.` 

- `The feature can be demonstrated through a repeatable workflow.` 

```
For AI features, also verify:
```

- `The original text is preserved.` 

- `Suggestions are distinguishable from corrections.` 

- `The user controls whether to apply changes.` 

- `Provider failures do not corrupt drafts.` 

- `Language and dialect behavior is covered by tests.` 

- `The browser never receives the provider's secret key.` 

```
For publishing features, also verify:
```

- `Duplicate requests are handled safely.` 

- `Each destination has independent state.` 

- `Retry behavior is bounded and appropriate.` 

- `Ambiguous outcomes are not treated as guaranteed failures or successes.` 

- `Worker restarts do not silently lose important business state.` 

```
# 21. Working with Claude AI
```

```
Claude should act as a collaborative senior engineer and implementation partner,
```

```
not as an unrestricted code generator.
```

```
## 21.1 Before Every Implementation Task
```

```
Claude should:
```

`1. Inspect the current repository and relevant files.` 

`2. Read the README and project documentation.` 

`3. Check the current Git status.` 

`4. Identify existing implementations and unfinished work.` 

`5. Explain the proposed change and its reason.` 

`6. Identify the files likely to be affected.` 

`7. Identify security, data-loss, compatibility, and testing risks.` 

`8. Implement only the agreed scope.` 

```
Do not assume that the repository is empty or that a planned feature does not
already exist.
```

```
## 21.2 During Implementation
```

# `Claude should:` 

- `Prefer clear, maintainable TypeScript.` 

- `Follow NestJS and React conventions.` 

- `Keep controllers thin.` 

- `Keep business logic in appropriate services.` 

- `Use dependency injection where appropriate.` 

- `Avoid unnecessary abstractions.` 

- `Avoid duplicated business rules.` 

- `Use DTOs and validation for external input.` 

- `Use transactions and database constraints where needed.` 

- `Avoid silently swallowing errors.` 

- `Add meaningful tests.` 

- `Avoid unnecessary dependencies.` 

- `Explain unfamiliar architectural decisions.` 

- `Preserve the established project stack.` 

- `Avoid building future phases prematurely.` 

# `## 21.3 After Implementation` 

```
Claude should report:
```

- `What changed.` 

- `Why it changed.` 

- `Files created or modified.` 

- `Important design decisions.` 

- `Commands executed.` 

- `Tests and checks that passed.` 

- `Tests and checks that failed or could not run.` 

- `Known limitations.` 

- `Recommended next step.` 

```
Claude must never claim that a command or test passed unless it actually ran
successfully.
```

```
Claude must never claim that a GitHub commit or push occurred unless it was
actually completed and verified.
```

```
## 21.4 Preserve the Project Plan
```

```
This document is the project's master plan.
```

```
Do not replace the architecture, technology stack, or roadmap simply because
another approach is possible.
```

```
If Claude identifies a better solution:
```

`1. Explain the current approach.` 

`2. Explain the proposed alternative.` 

`3. Describe the trade-offs.` 

`4. Explain the migration cost.` 

`5. Recommend whether the change is worth making now.` 

`6. Wait for approval before making a major architectural change.` 

```
Small implementation-level improvements can be made when they preserve the
project's goals and architecture.
```

- `# 22. Immediate Next Steps` 

```
Start with Phase 0.
```

```
Do not immediately generate the entire application.
```

```
The first objective is to establish an accurate understanding of the repository
and produce an architecture and implementation backlog that fits the actual
project.
```

```
Recommended initial sequence:
```

`1. Inspect the repository and current Git state.` 

`2. Confirm which files already exist.` 

`3. Identify the minimum required foundation.` 

`4. Document the architecture and important decisions.` 

`5. Define the initial database model.` 

`6. Define the publishing contracts and lifecycle.` 

`7. Define the AI writing interface and user-approval workflow.` 

`8. Identify the first small, testable implementation task.` 

`9. Implement one coherent slice at a time.` 

`10. Run and report the relevant checks before proceeding.` 

```
The first implementation should be small enough to understand, test, and review
thoroughly.
```

- `# 23. Long-Term Success Criteria` 

```
The project should ultimately demonstrate that the developer can:
```

- `Design a maintainable backend architecture.` 

- `Build REST APIs with NestJS and TypeScript.` 

- `Model relational data with PostgreSQL and Prisma.` 

- `Use migrations safely.` 

- `Implement authentication and authorization.` 

- `Process asynchronous jobs with BullMQ and Redis.` 

- `Design idempotent publishing workflows.` 

- `Handle rate limits and failure recovery.` 

- `Verify signed webhooks.` 

- `Integrate external APIs through adapters.` 

- `Build a React dashboard.` 

- `Integrate AI through a provider-independent interface.` 

- `Design an AI-assisted editing experience that preserves user control.` 

- `Test difficult failure scenarios.` 

- `Use Docker, Git, GitHub, and CI effectively.` 

- `Write clear technical documentation.` 

- `Explain architectural decisions during a technical interview.` 

```
The goal is not simply to create many files or use many technologies.
```

```
The goal is to build a working, testable, well-documented product whose
architecture and behavior can be explained confidently.
```

