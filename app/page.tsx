export const dynamic = 'force-dynamic';

import EventCard from '@/components/EventCard';
import ExploreBtn from '@/components/ExploreBtn';
import { EventItem } from '@/lib/constants';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "");

async function page() {
  const apiUrl = BASE_URL ? `${BASE_URL}/api/events` : "/api/events";
  const response = await fetch(apiUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const events = await response.json();

  return (
    <>
      <section id='home' className='w-full'>
        <h1 className='text-center'>The Hub for Every Dev<br />Event You Can&apos;t Miss</h1>
        <p className='subheading'>Hackathons, MeetUps and Conferences, All in One Place</p>
        <ExploreBtn />
      </section>

      <section id='event' className='mt-20 w-full space-y-7 px-5 text-left sm:px-10'>
        <h3>Featured Events</h3>

        <ul className='events list-none'>
          {events && events.length > 0 && events.map((event: EventItem) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>

      </section>
    </>
  )
}

export default page
