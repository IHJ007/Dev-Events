# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Dev Events Next.js App Router application.

**Changes made:**

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the Next.js 15.3+ `instrumentation-client` pattern. Includes automatic exception capture (`capture_exceptions: true`) and a reverse proxy `api_host` for improved reliability.
- **`next.config.ts`**: Added reverse proxy rewrites to route PostHog requests through `/ingest`, reducing the chance of ad blockers intercepting analytics events.
- **`components/ExploreBtn.tsx`**: Added `posthog.capture('explore_events_clicked')` in the button's click handler. The component was already a client component (`'use client'`).
- **`components/EventCard.tsx`**: Converted to a client component and added `posthog.capture('event_card_clicked')` with properties (`event_title`, `event_slug`, `event_location`, `event_date`) on link click.
- **`.env.local`**: Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event | Description | File |
|-------|-------------|------|
| `explore_events_clicked` | User clicks the 'Explore Events' CTA button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to navigate to the event detail page | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/332882/dashboard/1334972)
- **Insight**: [Explore Events CTA clicks](https://us.posthog.com/project/332882/insights/m18VmggC) — Daily trend of homepage CTA clicks
- **Insight**: [Event card clicks over time](https://us.posthog.com/project/332882/insights/uRdW2frH) — Daily trend of event card clicks
- **Insight**: [Unique users clicking event cards](https://us.posthog.com/project/332882/insights/PZ10b701) — Daily unique users engaging with event cards
- **Insight**: [Most clicked events](https://us.posthog.com/project/332882/insights/GVBPjZcm) — Breakdown by event title to see which events get the most interest
- **Insight**: [Explore to Event Card conversion funnel](https://us.posthog.com/project/332882/insights/NXdFTLfD) — Funnel from CTA click to event card click

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
