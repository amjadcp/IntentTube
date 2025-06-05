# IntentTube Backend

This is the backend for the IntentTube application, built with Express, TypeScript, and MongoDB.

## Project Purpose
IntentTube empowers users to take control of their YouTube viewing habits by providing a focused environment for curated channels and playlists, free from distractions and recommendations.

## Tech Stack
- ExpressJS
- TypeScript
- MongoDB (via Mongoose)
- dotenv, CORS

## Folder Structure
- `src/configs/` - Configuration files (env, middleware, etc.)
- `src/errors/` - Custom error handling logic
- `src/features/` - Modularized features (authentication, channels, etc.)
- `src/middlewares/` - Middleware functions
- `src/models/` - Database schema definitions
- `src/repositories/` - Database interaction logic
- `src/routers/` - Route definitions and versioning
- `src/servers/` - Server initialization logic
- `src/types/` - TypeScript type definitions
- `src/utils/` - Reusable utility functions
- `src/tests/` - Unit and integration tests

## Getting Started
1. Install dependencies: `npm install`
2. Configure environment variables in `.env`
3. Start the dev server: `npx ts-node src/servers/express.server.ts` 