# E-commerce Catalog — Paginated

## Tech Stack
- Backend: Node.js + Express + TypeScript
- Database: MongoDB (native driver, no Mongoose)
- Frontend: React + TypeScript + Vite

## Architecture
- Server-side pagination via MongoDB aggregation pipeline (`$match → $sort → $skip → $limit`)
- REST API: `GET /api/products` with query params: `page`, `limit`, `category`, `sortBy`, `order`
- Response: `{ data, metadata: { totalCount, page, totalPages } }`

## Getting Started

### With Docker
```
docker-compose up --build
```
Database is seeded automatically on first run.

### Without Docker
1. Start MongoDB locally and update MONGO_URI in backend/.env

2. Backend
```
cd backend && npm install && cp .env.example .env && npm run seed && npm run dev
```

3. Frontend
```
cd frontend && npm install && npm run dev
```

## API Reference
```
GET /api/products?page=1&limit=8&category=electronics&sortBy=price&order=desc
```

Returns paginated products with metadata.