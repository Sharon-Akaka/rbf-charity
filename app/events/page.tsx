import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
}

function getEvents(): Event[] {
  // Dummy data - limited to 8 events
  const dummyEvents: Event[] = [
    {
      _id: "1",
      title: "Thanksgiving",
      description: "Join us for our annual Thanksgiving celebration, bringing together the Regentonians community in gratitude and fellowship.",
      date: new Date(2026, 10, 27).toISOString(), // November 27, 2025
      time: "6:00 PM",
      location: "London, UK",
      imageUrl: "/thanksgiving.jpg",
    },
    {
      _id: "2",
      title: "All Regentonians Evening (A.R.E)",
      description: "An exclusive evening for all Regentonians to reconnect, share memories, and strengthen our bonds of brotherhood.",
      date: new Date(2025, 8, 15).toISOString(), // September 15, 2025
      time: "7:00 PM",
      location: "London, UK",
      imageUrl: "/are.jpeg",
    },
    {
      _id: "3",
      title: "End of Year Social Evening",
      description: "Celebrate the year's achievements and look forward to the future at our annual end-of-year social gathering.",
      date: new Date(2025, 11, 20).toISOString(), // December 20, 2025
      time: "6:30 PM",
      location: "London, UK",
      imageUrl: "/heroThree.JPG",
    },
    {
      _id: "4",
      title: "Collaboration",
      description: "A networking and collaboration event focused on building partnerships and supporting community initiatives.",
      date: new Date(2025, 6, 10).toISOString(), // July 10, 2025
      time: "2:00 PM",
      location: "London, UK",
      imageUrl: "/atTheBar.jpg",
    },
    {
      _id: "5",
      title: "RBF Fun at the Park (Bring and Share)",
      description: "A relaxed family-friendly gathering in the park. Bring your favourite dish to share and enjoy games, food, and fellowship.",
      date: new Date(2025, 7, 15).toISOString(), // August 15, 2025
      time: "12:00 PM",
      location: "London, UK",
      imageUrl: "/heroFour.JPG",
    },
    {
      _id: "6",
      title: "Dinner and Dance",
      description: "An elegant evening of fine dining and dancing. Dress to impress and celebrate our community in style.",
      date: new Date(2025, 9, 5).toISOString(), // October 5, 2025
      time: "7:30 PM",
      location: "London, UK",
      imageUrl: "/atTheBar.jpg",
    },
    {
      _id: "7",
      title: "Annual General Meeting",
      description: "Join us for our Annual General Meeting to review the year's activities, discuss future plans, and vote on important matters.",
      date: new Date(2025, 5, 20).toISOString(), // June 20, 2025
      time: "3:00 PM",
      location: "London, UK",
      imageUrl: "/are.jpeg",
    },
  ];

  // Limit to 8 events (though we only have 7)
  return dummyEvents.slice(0, 8);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventsPage() {
  const events = getEvents();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="Events"
        description="Stay connected with our community through events and gatherings"
        imageUrl="/heroTwo.JPG"
        imageAlt="Community events"
        imagePosition="top"
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/join" variant="outline" size="lg">
            How to Join
          </Button>
          <Button href="/donate" size="lg">
            Contribute Now
          </Button>
        </div>
      </Hero>

      {/* Events Listing */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {events.length > 0 ? (
            <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => {
                const delayClass =
                  index % 3 === 0
                    ? "animation-delay-200"
                    : index % 3 === 1
                      ? "animation-delay-400"
                      : "animation-delay-600";
                return (
                  <Card
                    key={event._id}
                    className={`group border-2 overflow-hidden animate-fade-in-up ${delayClass} transition-all duration-300 hover:shadow-lg flex flex-col`}
                  >
                    {event.imageUrl && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      <CardTitle className="text-xl sm:text-2xl line-clamp-2">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2 mt-2">
                        {event.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary shrink-0" />
                        <span className="font-medium truncate">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary shrink-0" />
                        <span className="truncate">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl">
              <Card className="bg-muted">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">
                    No events scheduled at the moment. Check back soon for
                    upcoming events!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Upcoming Events Note */}
          {events.length > 0 && (
            <div className="mx-auto mt-12 max-w-2xl text-center">
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    More events will be announced throughout the year. Check
                    back regularly or contact us to be added to our mailing list
                    for event updates.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
