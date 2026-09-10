# Safe Multi Football — Vercel Final

## Deploy
1. Upload this project to Vercel.
2. The Sportmonks token is already used server-side as a fallback in `api/football.js`.
3. For better security, set Vercel Environment Variable:
   `SPORTMONKS_TOKEN=YOUR_NEW_TOKEN`
   Then redeploy.
4. Open the deployed URL.

## Important
Do NOT open `index.html` directly with `content://downloads/...`. The page must be served by Vercel (or another web server), because the frontend calls the same-origin `/api/football` serverless route.

The browser no longer calls Sportmonks directly, so the previous CORS / corsproxy error is removed.
