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

export async function getEvents(userId: string): Promise<GetEventsResponse> {
  const client = await createClient();

  const { data: events, error: eventsError } = await client
    .from("events")
    .select("*, organizers (name, contact_info)");

  if (eventsError) {
    throw new Error(eventsError.message);
  }

  const { data: registrations, error: registrationError } = await client
    .from("registrations")
    .select("*")
    .eq("user_id", userId);
    
  if (registrationError) {
    throw new Error(registrationError.message);
  }

  return { events: events || [], registrations: registrations || [] };
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
