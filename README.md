# Enterprise Banking Management System (EBMS)

Production-oriented core banking platform monorepo.

**Status:** Phase 0 — Foundation (awaiting approval before Authentication)

---

## Stack

| Area     | Technologies                                                                           |
| -------- | -------------------------------------------------------------------------------------- |
| Backend  | NestJS · TypeScript · MongoDB (Mongoose) · Redis · Swagger · Jest · Supertest          |
| Frontend | React · Vite · MUI · React Router · TanStack Query · Axios · RHF · Zod · Redux Toolkit |
| Tooling  | ESLint · Prettier · Husky · lint-staged · Commitlint · Docker                          |

---

## Repository structure

```text
.
├── backend/          NestJS Clean Architecture API
├── frontend/         React SPA
├── docs/             Design docs & standards
├── docker/           Dockerfiles & nginx
├── docker-compose.yml
└── package.json      npm workspaces root
```

---

## Prerequisites

- Node.js 20+
- npm 10+
- Docker & Docker Compose (for MongoDB/Redis and full stack)

---

## Quick start

```bash
# 1) Install dependencies (from repo root)
npm install

# 2) Environment files (never commit real secrets)
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3) Infrastructure
docker compose up -d mongo redis

# 4) Run API + UI
npm run dev
```

| Service  | URL                                 |
| -------- | ----------------------------------- |
| Frontend | http://localhost:5173               |
| API      | http://localhost:3000/api/v1        |
| Health   | http://localhost:3000/api/v1/health |
| Swagger  | http://localhost:3000/api/docs      |

---

## Useful scripts

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Backend + frontend in watch mode     |
| `npm run dev:backend`  | API only                             |
| `npm run dev:frontend` | UI only                              |
| `npm run build`        | Build both packages                  |
| `npm run lint`         | ESLint both packages                 |
| `npm run format`       | Prettier write                       |
| `npm test`             | Backend unit tests                   |
| `npm run test:e2e`     | Backend e2e tests (requires MongoDB) |
| `npm run docker:up`    | Build & start full compose stack     |
| `npm run docker:down`  | Stop compose stack                   |

---

## Architecture rules

```text
Controller → Service → Repository → MongoDB
```

- Controllers: request validation + service calls only
- Services: all business logic
- Repositories: MongoDB access only
- Feature-based modules under `backend/src/modules/`

Shared standards: [docs/CODING_STANDARDS.md](docs/CODING_STANDARDS.md)

---

## Documentation

| Document                                             | Description                 |
| ---------------------------------------------------- | --------------------------- |
| [docs/00-overview.md](docs/00-overview.md)           | Product & platform overview |
| [docs/TEMPLATE.md](docs/TEMPLATE.md)                 | Module design template      |
| [docs/CODING_STANDARDS.md](docs/CODING_STANDARDS.md) | Engineering standards       |
| [docs/01-modules.md](docs/01-modules.md)             | Module list                 |
| [docs/04-roadmap.md](docs/04-roadmap.md)             | Roadmap                     |

Every domain module must have a design doc **before** implementation. Work proceeds **module by module** with approval gates.

---

## Git hooks & commits

On `npm install`, Husky installs:

- **pre-commit** — lint-staged (Prettier + ESLint)
- **commit-msg** — Commitlint (conventional commits)

Example:

```text
feat(auth): add refresh token rotation
fix(backend): correct pagination meta
docs(docs): update overview for foundation
```

---

## Docker

Full stack:

```bash
npm run docker:up
```

- UI: http://localhost:8080
- API: http://localhost:3000

Infrastructure only (local Node processes):

```bash
docker compose up -d mongo redis
```

---

## What is intentionally not included yet

- Authentication / JWT issuance
- RBAC & permissions enforcement
- Banking domain modules (customers, accounts, loans, …)

Next proposed module after approval: **Authentication**.

---

## License

UNLICENSED — internal / proprietary use.
