import { AdminProtected } from "@/components/admin-protected";
import { AdminEventsClient } from "@/components/admin-events-client";
import { Hero } from "@/components/hero";

async function getEvents() {
  try {
    const connectDB = (await import("@/backend/db/connection")).default;
    const Event = (await import("@/backend/models/Event")).default;

    await connectDB();

    const events = await Event.find().sort({ date: 1 }).select("-__v").lean();

    return events.map((event: any) => ({
      _id: event._id.toString(),
      title: event.title,
      description: event.description,
      date: event.date.toISOString().split("T")[0],
      time: event.time,
      location: event.location,
      imageUrl: event.imageUrl || "",
      isActive: event.isActive,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <AdminProtected>
      <div className="flex min-h-screen flex-col">
        <Hero
          title="Manage Events"
          description="Create, edit, and delete events for the RBF community"
          imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
          imageAlt="Admin dashboard"
        />

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AdminEventsClient initialEvents={events} />
          </div>
        </section>
      </div>
    </AdminProtected>
  );
}
