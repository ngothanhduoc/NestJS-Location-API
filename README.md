# 🌐 Location Management API

This is a **NestJS-based RESTful API** designed to manage hierarchical location data (e.g., Country > City > District), integrated with:

- ✅ TypeORM + PostgreSQL
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
| 📜 Swagger Integration | Smart API documentation at `/api`             |

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