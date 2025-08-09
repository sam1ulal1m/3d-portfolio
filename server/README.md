# Portfolio Backend

## Setup

1. Copy `.env` and set your MongoDB URI, JWT secret, and port:
   ```env
   MONGODB_URI=your_mongodb_uri_here
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node index.js
   ```

## API Endpoints

- `POST /api/auth/register` — Register admin (remove after initial setup)
- `POST /api/auth/login` — Login, returns JWT
- `GET/POST/PUT/DELETE /api/projects` — Manage projects
- `GET/POST/PUT/DELETE /api/skills` — Manage skills
- `GET/PUT /api/about` — About section
- `GET/POST/DELETE /api/testimonials` — Testimonials
- `GET/POST/PUT/DELETE /api/blog` — Blog posts
- `POST /api/contact` — Contact form
- `GET /api/analytics` — View analytics (admin only)

All admin routes require a Bearer JWT token in the `Authorization` header.

Analytics are tracked automatically for all requests.
