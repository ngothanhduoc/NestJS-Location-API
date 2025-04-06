# 🌐 Location Management API

This is a **NestJS-based RESTful API** designed to manage hierarchical location data (e.g., Country > City > District), integrated with:

- ✅ TypeORM + PostgreSQL - Materialized Path (Easy to read - Easy to query the entire tree quickly - Suitable for simple CRUD operations)
- ✅ JWT Authentication + Role-based Access Control
- ✅ Smart Swagger Documentation
- ✅ Dockerized Environment
- ✅ End-to-End Testing with `@nestjs/testing`
- ✅ CI/CD Strategy for Dev & Prod stages - use Github Action for testing & ci/cd strategy

---

## 🧱 Features

| Feature                | Description                                   |
|------------------------|-----------------------------------------------|
| 🌳 Tree Structure       | Supports parent-child relations for locations |
| 🛡️ Auth + RBAC         | JWT-based authentication with admin/user roles |
| 🧪 E2E Testing         | Preconfigured `e2e` tests for core features    |
| 🐳 Dockerized Stack     | NestJS + PostgreSQL in Docker Compose setup    |
| 🔐 Secure API          | Role guards and permission-based endpoints     |
| 📜 Swagger Integration | Smart API documentation at `/api/docs`             |

---

## 🚀 Getting Started

### 🧰 Prerequisites

- [Node.js](https://nodejs.org) >= 18
- [Docker](https://www.docker.com/) & Docker Compose

---

## 🐳 Docker Setup

```bash
# Start the app + database
docker-compose up --build
App: http://localhost:3000

📜 Swagger Docs: http://localhost:3000/api/docs
You’ll see:
	•	Auth header prefilled
	•	Model schemas
	•	Role protection description

```

--- 
## ⚙️ Environment Variables
```bash
# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=location-api
DB_SYNC=true

# Other environment variables (if needed)
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
```

--- 
## 📦 Project Structure
```bash
src/
├── auth/             # JWT & RBAC, Guards
├── location/         # Location CRUD (supports hierarchy)
├── common/           # decorators, interceptors, filters
├── user/             # User entity
├── main.ts
├── app.module.ts
```

---
## 🔐 Auth & Roles
```bash
| Role       | Permissions      |
|------------|------------------|
| user       | Read-only access |
| admin      | Full CRUD access |

Use the @Roles('admin') decorator to restrict endpoints.
```

---
## 🧪 Testing Guide
✅ Unit Tests: `yarn test`

Test results: https://github.com/ngothanhduoc/NestJS-Location-API/actions/runs/14288619771/job/40046932405

✅ End-to-End (e2e) Tests: `yarn test:e2e`

---
## 🐙 GitHub CI/CD Strategy
✅ Development Stage:

	•	Triggered on PR or develop branch push
	•	Run:
	  •	Linting
	  •	Unit & E2E Tests
	  •	Docker build

✅ Production Stage:

	•	Triggered on main branch merge
	•	Steps:
	  •	Build Docker image
	  •	Push to Docker Hub / GHCR
	  •	Deploy via SSH or use GitHub Actions + PM2 or deploy to Cloud Services
