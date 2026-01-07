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

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
}

async function getEvents(): Promise<Event[]> {
  try {
    // Import the model directly for server-side fetching
    const connectDB = (await import("@/backend/db/connection")).default;
    const Event = (await import("@/backend/models/Event")).default;

    await connectDB();

    // Only fetch active events - filter inactive ones at the database level
    const events = await Event.find({ isActive: true })
      .sort({ date: 1 }) // Sort by date ascending (upcoming first)
      .select("-__v -isActive") // Exclude isActive field since we only get active ones
      .lean();

    // Convert MongoDB documents to plain objects
    return events.map((event: any) => ({
      _id: event._id.toString(),
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      time: event.time,
      location: event.location,
      imageUrl: event.imageUrl || undefined,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="Events"
        description="Stay connected with our community through events and gatherings"
        imageUrl="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop"
        imageAlt="Community events"
      />

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
