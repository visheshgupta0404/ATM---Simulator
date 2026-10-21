# ATM Simulator

A browser-based JavaScript learning demo for deposits and withdrawals. The account balance stays private in a closure and is stored as integer paise so decimal transactions remain exact.

## Try it

Open `index.html`, or serve the directory using `python -m http.server 8000` and visit http://localhost:8000. Start with ₹10,000 in demo funds, enter an amount, then choose **Deposit** or **Withdraw**. Enter also submits the focused form.

- Rejects blank, negative, zero, nonnumeric, oversized, and over-precision amounts.
- Refuses overdrafts without changing the balance.
- Shows INR formatting, accessible status messages, and the last ten successful transactions.
- Adapts to mobile screens and supports keyboard navigation.

Reloading resets the demo. There is no real account, server, payment connection, authentication, or persistent transaction history.

## Verify

With Node.js 20 or newer, run `npm test` and `npm run check`. No packages need installing. Tests cover invalid input, decimal precision, overdrafts, overflow, and account isolation. GitHub Actions runs checks before Pages deployment.

Built with HTML, CSS, and vanilla JavaScript by Vishesh Gupta.
