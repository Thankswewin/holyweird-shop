# HolyWeird Shop

Premium e-commerce platform for WeirdPhone custom hardware.

![HolyWeird](https://img.shields.io/badge/HolyWeird-WeirdPhone%20Galore-orange)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## 🚀 Live Demo

[holyweirdshop.tech](http://www.holyweirdshop.tech)

## ✨ Features

- **Shop** - Browse housings, hardware, and accessories
- **Product Details** - Full product pages with add to cart
- **Cart System** - Persistent cart with Stripe checkout ready
- **Dolly Builder** - 5-step custom phone configurator
- **M.Concierge** - Luxury lifestyle service booking
- **Weird Clinic** - Professional repair services
- **Swap** - Device trade-in program

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS 3
- Framer Motion
- React Router DOM

### Backend
- Express.js
- Supabase (PostgreSQL)
- Stripe Payments

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/holyweird-shop.git
cd holyweird-shop

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file with:

```env
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
FRONTEND_URL=http://localhost:5173
```

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run dev:server` | Start backend server |
| `npm run dev:all` | Start both (recommended) |
| `npm run build` | Build for production |
| `npm run seed` | Seed database with products |

## 📁 Project Structure

```
├── src/                  # React frontend
│   ├── components/       # Reusable UI components
│   ├── context/          # React context (Cart)
│   ├── lib/              # Utilities & API service
│   ├── pages/            # Page components
│   └── data/             # Static data
│
├── server/               # Express backend
│   ├── routes/           # API endpoints
│   ├── lib/              # Supabase & Stripe clients
│   ├── db/               # Database schema
│   └── seed/             # Seed scripts
│
└── public/               # Static assets
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy

### Backend (Railway/Render)
1. Create new project
2. Connect GitHub repo
3. Set root directory to `/`
4. Set start command to `node server/index.js`
5. Add environment variables

## 📝 License

Private - HolyWeird Technologies

---

Built with ❤️ for WeirdPhone enthusiasts
