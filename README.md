# RentNest

Find & List Rental Properties with Ease — a TypeScript backend for managing rental listings, users, payments, and authentication.

## Table of contents
- [What it does](#what-it-does)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Database (Prisma)](#database-prisma)
- [Stripe webhook](#stripe-webhook)
- [Contributing](#contributing)
- [License](#license)

## What it does
RentNest is a TypeScript Node.js service that provides the backend for a rental-properties application — handling listing data, user accounts and auth, persistence via Postgres (Prisma), and payment/webhook handling (Stripe).

## Tech stack
- Language: TypeScript (ES module)
- Runtime: Node.js (built output in /dist)
- Web framework: Express
- ORM / DB: Prisma (Postgres)
- Payments: Stripe
- Notable libraries: express, prisma / @prisma/client, pg, stripe, jsonwebtoken

## Repository layout
Top-level important entries:

```
.gitignore
package.json
package-lock.json
prisma.config.ts
prisma/                # Prisma schema & migrations (schema path configured as prisma/schema)
src/                   # TypeScript source (server, routes, controllers, etc.)
tsconfig.json
tsup.config.ts
```

## Features
- REST API for rental listings and user management
- Authentication using JWT
- Data persistence with Prisma + Postgres
- Payment integration via Stripe, plus a script to forward webhooks during local development

## Prerequisites
- Node.js (recommend current LTS >= 18)
- npm
- A Postgres database
- (For Stripe features) A Stripe account and API keys

## Quick start
1. Clone and install
   ```bash
   git clone https://github.com/asifforizy/RentNest.git
   cd RentNest
   npm install
   ```

2. Create an environment file (.env) with the required variables (see below).

3. Run the development server
   ```bash
   npm run dev
   ```
   This runs `tsx watch src/server.ts` (see package.json).

4. Build for production
   ```bash
   npm run build
   npm start
   ```
   `build` uses `tsup` and `start` runs `node dist/server.js`.

## Environment variables
At minimum, provide the following in your environment (examples — adapt to your needs):
- DATABASE_URL="postgresql://user:password@host:5432/dbname"   (required by Prisma — declared in prisma.config.ts)
- JWT_SECRET="your_jwt_secret"                                (used for signing tokens)
- STRIPE_SECRET_KEY="sk_live_..." or "sk_test_..."            (for Stripe API)
- STRIPE_WEBHOOK_SECRET="whsec_..."                           (for verifying incoming webhook signatures)
- PORT=5000                                                   (optional; default depends on server code)

Note: prisma.config.ts points Prisma to `prisma/schema` for the schema file and `prisma/migrations` for migrations.

## Scripts
Defined in package.json:
- `npm run dev` — tsx watch src/server.ts (development)
- `npm run build` — build with tsup
- `npm start` — node dist/server.js (production)
- `npm run stripe:webhook` — helper: `stripe listen --forward-to localhost:5000/api/payments/webhook`
- `npm test` — placeholder (no tests configured)

Use the exact commands above when working locally.

## Database (Prisma)
- Prisma config (prisma.config.ts) sets:
  - schema: `prisma/schema`
  - migrations: `prisma/migrations`
  - datasource URL via `DATABASE_URL`
- Common Prisma commands you will run locally:
  ```bash
  npx prisma generate
  npx prisma migrate dev --name init
  npx prisma db push    # (if you prefer push over migrate during early development)
  ```
Adjust usage depending on whether the repo contains migration files or a seed script.

## Stripe webhook (local development)
Package.json includes a convenience script for listening to Stripe webhooks:
```bash
npm run stripe:webhook
# expands to: stripe listen --forward-to localhost:5000/api/payments/webhook
```
When using `stripe listen`, set `STRIPE_WEBHOOK_SECRET` from the Stripe CLI output so your server can verify signatures.

## Contributing
- Open an issue or pull request with your proposed change.
- Keep TypeScript types strict and follow existing patterns for routes/controllers/services.
- Add tests for new features (this repo currently lacks a test runner configuration — consider adding one).

## License
This project uses the ISC license (see package.json).

## Notes about this README
This README was authored from the repository's package.json, prisma configuration, TypeScript tooling config, and top-level layout. If you want, I can:
- Add a full developers' setup guide (detailed env examples, seed data commands).
- Create a sample .env.example with recommended variable names.
- Add Prisma schema and migration instructions specific to the existing schema files.
