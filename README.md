# TasteNest Server

TasteNest backend API built with Node.js, Express, Prisma, PostgreSQL, and Better Auth.

## Project Description

This server powers:

- Authentication and session management
- User profile and role-based access control
- Menu, cart, and order APIs
- Admin analytics endpoints
- Stripe payment intent creation

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Better Auth
- Stripe
- Zod

## Live URL

- Backend Live URL: _Add your deployed backend URL here_

## API Base

```text
/api/v1
```

## Setup Instructions

### 1. Clone repository

```bash
git clone <your-backend-repo-url>
cd tastenest-server
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in project root:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Run Prisma and server

```bash
pnpm prisma generate
pnpm prisma db push
pnpm seed
pnpm dev
```

### 5. Build and start production

```bash
pnpm build
pnpm start
```
