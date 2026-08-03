# Foundation Module Notes

This phase establishes the engineering platform only.

## Included

- Monorepo workspaces
- NestJS bootstrap with config validation, Helmet, CORS, throttling, Swagger
- Global validation pipe, exception filter, response + logging interceptors
- Base document + base repository (audit fields, soft delete)
- Health module (`GET /api/v1/health`) with unit + e2e tests
- React app shell with routing, MUI theme, Redux, TanStack Query, Axios client
- Docker Compose for MongoDB, Redis, API, UI
- Shared docs and coding standards

## Explicitly deferred

Authentication, users, roles, and all banking domain features.
