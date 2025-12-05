"use client";

import { EventAndOrganizer, getEvents } from "./actions";
import { EventCard } from "./EventCard";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { Registration } from "@/types/supabase";
import { typedClient } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { SearchTextField } from "@event-ease/ui";

export default function EventsPage() {
  const [events, setEvents] = useState<EventAndOrganizer[]>([]);
  const [registrations, setRegistrations] = useState<Array<Registration>>([]);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const fetchEvents = async () => {
      const {
        data: { user: fetchedUser },
      } = await typedClient.auth.getUser();

      setUser(fetchedUser);
      const response = await getEvents(fetchedUser?.id!);

      setEvents(response.events);
      setRegistrations(response.registrations);
    };
    
    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full flex items-center justify-between">
          <h1>
            Community Events
          </h1>
          <SearchTextField
            name="search"
            onSubmit={(e) => e.preventDefault()}
          />
        </div>
        <div className="w-full">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              registration={registrations.find(
                (registration) => registration.event_id === event.id
              )}
              userId={user?.id || ""}
            />
          ))}
        </div>
      </div>
    </>
  );
}
