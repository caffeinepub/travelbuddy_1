# TravelMate

## Current State
TravelMate has 8 app pages: Dashboard, Profile, My Travels (Conveyance), Discover, Safety, Luggage, Networking, Messages, and a Privacy Policy page. All wrapped in a shared Layout with navbar and footer.

## Requested Changes (Diff)

### Add
- A new public-facing **Landing Page** at `/landing` route — a marketing/promotional page showcasing TravelMate's value proposition, key features, and a call-to-action to sign in or explore the app.
  - Hero section: bold headline, tagline, CTA buttons ("Get Started" → Dashboard, "Learn More" scrolls down)
  - Features section: highlight the 6 key modules (Safety, Luggage, Networking, Discover, Messages, My Travels) with icons and descriptions
  - How It Works section: 3-step onboarding flow (Create Profile → Add Your Travel → Connect with Co-Travelers)
  - Stats/social proof section: numbers like travelers connected, routes covered, etc. (illustrative)
  - Final CTA section: "Join TravelMate Today" with sign-in button

### Modify
- `App.tsx`: add the new `/landing` route
- `Layout.tsx`: add "Home" nav link pointing to `/landing` in the nav (or keep separate — landing page can use the same Layout)

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/Landing.tsx` with all sections
2. Register `/landing` route in `App.tsx`
3. Add "Home" link to NAV_LINKS in Layout.tsx pointing to `/landing`
