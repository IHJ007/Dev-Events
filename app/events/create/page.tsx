'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateEventPage = () => {

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [time, setTime] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
    if (name === 'date') setDate(value);
    if (name === 'location') setLocation(value);
    if (name === 'imageUrl') setImageUrl(value);
    if (name === 'time') setTime(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const payload = { title, description, date, location, imageUrl, time, slug };

    console.log('Submitting:', JSON.stringify(payload));
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
        
      if (!response.ok) {
        throw new Error('Failed to create event. Please try again.');
      } else {
        alert('Event created successfully!');
        router.push('/events');
      }
    } catch (error) {
      console.error('Error creating event: ', error);
      alert('Failed to create event. Please try again.');
    }
  }

  return (
    <section className="mx-5 sm:mx-10 flex flex-col items-center">
      <div className="header text-center items-center">
        <h1>Submit the form properly to create an event</h1>
        <p className="text-light-100 mt-3 max-w-2xl mx-auto">
          Share the key details so attendees can quickly decide to join.
        </p>
      </div>

      <div className="glass card-shadow mt-8 w-full max-w-3xl rounded-[10px] border border-dark-200 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">

          <input className="bg-dark-200 rounded-[6px] px-5 py-3 text-light-100 placeholder:text-light-200 text-center"
          type="text" name="title" placeholder="Title" value={title} onChange={handleChange} required />

          <input className="bg-dark-200 rounded-[6px] px-5 py-3 text-light-100 placeholder:text-light-200 text-center"
          type="text" name="description" placeholder="Description" value={description} onChange={handleChange} required />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <input className="bg-dark-200 rounded-[6px] px-5 py-3 text-light-100 placeholder:text-light-200 text-center"
            type="date" name="date" placeholder="Date" value={date} onChange={handleChange} required />

            <input className="bg-dark-200 rounded-[6px] px-5 py-3 text-light-100 placeholder:text-light-200 text-center"
            type="text" name="location" placeholder="Location" value={location} onChange={handleChange} required />
          </div>

          <input className="bg-dark-200 rounded-[6px] px-5 py-3 text-light-100 placeholder:text-light-200 text-center"
          type="text" name="imageUrl" placeholder="Image URL" value={imageUrl} onChange={handleChange} required />

          <input className="bg-dark-200 rounded-[6px] px-5 py-3 text-light-100 placeholder:text-light-200 text-center"
          type="text" name="time" placeholder="Time (e.g. 6:30 PM)" value={time} onChange={handleChange} list="time-options" required />
          <datalist id="time-options">
            <option value="9:00 AM" />
            <option value="10:00 AM" />
            <option value="11:00 AM" />
            <option value="12:00 PM" />
            <option value="1:00 PM" />
            <option value="2:00 PM" />
            <option value="3:00 PM" />
            <option value="4:00 PM" />
            <option value="5:00 PM" />
            <option value="6:00 PM" />
            <option value="7:00 PM" />
            <option value="8:00 PM" />
          </datalist>
          
          <button className="bg-primary hover:bg-primary/90 w-full cursor-pointer rounded-[6px] px-4 py-3 text-lg font-semibold text-black" type="submit">Create Event</button>
        </form>
      </div>
    </section>
  );
};

export default CreateEventPage;
