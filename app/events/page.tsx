import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { Calendar, Camera, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerLink } from "@/components/disclaimer-dialog";
import { getCommunityEvents, getGalleryAlbumByEventId } from "@/lib/community-data";

function splitDescription(description: string, previewLength = 125) {
  if (description.length <= previewLength) {
    return { preview: description, remainder: "" };
  }

  const cutoff = description.lastIndexOf(" ", previewLength);
  const safeCutoff = cutoff > 0 ? cutoff : previewLength;

  return {
    preview: description.slice(0, safeCutoff).trimEnd(),
    remainder: description.slice(safeCutoff).trimStart(),
  };
}

export default function EventsPage() {
  const events = getCommunityEvents();
  const statusStyles = {
    upcoming: "border-emerald-200 bg-emerald-100 text-emerald-800",
    planned: "border-amber-200 bg-amber-100 text-amber-800",
    passed: "border-slate-200 bg-slate-100 text-slate-700",
  } as const;
  const statusLabel = {
    upcoming: "Upcoming",
    planned: "Planned",
    passed: "Event has passed",
  } as const;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="Events"
        description="Stay connected with our community through events and gatherings"
        // imageUrl="/heroTwo.JPG"
        // imageAlt="Community events"
        // imagePosition="top"
      >
        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="/join" variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-52">
              How to Join
            </Button>
            <Button href="/contribute" size="lg" className="w-full sm:w-auto sm:min-w-52">
              Contribute Now
            </Button>
          </div>
          <DisclaimerLink />
        </div>
      </Hero>

      {/* Events Listing */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {events.length > 0 ? (
            <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => {
                const linkedAlbum = getGalleryAlbumByEventId(event._id);
                const { preview, remainder } = splitDescription(event.description);
                const delayClass =
                  index % 3 === 0
                    ? "animation-delay-200"
                    : index % 3 === 1
                      ? "animation-delay-400"
                      : "animation-delay-600";
                return (
                  <Card
                    key={event._id}
                    id={`event-${event._id}`}
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
                      <span
                        className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[event.status]}`}
                      >
                        {statusLabel[event.status]}
                      </span>
                      <CardTitle className="text-xl sm:text-2xl line-clamp-2">
                        {event.title}
                      </CardTitle>
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          {preview}
                          {remainder && "..."}
                        </p>
                        {remainder && (
                          <details className="mt-2">
                            <summary className="cursor-pointer text-xs font-medium text-primary underline underline-offset-4 marker:text-primary">
                              Read full details
                            </summary>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {remainder}
                            </p>
                          </details>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary shrink-0" />
                        <span className="font-medium truncate">
                          {event.date}
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
                      {event.status === "passed" && linkedAlbum && (
                        <Button
                          href={`/gallery#${linkedAlbum.id}`}
                          variant="secondary"
                          className="w-full"
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          View Event Photos
                        </Button>
                      )}
                      {event.status === "passed" && !linkedAlbum && (
                        <p className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
                          Event has passed. Photos will be added to the gallery soon.
                        </p>
                      )}
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
                    <div className="mt-4">
                      <Button href="/gallery" variant="outline">
                        Browse Photo Gallery
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
          )}
        </div>
      </section>
    </div>
  );
}
