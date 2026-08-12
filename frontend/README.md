# Secret Chat — Complete Frontend

Production-ready frontend structure for the current Secret Chat Django REST API.

## Features

- Login
- Registration
- JWT access/refresh handling
- Protected application flow
- Game/case lobby
- Game detail / investigation room
- Conversation evidence
- Suspect selection
- One-guess submission
- Correct/wrong result screen
- Score display
- Leaderboard
- Loading/error/retry states
- Responsive mobile/desktop UI
- Environment-based API URL for deployment

## Backend API expected

```text
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/token/refresh/
GET  /api/games/
GET  /api/games/<id>/
POST /api/games/<id>/guess/
GET  /api/games/leaderboard/
```

## Local setup

```powershell
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://127.0.0.1:8000
```

## Deployment

Create `.env` from `.env.example`:

```env
VITE_API_BASE_URL=https://YOUR-BACKEND-DOMAIN/api
```

Then:

```powershell
npm install
npm run build
```

The generated `dist/` folder can be deployed to a static frontend host.

## Important

Before deployment, configure the Django backend for:

- production `DEBUG=False`
- allowed hosts
- CORS for the deployed frontend domain
- HTTPS
- production database
- secure secret key
- JWT settings
- static/media handling

Also verify the backend CORS configuration allows the exact deployed frontend origin.
