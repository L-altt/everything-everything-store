# Everything Everything — clean rebuild

This is the new foundation for the Everything Everything store.

## Stack
- Static HTML/CSS/JavaScript frontend, suitable for GitHub Pages
- Supabase Postgres + Storage + Edge Functions
- Paystack for checkout/payment

Supabase is the source of truth for products, prices, stock, meals and orders.

## 1. Create Supabase project
Create a project, open SQL Editor and run `supabase/schema.sql`.

Then create a Storage bucket named `product-images`. Configure it according to your preferred public/private image strategy.

## 2. Configure frontend
In `app.js`, replace:
- `YOUR_SUPABASE_URL`
- `YOUR_SUPABASE_PUBLISHABLE_KEY`

Use the project's publishable/anon client key only. Never put a Supabase secret key or Paystack secret key in frontend files.

## 3. Configure Edge Function secrets
Set these secrets in Supabase:
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `PAYSTACK_SECRET_KEY`

Deploy:
- `supabase/functions/initialize-payment`
- `supabase/functions/verify-payment`

## 4. Paystack
Use Paystack test keys during development. The initialize function sends the amount in pesewas, and the verify function checks the transaction with Paystack before marking an order paid.

## 5. GitHub Pages
Upload `index.html`, `styles.css`, `app.js` and the `supabase` folder to the new repository. GitHub Pages can serve the frontend directly.

## Important next build stages
1. Admin dashboard + Supabase Auth/RLS
2. Product image upload
3. Full product management
4. Order management
5. Paystack callback/success page
6. Delivery fee rules
7. Search and product detail pages
8. Build-a-Platter pricing/options
