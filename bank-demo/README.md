# Northstar Bank — Interactive Browser Demo

Open the GitHub Pages demo at the repository Pages URL after the deployment workflow succeeds.

## Demo credentials
- Email: `demo@example.com`
- Password: `Demo@12345`

## What works
- Register a demo account with a ₹1,000 opening balance
- Deposit and withdraw fictional amounts
- Reject wrong passwords and withdrawals over the current demo balance
- View account balances and activity
- Rename or delete demo accounts

## Important limitations
- This is a static, browser-only educational simulation. It is not a real banking application.
- It does not use a backend, MongoDB, payment network, or financial institution.
- Each visitor's data stays in that visitor's browser `localStorage`; it is not shared or synced.
- Client-side password hashing is illustrative only and is not production authentication.
- Never enter real personal, payment, or banking information.

The original React/MongoDB source on `main` has not been replaced. This deployment is isolated on branch `live-demo`.
Deployment workflow registered on the default branch; this source folder is published from `live-demo`.
