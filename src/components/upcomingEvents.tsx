"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowUpRight, Users, Clock } from "lucide-react";
import { toast } from "sonner";

interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "tournament" | "show" | "meetup";
  spotsLeft?: number;
  registered: boolean;
}

// Mock events data
const mockEventsData: EventData[] = [
  {
    id: "1",
    title: "Good Game India Finale",
    date: "March 15",
    time: "8:00 PM IST",
    location: "Mumbai",
    type: "show",
    spotsLeft: undefined,
    registered: false,
  },
  {
    id: "2",
    title: "Delhi Gaming Tournament",
    date: "March 20",
    time: "6:00 PM IST",
    location: "Delhi",
    type: "tournament",
    spotsLeft: 12,
    registered: false,
  },
  {
    id: "3",
    title: "Creator Meetup",
    date: "March 25",
    time: "4:00 PM IST",
    location: "Bangalore",
    type: "meetup",
    spotsLeft: 5,
    registered: true,
  },
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "tournament":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
    case "show":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    case "meetup":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

export default function UpcomingEventsComponent() {
  const [events, setEvents] = useState(mockEventsData);

  const handleRegister = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              registered: true,
              spotsLeft: event.spotsLeft ? event.spotsLeft - 1 : undefined,
            }
          : event
      )
    );

    const event = events.find((e) => e.id === eventId);
    toast.success(`Registered for ${event?.title}! 🎉`);
  };

  const registeredCount = events.filter((event) => event.registered).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">
            Upcoming Events
          </CardTitle>
          <CardDescription>Don't miss out on the action</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          {registeredCount > 0 && (
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
              {registeredCount} Registered
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-3 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{event.title}</p>
                  {event.registered && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                      Registered
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {event.date} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <Badge
                variant="outline"
                className={getEventTypeColor(event.type)}
              >
                {event.type}
              </Badge>
            </div>

            {/* Registration section */}
            <div className="flex items-center justify-between pt-1">
              {event.spotsLeft !== undefined && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{event.spotsLeft} spots left</span>
                </div>
              )}

              {event.registered ? (
                <Button size="sm" variant="outline" disabled>
                  Registered ✓
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRegister(event.id)}
                  className="ml-auto"
                >
                  Register
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" size="sm">
          View All Events
        </Button>
      </CardFooter>
    </Card>
  );
}
