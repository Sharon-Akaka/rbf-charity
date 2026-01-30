import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { Heart, Users, HandHeart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="The Regentonians Benevolent Fund"
        description="Providing compassionate welfare support to alumni of Sierra Leone Grammar School during times of need. Rooted in care, unity, and brotherhood."
        imageUrl="/heroOne.JPG"
        imageAlt="Community support and unity"
        imagePosition="center"
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/donate" size="lg">
            Contribute Now
          </Button>
          <Button href="/join" variant="outline" size="lg">
            How to Join
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </Hero>

      {/* What We Do Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-96 animate-fade-in-up">
              <Image
                src="/whatwedo.jpeg"
                alt="Community support and unity"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What We Do
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                The Regentonians Benevolent Fund (RBF) is a member-funded
                charity dedicated to supporting alumni of Sierra Leone Grammar
                School. We provide compassionate assistance during difficult
                times, celebrating milestones, and fostering a strong sense of
                community and brotherhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Support Section - 3 Pillars */}
      <section className="bg-muted py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How We Support
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our support is delivered through three core pillars
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden animate-fade-in-up animation-delay-200 flex flex-col transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-3/4 w-full min-h-[280px] sm:min-h-[320px]">
                <Image
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=700&fit=crop"
                  alt="Bereavement support and compassion"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader className="flex-1 flex flex-col">
                <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Bereavement Support</CardTitle>
                <CardDescription>"Cry Berrin"</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Providing compassionate support and financial assistance to
                  families during times of loss, helping them navigate difficult
                  periods with dignity and care.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden animate-fade-in-up animation-delay-400 flex flex-col transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-3/4 w-full min-h-[280px] sm:min-h-[320px]">
                <Image
                  src="/getWellSoon.jpeg"
                  alt="Health and recovery support"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader className="flex-1 flex flex-col">
                <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <HandHeart className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Get Well Soon Support</CardTitle>
                <CardDescription>Health & Recovery</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Offering support and encouragement to members during illness
                  or recovery, ensuring they know they are not alone in their
                  journey back to health.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden animate-fade-in-up animation-delay-600 flex flex-col transition-all duration-300 hover:shadow-xl">
              <div className="relative aspect-3/4 w-full min-h-[280px] sm:min-h-[320px]">
                <Image
                  src="/birthdayMilestone.jpeg"
                  alt="Community celebration"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader className="flex-1 flex flex-col">
                <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Milestone Birthdays</CardTitle>
                <CardDescription>Celebrating Together</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Recognising and celebrating significant milestone birthdays,
                  honouring our members and strengthening the bonds of our
                  community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in-up">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Get Involved
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join our community of caring alumni and make a difference in the
              lives of fellow Regentonians.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/donate"
                size="lg"
                className="transition-transform duration-200 hover:scale-105"
              >
                Contribute Now
              </Button>
              <Button
                href="/join"
                variant="outline"
                size="lg"
                className="transition-transform duration-200 hover:scale-105"
              >
                Join RBF
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="transition-transform duration-200 hover:scale-105"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
