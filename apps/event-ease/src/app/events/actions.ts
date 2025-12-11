"use server";

import { Event, Organizer, Registration } from "@/types/supabase";
import { createClient } from "@/utils/server";

export type EventAndOrganizer = Event & {
  organizers: Pick<Organizer, "name" | "contact_info"> | null;
};

type GetEventsResponse = {
  events: Array<EventAndOrganizer>;
  registrations: Array<Registration>;
};

type RegistrationFilter = "all" | "registered" | "not-registered";

export async function getEvents(
  userId: string,
  searchQuery?: string,
  registrationFilter?: RegistrationFilter
): Promise<GetEventsResponse> {
  const client = await createClient();

  const { data: registrations, error: registrationError } = await client
    .from("registrations")
    .select("*")
    .eq("user_id", userId);
    
  if (registrationError) {
    throw new Error(registrationError.message);
  }

  const registrationIds = new Set(
    (registrations || [])
      .map(r => r.event_id)
      .filter((id): id is string => id !== null)
  );

  let eventsQuery = client
    .from("events")
    .select("*, organizers (name, contact_info)");

  if (searchQuery && searchQuery.trim()) {
    const searchTerm = searchQuery.trim();
    eventsQuery = eventsQuery.or(
      `name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
    );
  }

  if (registrationFilter === "registered" && registrationIds.size > 0) {
    eventsQuery = eventsQuery.in("id", Array.from(registrationIds));
  } else if (registrationFilter === "not-registered") {
    // For "not-registered", we need to filter out registered events
  }

  const { data: events, error: eventsError } = await eventsQuery;

  if (eventsError) {
    throw new Error(eventsError.message);
  }

  let filteredEvents = events || [];

  if (registrationFilter === "not-registered") {
    filteredEvents = filteredEvents.filter(event => 
      !registrationIds.has(event.id)
    );
  }

  return { events: filteredEvents, registrations: registrations || [] };
}

export async function register(userId: string, eventId: string) {
  const client = await createClient();
  const { error } = await client.from("registrations").insert({
    user_id: userId,
    event_id: eventId,
  });

  if (error) {
    throw new Error(error.message);
  }
  
  return { success: true };
}
