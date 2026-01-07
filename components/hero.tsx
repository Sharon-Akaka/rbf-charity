import Image from "next/image";
import { ReactNode } from "react";

interface HeroProps {
  title: string;
  description?: string;
  children?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
}

export function Hero({ title, description, children, imageUrl, imageAlt }: HeroProps) {
  const defaultImageUrl = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop";
  const defaultAlt = "Community support and unity";

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20 via-primary/10 to-background py-20 sm:py-32">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageUrl || defaultImageUrl}
          alt={imageAlt || defaultAlt}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

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

