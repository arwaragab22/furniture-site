# 🪑 Furniture E-commerce Website

This is a responsive and dynamic **Furniture E-commerce Website** built using **React**, **TypeScript**, and **Tailwind CSS**, with a working **Stripe** payment integration and real-time product management.

🔗 **Live Site:** (https://furniture-site-rho.vercel.app/)

---

## 🚀 Features

- 🔐 Authentication (Login/Register)
- 🛍️ Product listing with categories and filtering
- 📦 Add to cart & quantity management
- 💳 Stripe Checkout integration
- 📱 Fully responsive UI
- 🔎 Product search
- 🧾 Order summary & invoice-style display

---

## 🛠️ Tech Stack

| Technology     | Description                          |
|----------------|--------------------------------------|
| React + Vite   | Frontend Framework                   |
| TypeScript     | Type-safe development                |
| Tailwind CSS   | Utility-first CSS framework          |
| Stripe         | Payment Gateway                      |
| React Hook Form| Form validation & control            |
| Zustand        | Global state management (cart, user) |
| DummyJSON / JSON Server | Mock API for product data |

---

## 📁 Project Structure

```bash
myapp/
├── src/
│   ├── components/     # Reusable components (Navbar, ProductCard, etc.)
│   ├── pages/          # Main pages (Home, Login, ProductDetails)
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types
│   └── App.tsx         # Main app entry
├── public/
├── server/             # (Optional) Express server for Stripe
├── .env                # Stripe secret key (not committed)
