📅 Appointment Management – Fullstack App

A fullstack appointment management platform built with Next.js (App Router) and NestJS, featuring authentication, admin dashboards, client management, logs, and account settings.
---
🧱 Tech Stack
#### Frontend
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Fetch API (cookies + JWT)
- Server Components + Client Components

#### Backend
- NestJS
- PostgreSQL
- TypeORM (or Prisma)
- JWT Authentication
- Passport
- bcrypt
- Swagger
---
✨ Features
Authentication
- Login with email + password
- JWT stored in HTTP-only cookies
- Passwords encrypted with bcrypt
Admin Panel
- Appointments list with:
    - Pagination
    - Filter by name and date
    - Status handling (scheduled, canceled, pending)
- Clients list
- Logs tracking user actions
- Appointment room configuration (modal)
Client Area
- Appointments overview
- Logs
    - My Account page
    - Update personal data
    - Optional password update
Security
- Protected admin routes (Next.js middleware)
- Role-based access (admin / client)
- Swagger compatible with cookie authentication

---

🚀 Running the Project
Backend
```
cd backend
npm install
npm run start:dev
```
Environment variables:
```
DATABASE_URL=postgresql://user:password@localhost:5432/app
JWT_SECRET=your_secret

```
---
Frontend
```
cd frontend
npm install
npm run dev
```
Environment variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
---
🧪 Demo Users (Seed)
| Role | Email | Password |
|---|---|---|
| ADMIN | admin@app.com | admin123 |
| USER | client@app.com | user123 |
---

📌 Remaining Actions / TODO
Backend
- [ ] Finalize role-based guards (admin/client)
- [ ] Finalize endpoints
- [ ] Improve logs granularity
- [ ] Add soft delete for users and appointments
- [ ] Add tests (unit + e2e)
- [ ] Fix swagger cookies based authentication
- [ ] Add seeds

Frontend
- [ ] Add fetch to get records in each page
- [ ] Add button actions
- [ ] Improve error handling (toast notifications)
- [ ] Add confirmation modals for destructive actions
- [ ] Add form validation with Zod
 
DevOps / Quality
- [ ] Dockerize frontend and backend
- [ ] Add CI pipeline
- [ ] Production build and deployment
