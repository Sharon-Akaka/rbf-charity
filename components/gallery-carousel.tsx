"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GalleryCarouselItem {
  id: string;
  title: string;
  url: string;
  downloadName: string;
}

interface GalleryCarouselProps {
  items: GalleryCarouselItem[];
  placeholderImageUrl?: string;
}

export function GalleryCarousel({
  items,
  placeholderImageUrl = "/eventPlaceholder.png",
}: GalleryCarouselProps) {
  const preparedItems = useMemo<GalleryCarouselItem[]>(() => {
    if (items.length > 0) return items;
    return [
      {
        id: "placeholder",
        title: "Placeholder image",
        url: placeholderImageUrl,
        downloadName: "gallery-placeholder.png",
      },
    ];
  }, [items, placeholderImageUrl]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const currentItem = preparedItems[currentIndex];
  const currentImageUrl = currentItem.url || placeholderImageUrl;

  const goPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? preparedItems.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === preparedItems.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft" && preparedItems.length > 1) {
        setCurrentIndex((prev) =>
          prev === 0 ? preparedItems.length - 1 : prev - 1
        );
      }
      if (event.key === "ArrowRight" && preparedItems.length > 1) {
        setCurrentIndex((prev) =>
          prev === preparedItems.length - 1 ? 0 : prev + 1
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, preparedItems.length]);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-lg border border-border bg-muted/40">
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="group relative block w-full cursor-zoom-in text-left"
          aria-label={`Open ${currentItem.title} in full-screen view`}
        >
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={currentImageUrl}
              alt={currentItem.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-xs font-medium text-white">
              <Expand className="h-3 w-3" />
              Full screen
            </div>
          </div>
        </button>

      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Image {currentIndex + 1} of {preparedItems.length}
        </p>

        <a
          href={currentImageUrl}
          download={currentItem.downloadName}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          )}
        >
          <Download className="h-4 w-4" />
          Download
        </a>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-primary/[0.08] p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute inset-0"
            aria-label="Close full-screen preview"
          />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-4">
            <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background/90 shadow-2xl">
              <Image
                src={currentImageUrl}
                alt={currentItem.title}
                fill
                className="object-contain"
                priority
              />

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setIsLightboxOpen(false)}
                className="absolute right-3 top-3"
                aria-label="Close full-screen preview"
              >
                <X className="h-4 w-4" />
              </Button>

              {preparedItems.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={goPrevious}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-border bg-background/95 px-4 py-3 text-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Image {currentIndex + 1} of {preparedItems.length}
              </p>
              <a
                href={currentImageUrl}
                download={currentItem.downloadName}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
