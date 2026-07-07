# Chai Aur Next.js

A small Next.js todo app built with the App Router, React, Tailwind CSS, Prisma, and a Neon PostgreSQL database.

## Features

- Server-rendered home page that loads todos from the API
- Add todos with a server action
- Toggle and delete todos through API routes
- Prisma-backed `Todo` model with PostgreSQL
- Basic route examples for auth, main pages, loading, error, and not-found UI

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7
- Neon PostgreSQL

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add your database connection string:

```env
DATABASE_URL="your_neon_postgres_connection_string"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev     # Start the local development server
npm run build   # Create a production build
npm run start   # Start the production server
npm run lint    # Run ESLint
```

## Project Structure

```text
actions/             Server actions
app/                 App Router pages, layouts, and API routes
components/todos/    Todo UI components
lib/                 Database and todo helpers
prisma/              Prisma schema and migrations
public/              Static assets
```

## API Routes

- `GET /api/todos` - list all todos
- `POST /api/todos` - create a todo
- `GET /api/todos/[id]` - get one todo
- `PATCH /api/todos/[id]` - update a todo
- `DELETE /api/todos/[id]` - delete a todo
- `GET /api/hello` - basic hello route

## Prisma Model

The app currently uses one model:

```prisma
model Todo {
  id        String   @id @default(cuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Notes

- The Prisma client is generated into `app/generated/prisma`.
- The database connection is required at runtime through `DATABASE_URL`.
- The todo list refreshes after create, update, and delete actions so server-rendered data stays current.
