import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { Heart, HandHeart, Cake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="Support We Provide"
        description="Three core areas where we offer compassionate assistance to our community"
        imageUrl="/heroFour.JPG"
        imageAlt="Support and assistance"
      >
      </Hero>

      {/* Support Areas */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-12">
            {/* Bereavement Support */}
            <Card className="border-2 overflow-hidden animate-fade-in-up transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=600&fit=crop"
                  alt="Bereavement support and compassion"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">Bereavement Support</CardTitle>
                <CardDescription className="text-lg">
                  "Cry Berrin"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-8 text-muted-foreground">
                  Losing a loved one is one of life's most difficult
                  experiences. The Regentonians Benevolent Fund provides
                  compassionate support and financial assistance to families
                  during these challenging times.
                </p>
                <p className="text-lg leading-8 text-muted-foreground">
                  Our "Cry Berrin" programme ensures that members and their
                  families receive the support they need to navigate bereavement
                  with dignity. We understand that grief affects everyone
                  differently, and we are here to help in whatever way is most
                  meaningful.
                </p>
                <div className="pt-4">
                  <p className="font-medium text-foreground">
                    Support includes:
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>
                      Financial assistance for funeral and memorial expenses
                    </li>
                    <li>Emotional support and community outreach</li>
                    <li>Coordination of memorial services and tributes</li>
                    <li>
                      Ongoing support for families during the grieving process
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Get Well Soon Support */}
            <Card className="border-2 overflow-hidden animate-fade-in-up animation-delay-200 transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full">
                <Image
                  src="/getWellSoon.jpeg"
                  alt="Health and recovery support"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                  <HandHeart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">
                  Get Well Soon Support
                </CardTitle>
                <CardDescription className="text-lg">
                  Health & Recovery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-8 text-muted-foreground">
                  When a member faces illness or injury, the RBF community
                  rallies to provide support and encouragement. Our Get Well
                  Soon programme offers both practical assistance and emotional
                  support during recovery.
                </p>
                <p className="text-lg leading-8 text-muted-foreground">
                  We believe that knowing you have a community behind you can
                  make a significant difference in the healing process. Whether
                  it's a short-term illness or a longer recovery journey, we're
                  here to help.
                </p>
                <div className="pt-4">
                  <p className="font-medium text-foreground">
                    Support includes:
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>
                      Financial assistance for medical expenses when needed
                    </li>
                    <li>Care packages and thoughtful gestures</li>
                    <li>Regular check-ins and emotional support</li>
                    <li>Coordination of community visits and messages</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Milestone Birthdays */}
            <Card className="border-2 overflow-hidden animate-fade-in-up animation-delay-400 transition-all duration-300 hover:shadow-lg">
              <div className="relative h-80 w-full">
                <Image
                  src="/birthdayMilestone.jpeg"
                  alt="Birthday milestone celebration"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                  <Cake className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">Milestone Birthdays</CardTitle>
                <CardDescription className="text-lg">
                  Celebrating Together
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-8 text-muted-foreground">
                  Life's milestones deserve to be celebrated, and the RBF
                  community takes great joy in recognising significant birthdays
                  of our members. These celebrations strengthen our bonds and
                  honour the contributions each member has made to our community.
                </p>
                <p className="text-lg leading-8 text-muted-foreground">
                  Whether it's a 50th, 60th, 70th, or another significant
                  milestone, we come together to celebrate, share memories, and
                  express our appreciation for the member's presence in our
                  community.
                </p>
                <div className="pt-4">
                  <p className="font-medium text-foreground">
                    Recognition includes:
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                    <li>Special recognition and tributes from the community</li>
                    <li>Celebratory gatherings and events</li>
                    <li>Commemorative gifts and messages</li>
                    <li>Documentation of the celebration for the member</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Need Support?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              If you or a fellow Regentonian needs assistance, please don't
              hesitate to reach out. We're here to help.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/donate"
                size="lg"
                className="transition-transform duration-200 hover:scale-105"
              >
                Contribute Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="transition-transform duration-200 hover:scale-105"
              >
                Contact Us
              </Button>
              <Button
                href="/join"
                variant="secondary"
                size="lg"
                className="transition-transform duration-200 hover:scale-105"
              >
                Join RBF
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
