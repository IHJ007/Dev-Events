import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/constants'
import React from 'react'

function page() {
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
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {... event} />
            </li>
          ))}
        </ul>

      </section>
    </>
  )
}

export default page
