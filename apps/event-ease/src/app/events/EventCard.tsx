"use client";

import { Registration } from "@/types/supabase";
import { Button, Card, CollapsibleCard, toast } from "@event-ease/ui";
import { ChevronDown, ChevronUp, CircleUserRound, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { register, type EventAndOrganizer } from "./actions";

type EventCardProps = {
  event: EventAndOrganizer;
  registration?: Registration;
  userId: string;
};

// react-hot-toast docs: https://react-hot-toast.com/docs
export function EventCard({ event, registration, userId }: EventCardProps) {
  const [open, setOpen] = useState(false);

  const registerUser = async () => {
    try {
      const response = await register(userId, event.id);
      if (response.success) {
        toast.success('Registered!', { duration: 3000 });
      }
    } catch (error) {
      toast.error('Registration failed!', { duration: 3000 });
    }
  };

  return (
    <CollapsibleCard open={open} onOpenChange={setOpen}>
      <CollapsibleCard.Trigger className="flex items-center justify-between w-full cursor-pointer text-left">
        <div>
          <Card.Title>
            {event.name}
          </Card.Title>
          <Card.Subtitle>
            {event.location}
          </Card.Subtitle>
        </div>
        <div className="flex items-center gap-4">
          <p>{event.date}</p>
          {open ? <ChevronUp /> : <ChevronDown />}
        </div>
      </CollapsibleCard.Trigger>
      <CollapsibleCard.Content>
        <div>
          <div>
            <div className="flex items-center gap-2">
              <Clock />
              <p>{event.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin />
              <p>{event.venue}</p>
            </div>
            <div className="flex items-center gap-2">
              <CircleUserRound />
              <p>{event?.organizers?.name}</p>
            </div>
            <p>{event.description}</p>
          </div>
          <div className="flex justify-end">
            <Button
              disabled={Boolean(registration)}
              onClick={registerUser}
              variant={registration ? 'success' : 'primary'}
            >
              {registration ? "Registered" : "Register"}
            </Button>
          </div>
        </div>
      </CollapsibleCard.Content>
    </CollapsibleCard>
  );
}
