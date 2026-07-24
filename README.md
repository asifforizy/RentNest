# 🏠 RentNest

> **Find & List Rental Properties with Ease**

🔗 **Live Demo:** https://rent-nest-beta.vercel.app/

RentNest is a full-stack rental property platform where landlords can list rental properties, tenants can find and request rentals, and administrators can manage the entire platform. The system provides secure authentication, role-based authorization, rental request management, payments, and reviews.

---

## ✨ Features

### 👤 Authentication & Authorization
- JWT Authentication
- Secure Password Hashing
- Role-Based Access Control (RBAC)
- Protected Routes

### 🏡 Tenant Features
- Browse rental properties
- Search & filter properties
- View detailed property information
- Send rental requests
- Track rental request status
- Make rental payments
- Leave property reviews
- Manage personal profile

### 🏠 Landlord Features
- Create property listings
- Update property information
- Delete properties
- Manage property availability
- View incoming rental requests
- Approve or reject rental requests
- View all listed properties

### 🛡️ Admin Features
- Manage users
- Ban/Activate users
- Manage all rental properties
- View all rental requests
- Manage property categories
- Moderate platform content

---

# 🚀 Live Demo

### 🌐 Website

https://rent-nest-beta.vercel.app/

---

# 🛠️ Tech Stack

- TypeScript
- TanStack Query
- Zod
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt
- Stripe
- Vercel
- PostgreSQL Database

---

# 👥 User Roles

## Tenant

- Browse rental properties
- Submit rental requests
- Make payments
- Write reviews
- Manage profile

## Landlord

- Add rental properties
- Edit property information
- Delete properties
- Approve/Reject rental requests
- Manage listed properties

## Admin

- Manage all users
- Manage all properties
- Manage categories
- Monitor rental requests
- Control platform activities

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/your-username/rentnest.git
```

Move into the project

```bash
cd rentnest
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE_URL=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

STRIPE_SECRET_KEY=

CLIENT_URL=
```

Run Prisma Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

Start the development server

```bash
npm run dev
```

---

# 📌 API Overview

## Authentication

- Register
- Login
- Get Current User
- Update Profile

## Categories

- Get Categories
- Create Category
- Update Category
- Delete Category

## Properties

- Get All Properties
- Get Property Details
- Create Property
- Update Property
- Delete Property

## Rental Requests

- Submit Rental Request
- Get My Rental Requests
- Get Rental Details
- Approve / Reject Request

## Payments

- Create Payment
- Confirm Payment
- View Payment History

## Reviews

- Create Review
- Get Property Reviews

The backend exposes endpoints for authentication, property management, rental requests, payments, reviews, categories, and admin operations with role-based access.

---

# 🔐 Security

- JWT Authentication
- Password Hashing using Bcrypt
- Role-Based Authorization
- Protected APIs
- Input Validation
- Secure Environment Variables

---

# ✨ Future Improvements

- Email Notifications
- Wishlist/Favorites
- Advanced Property Search
- Google Maps Integration
- Chat between Tenant & Landlord
- Property Image Gallery
- Analytics Dashboard
- Multi-language Support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Create a Pull Request

---

⭐ If you like this project, don't forget to give it a **Star** on GitHub!
