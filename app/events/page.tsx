import EventCard from '@/components/EventCard';
import { EventItem } from '@/lib/constants';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "");

async function EventsPage() {
    const apiUrl = BASE_URL ? `${BASE_URL}/api/events` : "/api/events";
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const events = await response.json();

  return (
    <div id = 'events' className = 'w-full space-y-7 px-5 text-left sm:px-10'>
        <h3>All Events</h3>
        
        <ul className="events list-none flex flex-col space-y-7">
            {events && events.length > 0 && events.map((event: EventItem) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
    </div>
  );
};

export default EventsPage;