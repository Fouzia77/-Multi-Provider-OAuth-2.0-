# 🔐 OAuth Authentication Service

A production-style authentication system built with **Node.js**, **Express**, **PostgreSQL**, **Redis**, and **Google OAuth 2.0**. Supports local authentication, JWT-based authorization, OAuth login, token refresh, and secure logout with token blacklisting.

---

## ✨ Features

* Local authentication (Email + Password)
* Google OAuth 2.0 (Authorization Code Flow)
* JWT Access & Refresh Tokens
* Secure logout using Redis token blacklist
* PostgreSQL database with relational design
* Docker & Docker Compose setup
* Production-ready security practices

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL
* **Cache / Session Control:** Redis
* **Auth:** JWT, Google OAuth 2.0
* **Containerization:** Docker, Docker Compose

---

## 📂 Project Structure

```
project-root/
│── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── utils/
│   └── app.js
│── docker-compose.yml
│── Dockerfile
│── .env.example
│── package.json
│── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file using `.env.example` as reference:

```
PORT=8080
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

DATABASE_URL=postgres://user:password@db:5432/authdb
REDIS_URL=redis://redis:6379

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback
```

---

## 🗄️ Database Schema

### users

* id (PK)
* email (unique)
* password (nullable)
* created_at

### auth_providers

* id (PK)
* user_id (FK → users.id)
* provider (google)
* provider_user_id

---

## 🚀 API Endpoints

### Auth Routes

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | /api/auth/register | Register user            |
| POST   | /api/auth/login    | Login user               |
| POST   | /api/auth/logout   | Logout (blacklist token) |
| POST   | /api/auth/refresh  | Refresh access token     |

### OAuth Routes

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | /api/auth/google          | Start Google OAuth |
| GET    | /api/auth/google/callback | OAuth callback     |

### Protected

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /api/protected | JWT-protected route |
| GET    | /health        | Health check        |

---

## 🐳 Docker Setup

Start the entire stack:

```
docker-compose up --build
```

Services:

* Node.js API → `http://localhost:8080`
* PostgreSQL → `db:5432`
* Redis → `redis:6379`

---

## 🔒 Security Measures

* Password hashing with bcrypt
* JWT expiration handling
* Refresh token rotation
* Redis-based token blacklist
* Helmet for HTTP headers
* CORS configuration
* Rate limiting

---

## 🧪 Testing

* Use **Postman** or **cURL**
* Test local login, OAuth login, token refresh, logout
* Verify blacklisted tokens are rejected

---

