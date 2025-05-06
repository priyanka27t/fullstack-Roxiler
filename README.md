# Fullstack Roxiler Store Rating App

A fullstack web application for store ratings, featuring:

- Role-based access: System Admin, Normal User, Store Owner
- Store rating (1-5) with CRUD operations for ratings
- Secure JWT authentication
- PostgreSQL database with Prisma ORM

## Structure

```
fullstack Roxiler/
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       └── index.js
│   └── prisma/
│       └── schema.prisma
└── frontend/
    ├── package.json
    ├── .env.example
    ├── public/
    │   └── index.html
    └── src/
        └── App.js
```

## Setup Instructions

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DB credentials and JWT secret
npx prisma migrate dev --name init
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

---

All components include form validation, sorting, and secure password handling. Reach out for any adjustments.
