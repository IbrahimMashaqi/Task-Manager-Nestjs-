# Task Management API

A robust RESTful API for managing tasks with user authentication, built with NestJS and PostgreSQL.

## Overview

This API provides a complete task management system with secure user authentication, allowing users to create, update, filter, and delete their tasks with full data isolation.

## Live Resources

- **API Deployment:** https://task-manager-nestjs-ibrahim-mashaqi.up.railway.app
- **API Documentation:** [Task Manager API Documentation](https://documenter.getpostman.com/view/your-collection-id/task-manager-api)

## Features

- **User Authentication** - JWT-based registration and login
- **Task CRUD Operations** - Create, read, update, and delete tasks
- **Advanced Filtering** - Filter tasks by status or search text
- **Data Security** - Password hashing with bcrypt
- **User Isolation** - Each user can only access their own tasks
- **Input Validation** - Request validation using DTOs

## Technology Stack

- **NestJS** - Progressive Node.js framework
- **PostgreSQL** - Relational database
- **TypeORM** - Object-relational mapping
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **class-validator** - DTO validation

## Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/task-management-api.git

# Navigate to project
cd task-management-api

# Install dependencies
npm install
```

## Configuration

Create `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=task_management
JWT_SECRET=your_secret_key
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

API runs on `http://localhost:3000`

## API Documentation

### Authentication

**Register User**

```http
POST /auth/signup
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Login**

```http
POST /auth/signin
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

### Tasks

**Get All Tasks**

```http
GET /tasks?status=OPEN&search=example
Authorization: Bearer {token}
```

**Get Task by ID**

```http
GET /tasks/{id}
Authorization: Bearer {token}
```

**Create Task**

```http
POST /tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "description": "string"
}
```

**Update Task Status**

```http
PATCH /tasks/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

**Delete Task**

```http
DELETE /tasks/{id}
Authorization: Bearer {token}
```

### Task Status Options

- `OPEN`
- `IN_PROGRESS`
- `DONE`

## Database Schema

**Users Table**

- id (UUID)
- username (unique)
- password (hashed)
- tasks (relation)

**Tasks Table**

- id (UUID)
- title
- description
- status
- userId (foreign key)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Deployment

The application is deployed on Railway with automatic deployments from the main branch.

**Live API:** https://task-manager-nestjs-ibrahim-mashaqi.up.railway.app

## Project Structure

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── user.entity.ts
│   └── dto/
├── tasks/
│   ├── tasks.controller.ts
│   ├── tasks.service.ts
│   ├── tasks.module.ts
│   ├── task.entity.ts
│   └── dto/
└── main.ts
```

## Author

Ibrahim Mashaqi

## License

MIT
