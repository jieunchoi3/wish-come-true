# Wishlist

Help me live the life I've already imagined.

## Dev

```bash
npm install
npm run dev
```

## Database

Shared Supabase project (`myvzlzdsktnudgxqdbxv`). Wishlist tables are prefixed `wishlist_`.

1. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`
2. Run migration in SQL editor: `supabase/migrations/20250715000001_wishlist_schema.sql`
3. Seed: `supabase/seed_wishlist.sql` (regenerate with `node seed/build.mjs`)
4. Verify: `node scripts/verify-supabase.mjs`
