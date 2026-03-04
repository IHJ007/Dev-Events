export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "Google I/O 2026",
    image: "/images/event1.png",
    slug: "google-io-2026",
    location: "Mountain View, California, USA",
    date: "May 20, 2026",
    time: "10:00 AM PDT",
  },
  {
    title: "Apple WWDC 2026",
    image: "/images/event2.png",
    slug: "apple-wwdc-2026",
    location: "Cupertino, California, USA",
    date: "June 8, 2026",
    time: "10:00 AM PDT",
  },
  {
    title: "React Summit 2026",
    image: "/images/event3.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 12, 2026",
    time: "09:00 AM CEST",
  },
  {
    title: "ETHGlobal London 2026",
    image: "/images/event4.png",
    slug: "ethglobal-london-2026",
    location: "London, United Kingdom",
    date: "July 24, 2026",
    time: "08:30 AM BST",
  },
  {
    title: "PyCon US 2026",
    image: "/images/event5.png",
    slug: "pycon-us-2026",
    location: "United States",
    date: "April 15, 2026",
    time: "09:00 AM MDT",
  },
  {
    title: "DevOpsDays Chicago 2026",
    image: "/images/event6.png",
    slug: "devopsdays-chicago-2026",
    location: "Chicago, Illinois, USA",
    date: "September 10, 2026",
    time: "09:30 AM CDT",
  },
];
