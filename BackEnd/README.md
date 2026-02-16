# SmartTaxi Backend (Next.js API + Prisma + MySQL/WAMP)

This project is an API backend for the SmartTaxi frontend (Vite/React).

## 1) Prerequisites
- Node.js 18+
- WAMP (MySQL running)
- Create a DB named `smarttaxi`

## 2) Configure env
Copy `.env.example` to `.env` and update:
- `DATABASE_URL`
- `JWT_SECRET`
- `CORS_ORIGIN` (frontend dev URL, usually http://localhost:3000)

## 3) Install + migrate
```bash
npm i
npx prisma generate
npx prisma migrate dev --name init
```

## 4) Run backend (port 4000)
```bash
npm run dev
```

Health check:
- GET http://localhost:4000/api/health

## 5) API quick test (curl)
Register passenger:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Sara User","email":"sara@test.com","password":"123456","role":"PASSENGER"}'
```

Register driver:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Ahmed Driver","email":"ahmed@test.com","password":"123456","role":"DRIVER"}'
```

Login:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmed@test.com","password":"123456"}'
```

Set driver availability (replace TOKEN):
```bash
curl -X POST http://localhost:4000/api/drivers/availability \
  -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" \
  -d '{"isAvailable": true}'
```

Update driver location:
```bash
curl -X POST http://localhost:4000/api/drivers/location \
  -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" \
  -d '{"lat":31.6295,"lng":-7.9811,"speed":12}'
```

Request ride as passenger:
```bash
curl -X POST http://localhost:4000/api/rides/request \
  -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" \
  -d '{"pickup":{"name":"Carré Eden, Gueliz","lat":31.6295,"lng":-7.9811},"dropoff":{"name":"Jemaa el-Fnaa, Medina","lat":31.6258,"lng":-7.9891},"seats":1,"carpool":false}'
```

## 6) Puter AI integration note
Puter AI is designed to be called from the frontend (user-pays model). This backend exposes `/api/ai/insights`
which returns a **messages+options payload** you can pass directly to `puter.ai.chat()` in the frontend.
