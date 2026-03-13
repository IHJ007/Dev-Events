'use client';
import Image from 'next/image';
import posthog from 'posthog-js';
import Link from 'next/link';

function ExploreBtn() {
  const handleClick = () => {
    console.log("CLICKED");
    posthog.capture('explore_events_clicked');
  };

  return (
    <button type = 'button' id = "explore-btn" className='mt-7 mx-auto' onClick = {handleClick}>
    <Link href='/events'>
      Explore Events
      <Image src= "/icons/arrow-down.svg" alt = "arrow-down" width = {24} height = {24}/>
    </Link>
    </button>
  )
}

export default ExploreBtn