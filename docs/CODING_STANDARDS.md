# Coding Standards — Enterprise Banking Management System

Version: 0.1  
Status: Active  
Last Updated: 2026-08-03

---

## 1. Purpose

Shared standards for backend and frontend so the codebase stays consistent as modules grow and multiple developers contribute.

---

## 2. Language & Tooling

| Area      | Standard                            |
| --------- | ----------------------------------- |
| Language  | TypeScript (strict)                 |
| Formatter | Prettier (repo root)                |
| Linter    | ESLint flat config (per package)    |
| Commits   | Conventional Commits via Commitlint |
| Hooks     | Husky + lint-staged                 |
| Node      | >= 20                               |

---

## 3. Architecture Rules (Backend)

1. Controllers validate HTTP input and call services only.
2. Services own all business rules and orchestration.
3. Repositories are the only layer that talks to MongoDB.
4. No business logic in controllers, schemas, or DTOs.
5. Prefer feature modules under `backend/src/modules/<feature>/`.
6. Shared cross-cutting code lives in `common/`, `shared/`, `config/`, `database/`.
7. Use dependency injection; avoid static service singletons.

Layer flow:

```
Controller → Service → Repository → MongoDB
```

---

## 4. API Rules

- Base path: `/api/v1/`
- Every endpoint: validation, Swagger, auth (when Auth module lands), error handling, tests
- Consistent envelope via `ResponseInterceptor`:
  - Success: `{ success, message, data, timestamp, path? }`
  - Error: `{ success: false, message, errorCode?, errors?, timestamp, path? }`
- Use generic pagination / search / sort via `PaginationQueryDto`
- Soft delete only; never hard-delete production banking records unless explicitly designed

---

## 5. Database Rules

Every collection inherits audit fields from `BaseDocument`:

- `createdAt`, `updatedAt`
- `createdBy`, `updatedBy`
- `deletedAt`, `deletedBy`
- `status`

Add indexes for query paths used by list/filter APIs. Use transactions when updating multiple collections atomically. Avoid duplicating mutable domain data across collections.

---

## 6. Frontend Rules

- Feature folders under `src/features/<feature>/` for domain UI
- Shared UI in `components/`; screens in `pages/`; HTTP in `services/`
- Forms: React Hook Form + Zod
- Server state: TanStack Query; UI/session shell state: Redux Toolkit
- Do not call Axios directly from components; use service modules + hooks

---

## 7. Naming

| Kind                  | Convention                             |
| --------------------- | -------------------------------------- |
| Files                 | kebab-case (`health.service.ts`)       |
| Classes               | PascalCase                             |
| Interfaces / Types    | PascalCase                             |
| Functions / variables | camelCase                              |
| Constants / enums     | UPPER_SNAKE or PascalCase enum members |
| React components      | PascalCase file (`HomePage.tsx`)       |
| Env vars              | SCREAMING_SNAKE                        |

---

## 8. Git Commit Format

```
<type>(<scope>): <subject>
```

Examples:

- `feat(auth): add login endpoint`
- `fix(customers): correct soft-delete filter`
- `docs(common): update coding standards`
- `chore(docker): add redis healthcheck`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

---

## 9. Testing Expectations

For every module:

- Unit tests for services and pure utils
- Controller tests with mocked services
- Repository tests against Mongo (or approved test double)
- Integration / e2e tests for critical HTTP flows
- Cover happy path and validation / authorization failures

---

## 10. Documentation

Before implementing a module, write `docs/modules/<nn>-<name>.md` using `docs/TEMPLATE.md`. Keep it practical (roughly 3–5 pages). Update the module doc when behavior changes.
