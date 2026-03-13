import { notFound } from "next/navigation";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "");

const EventDetailItems = ({ icon, alt, label } : { icon:string, alt:string, label:string }) => (
    <div className="flex flex-row gap-2 items-center">
        <Image src = {icon} alt = {alt} width = {14} height = {14} />
        <p>{label}</p>
    </div>
)

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`);
    const { title, description, image, location, date, time } = await request.json();

    if(!title) return (notFound);

    return (
        <section id = "event" className="ml-10 mr-10">
            <div className="Event Title">
                <h1>{title}</h1>
            </div>

            <div>
                <Image src = {image} alt = "Event Banner" width = {3000} height = {1000} className = "banner mt-10 rounded-lg" />
            </div>

            <section className="mt-6 flex flex-col gap-1">
                <div className="description">
                    <h2 className="mt-7">Event Description</h2>
                    <p className="mt-2">{description}</p>
                </div>
            </section>

            <section className="mt-6 flex flex-col gap-1">    
                <div className="details flex flex-col gap-3 items-start text-left">
                    <h2 className="mt-4">Event Details</h2>
                    <EventDetailItems icon="/icons/pin.svg" alt="location" label={location} />
                    <EventDetailItems icon="/icons/calendar.svg" alt="date" label={date} />
                    <EventDetailItems icon="/icons/clock.svg" alt="time" label={time} />
                </div>
            </section>

        </section>
    )
}

export default EventDetailsPage
