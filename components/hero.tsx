import Image from "next/image";
import { ReactNode } from "react";

interface HeroProps {
  title: string;
  description?: string;
  children?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "top" | "center" | "bottom";
}

const imagePositionClass = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

export function Hero({ title, description, children, imageUrl, imageAlt, imagePosition = "top" }: HeroProps) {
  const defaultAlt = "Community support and unity";
  const hasImage = Boolean(imageUrl);

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-32 md:min-h-[500px]">
      {/* Background */}
      {hasImage ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={imageUrl!}
            alt={imageAlt || defaultAlt}
            fill
            className={`object-cover ${imagePositionClass[imagePosition]}`}
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background/80" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground animate-fade-in-up sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in-up animation-delay-200 sm:text-xl">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-10 animate-fade-in-up animation-delay-400">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

