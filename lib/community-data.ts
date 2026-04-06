export type EventStatus = "upcoming" | "planned" | "passed";

export interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  downloadName: string;
}

export interface CommunityEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  eventDateISO?: string;
  galleryPhotos?: GalleryPhoto[];
}

export interface CommunityEventWithStatus extends CommunityEvent {
  status: EventStatus;
}

export interface EventGalleryAlbum {
  id: string;
  eventId: string;
  eventTitle: string;
  description: string;
  date: string;
  coverImageUrl: string;
  status: EventStatus;
  photos: GalleryPhoto[];
}

export interface GeneralGalleryAlbum {
  id: string;
  title: string;
  description: string;
  date: string;
  coverImageUrl: string;
  photos: GalleryPhoto[];
}

const thanksgivingPhotoCount = 89;
const thanksgivingGalleryPhotos: GalleryPhoto[] = Array.from(
  { length: thanksgivingPhotoCount },
  (_, index) => {
    const photoNumber = String(index + 1).padStart(3, "0");

    return {
      id: `thanksgiving-2026-${photoNumber}`,
      title: `Thanksgiving 2026 Photo ${index + 1}`,
      url: `/gallery/events/thanksgiving-2026/photo-${photoNumber}.jpeg`,
      downloadName: `thanksgiving-2026-photo-${photoNumber}.jpeg`,
    };
  }
);

const communityEvents: CommunityEvent[] = [
  {
    _id: "1",
    title: "Thanksgiving",
    description:
      "Join us for our annual Thanksgiving celebration, bringing together the Regentonians' community in gratitude and fellowship.",
    date: "22 March 2026",
    time: "TBC",
    location: "London, UK",
    imageUrl: "/gallery/events/thanksgiving-2026/photo-002.jpeg",
    eventDateISO: "2026-03-22",
    galleryPhotos: thanksgivingGalleryPhotos,
  },
  {
    _id: "2",
    title: "All Regentonians' Evening (A.R.E)",
    description:
      "An exclusive evening for Regentonians to reconnect, share memories, and strengthen our bonds of brotherhood.",
    date: "26 October 2026",
    time: "TBC",
    location: "London, UK",
    imageUrl: "/gallery/events/all-regentonians-evening/cover.jpeg",
    eventDateISO: "2026-10-26",
  },
  {
    _id: "3",
    title: "End of Year Social Evening",
    description:
      "Celebrate the year's achievements and look forward to the future at our annual end-of-year social gathering.",
    date: "26 December 2026",
    time: "TBC",
    location: "London, UK",
    imageUrl: "/gallery/events/end-of-year-social-evening/cover.JPG",
    eventDateISO: "2026-12-26",
  },
  {
    _id: "4",
    title: "Collaboration",
    description:
      "A networking and collaboration event focused on building partnerships and supporting community initiatives.",
    date: "TBC",
    time: "TBC",
    location: "London, UK",
    imageUrl: "/gallery/events/collaboration/cover.png",
  },
  {
    _id: "5",
    title: "RBF Fun at the Park (Bring and Share)",
    description:
      "A relaxed family-friendly gathering in the park. Bring your favourite dish to share and enjoy games, food, and fellowship.",
    date: "Summer 2026",
    time: "TBC",
    location: "London, UK",
    imageUrl: "/gallery/events/rbf-fun-at-the-park/cover.png",
  },
  {
    _id: "6",
    title: "Dinner and Dance",
    description:
      "An elegant evening of fine dining and dancing. Dress to impress and celebrate our community in style.",
    date: "TBC",
    time: "TBC",
    location: "London, UK",
    imageUrl: "/gallery/events/dinner-and-dance/cover.png",
  },
  {
    _id: "7",
    title: "Annual General Meeting",
    description:
      "Join us for our Annual General Meeting to review the year's activities, discuss future plans, and vote on important matters.",
    date: "September 2026",
    time: "TBC",
    location: "London, UK",
    imageUrl: "/gallery/events/annual-general-meeting/cover.png",
  },
];

const generalGalleryAlbums: GeneralGalleryAlbum[] = [];

function getEventTimestamp(eventDateISO?: string): number | null {
  if (!eventDateISO) return null;
  const date = new Date(`${eventDateISO}T23:59:59`);
  if (Number.isNaN(date.getTime())) return null;
  return date.getTime();
}

function getStatus(event: CommunityEvent, referenceDate: Date): EventStatus {
  const timestamp = getEventTimestamp(event.eventDateISO);
  if (timestamp === null) return "planned";

  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  return timestamp < today.getTime() ? "passed" : "upcoming";
}

export function getCommunityEvents(referenceDate = new Date()): CommunityEventWithStatus[] {
  const statusPriority: Record<EventStatus, number> = {
    upcoming: 0,
    planned: 1,
    passed: 2,
  };

  return [...communityEvents]
    .map((event) => ({
      ...event,
      status: getStatus(event, referenceDate),
    }))
    .sort((a, b) => {
      const priorityDiff = statusPriority[a.status] - statusPriority[b.status];
      if (priorityDiff !== 0) return priorityDiff;

      const aTime = getEventTimestamp(a.eventDateISO);
      const bTime = getEventTimestamp(b.eventDateISO);
      if (aTime === null || bTime === null) return 0;

      return a.status === "passed" ? bTime - aTime : aTime - bTime;
    });
}

export function getEventGalleryAlbums(referenceDate = new Date()): EventGalleryAlbum[] {
  return getCommunityEvents(referenceDate)
    .filter((event) => (event.galleryPhotos?.length ?? 0) > 0)
    .map((event) => {
      const photos = event.galleryPhotos || [];
      const coverPhoto = event.imageUrl
        ? photos.find((photo) => photo.url === event.imageUrl)
        : undefined;
      const orderedPhotos = coverPhoto
        ? [coverPhoto, ...photos.filter((photo) => photo.id !== coverPhoto.id)]
        : photos;

      return {
        id: `event-album-${event._id}`,
        eventId: event._id,
        eventTitle: event.title,
        description:
          event.status === "passed"
            ? `${event.title} photo highlights and downloadable images.`
            : `Preview album for ${event.title}.`,
        date: event.date,
        coverImageUrl:
          event.imageUrl || orderedPhotos[0]?.url || "/eventPlaceholder.png",
        status: event.status,
        photos: orderedPhotos,
      };
    });
}

export function getGeneralGalleryAlbums() {
  return [...generalGalleryAlbums];
}

export function getGalleryAlbumByEventId(eventId: string) {
  return getEventGalleryAlbums().find((album) => album.eventId === eventId);
}
