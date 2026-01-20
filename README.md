# Auth — Simple Node.js Authentication Example

Small example app showing a minimal signup/signin flow using Express and MySQL.

- **Run:**
  - Install deps: `npm install`
  - Start server: `npm start` or `node server.js`
  - Open the signup page: http://localhost:3000/signup.html

- **Configuration:**
  - Create a `.env` with DB credentials and optional `PORT`.

- **Endpoints:**
  - `POST /signup` — register a new user (form in `public/signup.html`).
  - `POST /signin` — login (accepts username or email).

This repo is intentionally small for learning and testing authentication flows.

