# Clothing E-commerce — MERN (Pasovit Backend Developer Assignment)

Full MERN implementation for a simple clothing e-commerce site featuring:
- User register / login (JWT in HTTP-only cookie)
- Products with search, filters, pagination
- Cart (guest via localStorage; logged-in synced to DB)
- Checkout + order saved to DB + email confirmation via Nodemailer
- Seed script with 20 products

## Features
- Node 18+, Express, MongoDB (Mongoose)
- React (Create React App or Vite)
- Auth: JWT + cookies
- Passwords hashed with bcrypt
- Email: Nodemailer (Gmail or Mailtrap)
- Minimal UI (functional): search, filters, product detail, cart, checkout

---

## Quick start (local)

### Prereqs
- Node 18+
- MongoDB running locally or Atlas
- (Optional) Gmail app password or Mailtrap credentials for sending email

### Backend
```bash
cd backend
cp .env.example .env
# edit .env -> MONGO_URI, EMAIL_USER, EMAIL_PASS, CLIENT_URL
npm install
npm run seed     # seeds 20 products
npm run dev      # starts server on PORT (default 5000)
