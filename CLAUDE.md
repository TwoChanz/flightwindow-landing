# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 14 landing page for FlightWindow, a drone flight planning SaaS. It's a single-page marketing site with waitlist signup.

### Key Files

- `src/app/page.tsx` - Main landing page (client component with form state)
- `src/app/layout.tsx` - Root layout with metadata, GA4 tracking, and structured data
- `src/app/globals.css` - All styles using CSS custom properties (cosmic dark theme)
- `src/app/api/waitlist/route.ts` - POST endpoint for waitlist signups (Supabase)
- `src/app/opengraph-image.tsx` - Dynamic OG image generation (edge runtime)
- `src/app/twitter-image.tsx` - Dynamic Twitter card image (edge runtime)

### Backend

Supabase is used for the waitlist table. The API route handles:
- Email validation
- Duplicate detection (returns 200 with message for existing emails)
- Insert to `waitlist` table with `email`, `drone_type`, `created_at`

### Environment Variables

Copy `.env.example` to `.env.local` and add Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Styling

Uses CSS custom properties defined in `:root` of `globals.css`. Key color families:
- `--cosmic-*` - Dark backgrounds (950-600)
- `--violet-*` - Purple accents
- `--sky-*` - Blue accents
- `--cyan-*` - Teal accents
- `--text-*` - Text colors (primary, secondary, muted)

### Analytics

Google Analytics 4 is configured in `layout.tsx`. Waitlist signups track `waitlist_signup` and `waitlist_signup_error` events.
