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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  
  if (normalizedDate.getTime() === today.getTime()) {
    return "Today";
  }
  
  if (normalizedDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }
  
  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  if (normalizedDate >= startOfWeek && normalizedDate <= endOfWeek) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(timeString: string): string {
  if (!timeString || !timeString.includes(':')) {
    return timeString;
  }
  
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);
  
  if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return timeString;
  }
  
  const period = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  
  if (minute === 0) {
    return `${displayHour}${period}`;
  }
  return `${displayHour}:${minute.toString().padStart(2, '0')}${period}`;
}

export function EventCard({ event, registration, userId }: EventCardProps) {
  const [open, setOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(Boolean(registration));

  const registerUser = async () => {
    try {
      const response = await register(userId, event.id);
      if (response.success) {
        setIsRegistered(true);
        toast.success('Registered!', { duration: 3000 });
      }
    } catch (error) {
      toast.error('Registration failed!', { duration: 3000 });
    }
  };

  return (
    <div>
      <CollapsibleCard 
        open={open} 
        onOpenChange={setOpen}
        className={`bg-blue-50 border-blue-200 ${open ? 'shadow-md' : ''}`}
      >
      <CollapsibleCard.Trigger className="flex flex-row items-center justify-between w-full cursor-pointer text-left gap-4 !p-4 !rounded-lg">
        <div className="flex-1 min-w-0">
          <Card.Title 
            className={`font-medium text-base leading-none ${open ? 'text-primary' : 'text-gray-900'}`}
            style={{ fontFamily: 'Inter', letterSpacing: '0%' }}
          >
            {event.name}
          </Card.Title>
          <Card.Subtitle className="text-sm mt-1 text-gray-400">
            {event.location}
          </Card.Subtitle>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <p className="text-sm text-gray-700 whitespace-nowrap">{formatDate(event.date)}</p>
          {open ? (
            <ChevronUp className="w-5 h-5 text-primary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-primary" />
          )}
        </div>
      </CollapsibleCard.Trigger>
      <CollapsibleCard.Content className="p-0">
        <div className="px-4 pt-4 pb-4 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 shrink-0 text-gray-400" />
              <p className="text-sm text-gray-700">{formatTime(event.time)}</p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-gray-400" />
              <p className="text-sm text-gray-700">{event.venue}</p>
            </div>
            <div className="flex items-start gap-3">
              <CircleUserRound className="w-5 h-5 shrink-0 text-gray-400" />
              <p className="text-sm text-gray-700">{event?.organizers?.name || ''}</p>
            </div>
          </div>
          {event.description && (
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 shrink-0" />
              <p className="text-sm text-gray-700">
                {event.description}
              </p>
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Button
              disabled={isRegistered}
              onClick={registerUser}
              variant={isRegistered ? 'registered' : 'primary'}
              size="register"
              className="w-24 rounded-[67px] py-[6px] px-4"
            >
              {isRegistered ? "Registered" : "Register"}
            </Button>
          </div>
        </div>
      </CollapsibleCard.Content>
    </CollapsibleCard>
    </div>
  );
}
