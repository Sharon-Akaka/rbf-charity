"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  MapPin,
  Clock,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Check,
} from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  isActive: boolean;
}

interface AdminEventsClientProps {
  initialEvents: Event[];
}

export function AdminEventsClient({ initialEvents }: AdminEventsClientProps) {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    imageUrl: "",
    isActive: true,
  });

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      imageUrl: "",
      isActive: true,
    });
    setEditingEvent(null);
    setError("");
    setSuccess("");
    setIsDialogOpen(false);
  };

  const handleCreate = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      imageUrl: event.imageUrl || "",
      isActive: event.isActive,
    });
    setError("");
    setSuccess("");
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteEventId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteEventId) return;

    try {
      const response = await fetch(`/api/events/${deleteEventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents(events.filter((e) => e._id !== deleteEventId));
      setSuccess("Event deleted successfully");
      setDeleteEventId(null);
      setTimeout(() => setSuccess(""), 3000);
      router.refresh();
    } catch (error: any) {
      setError(error.message || "Failed to delete event");
      setDeleteEventId(null);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const url = editingEvent
        ? `/api/events/${editingEvent._id}`
        : "/api/events";
      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save event");
      }

      // Update local state
      if (editingEvent) {
        setEvents(
          events.map((e) =>
            e._id === editingEvent._id
              ? {
                  _id: editingEvent._id,
                  title: formData.title,
                  description: formData.description,
                  date: formData.date,
                  time: formData.time,
                  location: formData.location,
                  imageUrl: formData.imageUrl,
                  isActive: formData.isActive,
                }
              : e
          )
        );
      } else {
        // Fetch updated list from server
        const updatedResponse = await fetch("/api/events");
        const updatedData = await updatedResponse.json();
        if (updatedData.success) {
          setEvents(
            updatedData.data.map((e: any) => ({
              _id: e._id.toString(),
              title: e.title,
              description: e.description,
              date: new Date(e.date).toISOString().split("T")[0],
              time: e.time,
              location: e.location,
              imageUrl: e.imageUrl || "",
              isActive: e.isActive,
            }))
          );
        }
      }

      // Refresh the page data
      router.refresh();

      setSuccess(
        editingEvent
          ? "Event updated successfully"
          : "Event created successfully"
      );
      setIsDialogOpen(false);
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error: any) {
      setError(error.message || "Failed to save event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header with Logout */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Events Management
          </h2>
          <p className="mt-2 text-muted-foreground">
            Manage all community events from this dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleCreate}
            className="transition-transform duration-200 hover:scale-105"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="rounded-md bg-green-50 p-4 text-green-800 border border-green-200 animate-fade-in-up">
          <p className="text-sm font-medium">{success}</p>
        </div>
      )}
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-800 border border-red-200 animate-fade-in-up">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingEvent ? (
                <>
                  <Edit className="h-5 w-5" />
                  Edit Event
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Create New Event
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {editingEvent
                ? "Update event details below"
                : "Fill in the details to create a new event"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-red-800 border border-red-200">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="dialog-title"
                  className="text-sm font-medium leading-none"
                >
                  Event Title *
                </label>
                <input
                  id="dialog-title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Annual General Meeting 2024"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dialog-date"
                  className="text-sm font-medium leading-none"
                >
                  Event Date *
                </label>
                <input
                  id="dialog-date"
                  name="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="dialog-time"
                  className="text-sm font-medium leading-none"
                >
                  Event Time *
                </label>
                <input
                  id="dialog-time"
                  name="time"
                  type="text"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="2:00 PM"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dialog-location"
                  className="text-sm font-medium leading-none"
                >
                  Location *
                </label>
                <input
                  id="dialog-location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Virtual Meeting"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="dialog-description"
                className="text-sm font-medium leading-none"
              >
                Description *
              </label>
              <textarea
                id="dialog-description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Event description..."
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="dialog-imageUrl"
                className="text-sm font-medium leading-none"
              >
                Image URL (Optional)
              </label>
              <input
                id="dialog-imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="dialog-isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="dialog-isActive"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Event is active (visible on website)
              </label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="transition-transform duration-200 hover:scale-105"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : editingEvent ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Update Event
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog
        open={deleteEventId !== null}
        onOpenChange={(open) => !open && setDeleteEventId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone and the event will be permanently removed from the
              database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Events List */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground">
          All Events ({events.length})
        </h3>

        {events.length === 0 ? (
          <Card className="bg-muted">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                No events yet. Create your first event using the button above!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {events.map((event, index) => {
              const delayClass =
                index === 0
                  ? "animation-delay-200"
                  : index === 1
                  ? "animation-delay-400"
                  : "animation-delay-600";
              return (
                <Card
                  key={event._id}
                  className={`animate-fade-in-up ${delayClass} transition-all duration-300 hover:shadow-lg ${
                    !event.isActive ? "opacity-60" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {event.description}
                        </CardDescription>
                      </div>
                      {!event.isActive && (
                        <span className="ml-4 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                          Inactive
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(event)}
                        className="transition-transform duration-200 hover:scale-105"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(event._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-transform duration-200 hover:scale-105"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
