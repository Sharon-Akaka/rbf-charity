"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  title: string;
  url: string;
  downloadName: string;
}

interface GalleryPhotoGridProps {
  photos: Photo[];
}

export function GalleryPhotoGrid({ photos }: GalleryPhotoGridProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
        Additional photos will appear here.
      </div>
    );
  }

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  const prev = () =>
    setLightboxIndex((i) => (i === null ? 0 : i === 0 ? photos.length - 1 : i - 1));

  const next = () =>
    setLightboxIndex((i) => (i === null ? 0 : i === photos.length - 1 ? 0 : i + 1));

  if (!expanded) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {photos.slice(0, 3).map((photo, index) => (
            <div key={photo.id} className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <Image src={photo.url} alt={photo.title} fill className="object-cover" />
              {index === 2 && photos.length > 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-white font-semibold text-lg">+{photos.length - 3}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {photos.length > 3 && (
          <Button variant="outline" onClick={() => setExpanded(true)}>
            View all {photos.length} photos
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-lg border bg-muted cursor-zoom-in"
            aria-label={`Open ${photo.title}`}
          >
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <Expand className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </button>
        ))}
      </div>

      <Button variant="ghost" size="sm" onClick={() => setExpanded(false)} className="text-muted-foreground">
        Hide photos
      </Button>

      {/* Lightbox */}
      {current !== null && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-primary/[0.08] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          />

          <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center gap-4 p-4 sm:p-6">
            <div className="relative flex-1 overflow-hidden rounded-xl border border-border bg-background/90">
              <Image
                src={current.url}
                alt={current.title}
                fill
                className="object-contain"
                priority
              />

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setLightboxIndex(null)}
                className="absolute right-3 top-3"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>

              {photos.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-background/95 px-4 py-3 text-foreground shadow-sm">
              <p className="text-xs text-muted-foreground">
                Image {lightboxIndex + 1} of {photos.length}
              </p>
              <a
                href={current.url}
                download={current.downloadName}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition-colors"
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
