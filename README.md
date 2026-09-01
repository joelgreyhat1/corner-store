# The Corner Store

A mixed-category e-commerce site — browse products, add them to a cart, and check out. Built to practice the parts of an online store that go beyond a simple product list: cart state, order persistence, and tying orders back to a logged-in user. Written by Joel Odum.

## Why I Built This

After building an auth-based note app, I wanted to try something with more moving parts — specifically, state that has to survive across pages (a cart) and a checkout flow that actually writes a permanent record to the database instead of just updating the UI. I skipped real payment processing on purpose so I could focus on getting the cart logic, order structure, and guest-vs-logged-in flow right first. Letting people browse and add to cart without an account, but requiring login only at checkout, felt like the more realistic version of how a real store works.

## Live Demo

🔗 [corner-store.vercel.app](https://your-vercel-url.vercel.app) 

## Features

- Browse a catalog of products across multiple categories, with filtering
- Add to cart and adjust quantities without needing an account
- Cart persists across page reloads (stored locally in the browser)
- Checkout requires login, and creates a real order record tied to that user
- View past orders, each with the items and quantities purchased
- Custom "corner store" catalog design — price tag stickers, ledger-style typography

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Supabase](https://supabase.com/) — Postgres database + authentication
- React Context + localStorage for cart state
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Deployed on [Vercel](https://vercel.com/)

## Running Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/joelgreyhat1/corner-store.git
   cd corner-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## What I Learned

- Managing state that needs to persist across pages and reloads, using Context + localStorage rather than reaching for a database on every click
- Structuring related database tables (orders and order_items) and writing to both together as one logical transaction
- Designing an auth flow where most of the app is public, but a specific action (checkout) triggers a login requirement mid-flow
- No payment processing yet — that's a natural next step if I revisit this project

## License

MIT