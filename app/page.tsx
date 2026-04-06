import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/hero";
import { DisclaimerLink } from "@/components/disclaimer-dialog";
import { PolicyModal } from "@/components/policy-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, HandHeart, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="The Regentonians' Benevolent Fund"
        // imageUrl="/heroOne.JPG"
        // imageAlt="Community support and unity"
        // imagePosition="center"
      >
        <div className="space-y-2">
          <p className="text-lg leading-7 text-foreground/90 sm:text-xl">
            Providing compassionate welfare support to alumni of Sierra Leone
            Grammar School in times of need. Rooted in{" "}
            <span className="font-semibold">care</span>,{" "}
            <span className="font-semibold">unity</span> and{" "}
            <span className="font-semibold">brotherhood</span>.
          </p>
          <p className="flex items-center justify-center gap-3 text-sm italic text-foreground/70 sm:text-base">
            <span className="h-px w-8 bg-foreground/40" aria-hidden />
            Standing together, caring for one another
            <span className="h-px w-8 bg-foreground/40" aria-hidden />
          </p>
        </div>
        <div className="mx-auto mt-8 flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <Button
              href="/contribute"
              size="lg"
              className="w-full transition-transform duration-200 hover:scale-105 sm:w-auto sm:min-w-52"
            >
              Contribute Now
            </Button>
            <Button
              href="/join"
              variant="outline"
              size="lg"
              className="w-full transition-transform duration-200 hover:scale-105 sm:w-auto sm:min-w-52"
            >
              How to Join
            </Button>
            <PolicyModal asButton className="w-full transition-transform duration-200 hover:scale-105 sm:w-auto sm:min-w-52" />
          </div>
          <DisclaimerLink />
        </div>
      </Hero>

      {/* What We Do Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-96 animate-fade-in-up">
              <Image
                src="/whatWeDo.png"
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
                The Regentonians' Benevolent Fund (RBF) is a member-funded club
                dedicated to supporting alumni of Sierra Leone Grammar School.
                We provide compassionate assistance during difficult times,
                celebrating milestones, and fostering a strong sense of
                community and brotherhood. <br /> It is not a registered charity
                or charitable trust, it is an internal support initiative under
                the Sierra Leone Grammar School Old Boys’ Association Foundation
                Trust (UK) for the benefit of its members and related persons.
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
          <div className="mx-auto mt-16 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/support#milestone-birthdays" className="block h-full">
              <Card className="group border-2 overflow-hidden animate-fade-in-up animation-delay-600 flex flex-col transition-all duration-300 hover:shadow-lg h-full cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/birthdayCard-SA.png"
                    alt="Community celebration"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Milestone Birthdays</CardTitle>
                  <CardDescription className="mt-2">
                    Celebrating Together
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Recognising and celebrating significant milestone birthdays,
                    honouring our members and strengthening the bonds of our
                    community.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/support#bereavement-support" className="block h-full">
              <Card className="group border-2 overflow-hidden animate-fade-in-up animation-delay-200 flex flex-col transition-all duration-300 hover:shadow-lg h-full cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/lossCard-SA.png"
                    alt="Bereavement support and compassion"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Bereavement Support</CardTitle>
                  <CardDescription className="mt-2">
                    &ldquo;Cry Berrin&rdquo;
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Providing compassionate support and financial assistance to
                    families during times of loss, helping them navigate
                    difficult periods with dignity and care.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link
              href="/support#get-well-soon-support"
              className="block h-full"
            >
              <Card className="group border-2 overflow-hidden animate-fade-in-up animation-delay-400 flex flex-col transition-all duration-300 hover:shadow-lg h-full cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/wellSoonCard-SA.png"
                    alt="Health and recovery support"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <HandHeart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Get Well Soon Support
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Health &amp; Recovery
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Offering support and encouragement to members during illness
                    or recovery, ensuring they know they are not alone in their
                    journey back to health.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/support#mentoring-scheme" className="block h-full">
              <Card className="group border-2 overflow-hidden animate-fade-in-up animation-delay-600 flex flex-col transition-all duration-300 hover:shadow-lg h-full cursor-pointer">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src="/mentoringMission.png"
                    alt="Mentoring and mission support"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader className="flex-1">
                  <div className="mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    Mission: Mentoring Scheme
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Personal &amp; Professional Growth
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our mentoring scheme supports members&apos; personal and
                    professional development by connecting them with peers for
                    guidance and shared experience.
                  </p>
                </CardContent>
              </Card>
            </Link>
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
              lives of fellow Regentonians'.
            </p>
            <div className="mx-auto mt-10 flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none">
              <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
                <Button
                  href="/contribute"
                  size="lg"
                  className="w-full transition-transform duration-200 hover:scale-105 sm:w-auto sm:min-w-52"
                >
                  Contribute Now
                </Button>
                <Button
                  href="/join"
                  variant="outline"
                  size="lg"
                  className="w-full transition-transform duration-200 hover:scale-105 sm:w-auto sm:min-w-52"
                >
                  Join RBF
                </Button>
                <PolicyModal asButton className="w-full transition-transform duration-200 hover:scale-105 sm:w-auto sm:min-w-52" />
              </div>
              <DisclaimerLink />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
