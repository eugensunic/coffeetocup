# CLAUDE.md — CoffeeToCup

## Project Overview
CoffeeToCup is a full-stack web app for coffee enthusiasts to log, track, and share coffee brewing experiences. Users can record coffee origins, brewing methods, flavor profiles, and connect with other coffee lovers.

## Architecture
```
coffeetocup/
├── main/                    # Node.js backend (Express)
│   ├── app.js              # Entry point
│   ├── coffee-backend/      # Coffee routes & logic
│   ├── login/, register/    # Auth
│   ├── user-profile/        # User features
│   ├── community/           # Social features
│   └── mongo/               # MongoDB connection
├── startcoffee-fe/          # Angular 10+ frontend (SPA)
│   ├── src/app/             # Components & services
│   └── src/assets/          # Images, styles
├── startcoffee-generics/    # Shared utilities & webpack bundles
├── static-pages/            # Marketing/info pages
└── public/                  # Static assets
```

## Tech Stack
- **Backend**: Node.js + Express, MongoDB
- **Frontend**: Angular 10+, TypeScript
- **Database**: MongoDB (local: mongo-backup04102020/)
- **Build**: Webpack (generics), Angular CLI

## Quick Start
```bash
# Backend setup
cd main
npm install
# Set NODE_ENV=development, configure MongoDB connection
npm start              # runs on port 3000 (default)

# Frontend setup
cd ../startcoffee-fe
npm install
ng serve              # dev server on http://localhost:4200
# or npm start

# Test
npm test
npm run e2e
```

## Code Conventions
- **Backend**: JavaScript (ES6+), minimal comments, 2-space indentation
- **Frontend**: TypeScript, components in `src/app/{feature}/`, services for API calls
- **Database**: MongoDB collections (users, coffeebrews, coffeeorigins, etc.)
- No `any` types in TS. Use strict mode.
- Named exports; avoid default exports for consistency.

## Common Workflows

### Adding a Backend Route
1. Create handler in `main/{feature}/routes.js`
2. Add to MongoDB query logic in `main/mongo/`
3. Wire up in `main/app.js`

### Adding a Frontend Page
1. Create component in `startcoffee-fe/src/app/{feature}/`
2. Add Angular service to call backend API
3. Add route in `app-routing.module.ts`
4. Update navbar if needed

### Database Schema Change
- Edit MongoDB doc structure in relevant collection
- Update seed data in `mongo-backup04102020/` if needed
- Update backend validators and frontend models

## Environment

### Development
- **Backend**: http://localhost:5000
- **MongoDB**: coffeestartdev database
- **Google OAuth**: Configured for localhost:5000
- **Facebook OAuth**: Dev App ID 760976481213490

### Production
- **Domain**: https://coffeetocup.com
- **Facebook App ID**: 958283706772094
- **Facebook App Secret**: cb0fb7bf5e9bd52b2f9b237a753a8a8a
- **To Deploy**: Update `.env` with production credentials and set `NODE_ENV=production`

## Key Files
- `main/app.js` — Backend entry point, route setup
- `startcoffee-fe/src/app/app.component.ts` — Frontend root
- `main/mongo/` — Database queries
- `.env` — Secrets (API keys, DB credentials) — never commit

## Testing
Run tests before opening PR. E2E tests require both servers running.

## Notes
- Profile image uploads go to `uploads/profile-image/`
- Database backups in `mongo-backup04102020/`
- Keep generics synchronized across frontend builds
