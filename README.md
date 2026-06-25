# MeetMind – AI Meeting Memory System

A full-stack MERN application with Google Gemini AI integration for intelligent meeting management.

## Tech Stack

**Frontend:** React 18 + Vite, Redux Toolkit, Tailwind CSS, Framer Motion, React Router DOM  
**Backend:** Node.js, Express.js, MongoDB Atlas, JWT Auth  
**AI:** Google Gemini API  
**Storage:** Cloudinary  

## Project Structure

```
ai-meeting-memory/
├── frontend/          # React + Vite frontend
└── backend/           # Node.js + Express backend
```

## Quick Start

### 1. Clone & Install

```bash
# Install frontend deps
cd frontend && npm install

# Install backend deps
cd ../backend && npm install
```

### 2. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your credentials
```

### 3. Run Development

```bash
# Terminal 1 – backend
cd backend && npm run dev

# Terminal 2 – frontend
cd frontend && npm run dev
```

Frontend: http://localhost:3000  
Backend: http://localhost:5000

## Deployment

### Frontend → Vercel

1. Push to GitHub
2. Import repo on vercel.com
3. Set root directory to `frontend`
4. Add env variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Backend → Render

1. Create new Web Service on render.com
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `node src/server.js`
5. Add all environment variables from `.env.example`
6. Set `CLIENT_URL` to your frontend URL, for example `https://your-app.vercel.app`

Required backend variables for auth startup:
`MONGODB_URI`, `JWT_SECRET`, and `JWT_REFRESH_SECRET`.

### Database → MongoDB Atlas

1. Create cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IPs (0.0.0.0/0 for Render)
4. Copy connection string to `MONGODB_URI`

## Features

- 🔐 JWT auth with refresh tokens + role-based access
- 📅 Full meeting CRUD with file uploads
- 🤖 Gemini-powered summaries, action items, Q&A
- 🔍 Semantic search across all meetings
- 📊 Dashboard with stats
- 👤 User profile with avatar
- 🛡️ Admin panel for user management
- 🌙 Dark theme throughout

## Getting API Keys

- **Gemini API**: https://makersuite.google.com/app/apikey
- **Cloudinary**: https://cloudinary.com (free tier available)
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas (free tier available)
