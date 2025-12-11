"use client";

import { EventAndOrganizer, getEvents } from "./actions";
import { EventCard } from "./EventCard";
import { Header } from "./Header";
import { useEffect, useState, useCallback } from "react";
import { Registration } from "@/types/supabase";
import { typedClient } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { Search } from "lucide-react";
import { Form, Button } from "@event-ease/ui";

type RegistrationFilter = "all" | "registered" | "not-registered";

export default function EventsPage() {
  const [events, setEvents] = useState<EventAndOrganizer[]>([]);
  const [registrations, setRegistrations] = useState<Array<Registration>>([]);
  const [user, setUser] = useState<User | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [registrationFilter, setRegistrationFilter] = useState<RegistrationFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchEvents = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await getEvents(
        user.id,
        debouncedSearchQuery || undefined,
        registrationFilter
      );
      setEvents(response.events);
      setRegistrations(response.registrations);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, debouncedSearchQuery, registrationFilter]);

  useEffect(() => {
    const initializeUser = async () => {
      const {
        data: { user: fetchedUser },
      } = await typedClient.auth.getUser();
      setUser(fetchedUser);
    };
    
    initializeUser();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="w-full bg-white min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Community Events
            </h1>
            <div className="w-full sm:w-auto">
              <Form.Root onSubmit={(e) => e.preventDefault()}>
                <Form.Field className="relative" name="search">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-black rounded-md py-3 pr-3 pl-11"
                  />
                </Form.Field>
              </Form.Root>
            </div>
          </div>
          
          {/* Registration Filter */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex gap-2">
              <Button
                onClick={() => setRegistrationFilter("all")}
                variant={registrationFilter === "all" ? "primary" : "secondary"}
                size="sm"
                className="px-4 py-2 text-sm rounded-md"
              >
                All Events
              </Button>
              <Button
                onClick={() => setRegistrationFilter("registered")}
                variant={registrationFilter === "registered" ? "primary" : "secondary"}
                size="sm"
                className="px-4 py-2 text-sm rounded-md"
              >
                Registered
              </Button>
              <Button
                onClick={() => setRegistrationFilter("not-registered")}
                variant={registrationFilter === "not-registered" ? "primary" : "secondary"}
                size="sm"
                className="px-4 py-2 text-sm rounded-md"
              >
                Not Registered
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading events...</div>
          ) : error ? null : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="w-8 h-8 text-gray-300 mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">No events found</p>
              <p className="text-sm text-gray-400">Try another keyword or clear your search.</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 gap-4">
              {events.map((event) => (
                <div key={event.id} className="break-inside-avoid mb-4">
                  <EventCard
                    event={event}
                    registration={registrations.find(
                      (registration) => registration.event_id === event.id
                    )}
                    userId={user?.id || ""}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
