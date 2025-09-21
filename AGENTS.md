# AGENTS Playbook

## How to Use This File
- Open this playbook first whenever you resume work; it points to the latest sources of truth.
- Follow the quick navigation sections to jump straight to the document you need.
- Log any decisions, progress, or clarifications in the linked docs rather than here.
- When you create or rename a Markdown file, immediately add it to the relevant section below and note the change here.

## Immediate Orientation
- [README.md](README.md): High-level stack, prerequisites, and core npm scripts.
- [docs/plan.md](docs/plan.md): Ten-phase roadmap with pointers to task briefs.
- [docs/tasks/01-setup.md](docs/tasks/01-setup.md): Completed environment + tooling checklist (reference for baseline expectations).
- [docs/tasks/02-architecture.md](docs/tasks/02-architecture.md): Architecture groundwork details, routing scope, auto-imports.
- [docs/tasks/03-frontend-styles.md](docs/tasks/03-frontend-styles.md): Styling layer deliverables and Storybook expectations.
- [docs/tasks/04-ui-library.md](docs/tasks/04-ui-library.md): UI component backlog, states, testing, and Storybook rollout.

## Architecture & Runtime
- [app/README.md](app/README.md): Nuxt app structure and layout/page conventions.
- [docs/adr/ADR-0001-routing-strategy.md](docs/adr/ADR-0001-routing-strategy.md): Builder/templates/settings routing map and layout usage.
- [docs/adr/ADR-0002-runtime-config.md](docs/adr/ADR-0002-runtime-config.md): Runtime config contract, required env variables, and rollout guidance.
- [docs/adr/_template.md](docs/adr/_template.md): Boilerplate for authoring new ADRs.
- [docs/adr/README.md](docs/adr/README.md): ADR process overview and numbering.
- [docs/decisions/README.md](docs/decisions/README.md): Lightweight decision log format (feeds future ADRs).

## Styling System
- [docs/conventions/bem.md](docs/conventions/bem.md): Project BEM rules, selector patterns, and lint integration.
- [docs/tokens.md](docs/tokens.md): Design token reference synced with `assets/styles/abstracts/_tokens.scss`.
- [assets/styles/abstracts/_README.md](assets/styles/abstracts/_README.md): Guidance for tokens, mixins, and functions aggregation.
- [assets/styles/base/_README.md](assets/styles/base/_README.md): Base layer usage (reset, global defaults).
- [assets/styles/layout/_README.md](assets/styles/layout/_README.md): Layout layer responsibilities and import rules.
- [assets/styles/components/_README.md](assets/styles/components/_README.md): Component SCSS guidance and forwarding.
- [assets/styles/utilities/_README.md](assets/styles/utilities/_README.md): Utility class conventions and namespacing.
- [assets/styles/abstracts/_index.scss](assets/styles/abstracts/_index.scss): Forward map for tokens/functions/mixins (keep selectors exported here).

## UI Library & Components
- [docs/ui/components.md](docs/ui/components.md): Component inventory, MVP scope, states, accessibility, and token dependencies.
- [components/ui/README.md](components/ui/README.md): Directory conventions, generator usage, and template location.
- [docs/tasks/04-ui-library.md](docs/tasks/04-ui-library.md): (See above) Execution checklist for UI build-out and testing.

## Workflow Rules
- Keep all code identifiers, strings, and comments in English; Russian is reserved for chat discussions and any newly created Markdown files.
- Reference relevant task docs before implementing features tied to a milestone.
- Update ADRs or decisions when you diverge from existing guidance; cross-link updates here.
- Keep this playbook current: after touching any linked doc, confirm that its summary here still reflects reality.
- Mandatory: each time you add, move, or drop a `.md` file, update this playbook in the same change set and call it out in your status message.






- Added docs/tasks/notes-uiinput.md as scratchpad for UiInput work.
