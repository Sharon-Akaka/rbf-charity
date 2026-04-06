import { Calendar } from "lucide-react";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DisclaimerLink } from "@/components/disclaimer-dialog";
import { getEventGalleryAlbums, getGeneralGalleryAlbums } from "@/lib/community-data";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { GalleryPhotoGrid } from "@/components/gallery-photo-grid";

export default function GalleryPage() {
  const eventAlbums = getEventGalleryAlbums();
  const generalAlbums = getGeneralGalleryAlbums();

  const statusLabel = {
    upcoming: "Upcoming",
    planned: "Planned",
    passed: "Event Album",
  } as const;

  return (
    <div className="flex min-h-screen flex-col">
      <Hero
        title="Regentonians&apos; Gallery"
        description="Explore cherished moments from Regentonians&apos; events and community life."
      >
        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="/join" size="lg" className="w-full sm:w-auto sm:min-w-52">
              How to Join
            </Button>
            <Button href="/events" variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-52">
              View Events
            </Button>
          </div>
          <DisclaimerLink />
        </div>
      </Hero>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-16">

            {/* Event Galleries */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Event Galleries
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Photo albums from our events and gatherings.
                </p>
              </div>

              {eventAlbums.length > 0 ? (
                <div className="grid gap-8 lg:grid-cols-2">
                  {eventAlbums.map((album) => (
                    <Card key={album.id} id={album.id} className="overflow-hidden">
                      <CardHeader>
                        <span className="inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                          {statusLabel[album.status]}
                        </span>
                        <CardTitle className="text-xl">{album.eventTitle}</CardTitle>
                        <CardDescription>{album.description}</CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{album.date}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <GalleryCarousel items={album.photos} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-muted">
                  <CardContent className="py-10 text-center text-sm text-muted-foreground">
                    Event albums will appear here once photos are available.
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Community Archive */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Photo Archive
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Community photos not tied to a specific event.
                </p>
              </div>
              <GalleryPhotoGrid photos={generalAlbums.flatMap((a) => a.photos)} />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
