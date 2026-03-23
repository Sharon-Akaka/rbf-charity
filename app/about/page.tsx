import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { Heart, Users, Shield, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerIcon } from "@/components/disclaimer-dialog";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "George Johnson",
    role: "Chaplain",
    imageUrl: "/georgeJohnson.JPG",
  },
  {
    id: "2",
    name: "Reverend Winston Sylvah",
    role: "Clergy",
    imageUrl: "/winstonSylvah.JPG",
  },
  {
    id: "3",
    name: "Reverend Maurice Browne",
    role: "Clergy",
    imageUrl: "",
  },
  {
    id: "4",
    name: "Vidal Williams",
    role: "Treasurer",
    imageUrl: "/vidalWillaims.jpeg",
  },
  {
    id: "5",
    name: "Paul Parker",
    role: "Administrator",
    imageUrl: "/paulParker.jpeg",
  },
  {
    id: "6",
    name: "Dennis John",
    role: "Adviser",
    imageUrl: "/dennisJohn.jpeg",
  },
  {
    id: "7",
    name: "Ekow Fraser",
    role: "Adviser",
    imageUrl: "/ekowFraser.JPG",
  },
  {
    id: "8",
    name: "Michael Edwin",
    role: "Adviser",
    imageUrl: "",
  },
  {
    id: "9",
    name: "Frank Wellington",
    role: "Adviser",
    imageUrl: "/frankWellignton.jpeg",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="About Us"
        description={`Welcome to the Regentonians' Benevolent Fund, learn about our mission, values, and how we operate`}
      // imageUrl="/purplefootballteam.jpeg"
      // imageAlt="About the fund mission"
      // imagePosition="center"
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="inline-flex items-center gap-2">
            <DisclaimerIcon />
            <Button href="/contribute" size="lg">
              Contribute Now
            </Button>
          </span>
          <Button href="/join" variant="outline" size="lg">
            How to Join
          </Button>
        </div>
      </Hero>

      {/* Mission Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-96 animate-fade-in-up">
              <Image
                src="/ourMission.png"
                alt="Community mission and purpose"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                The Regentonians' Benevolent Fund (RBF) exists to provide
                compassionate welfare support to alumni of Sierra Leone Grammar
                School during times of need. We believe in the power of
                community, unity, and brotherhood to uplift and support one
                another through life's challenges and celebrations.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Our purpose is to ensure that no Regentonian faces difficult
                times alone, whether through bereavement, illness, or other life
                challenges. We are committed to maintaining a transparent,
                member-funded organization that operates with integrity and
                care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Support Section */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-in-up">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Who We Support
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                The Regentonians' Benevolent Fund supports contributing Alumni of Sierra Leone
                Grammar School. Our members are former students who share a
                common bond through their educational experience and continue to
                support one another throughout their lives.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We provide assistance to members and their families during times
                of need, including bereavement support, health and recovery
                assistance, and milestone celebrations. Our support extends to
                the broader Regentonian community, recognising that we are all
                connected through our shared history and values.
              </p>
            </div>
            <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-96 animate-fade-in-up animation-delay-200">
              <Image
                src="/heroOne.JPG"
                alt="Alumni community support"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The foundation of everything we do
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
            <Card className="animate-fade-in-up animation-delay-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We approach every situation with compassion and genuine care
                  for our members and their families, ensuring they feel
                  supported and valued.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up animation-delay-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Unity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in the strength of coming together as a community,
                  supporting one another through shared experiences and common
                  goals.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up animation-delay-600 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Brotherhood</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The bonds formed at Sierra Leone Grammar School extend beyond
                  graduation, creating lifelong connections and mutual support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Operate Section */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How the Fund Operates
            </h2>
            <div className="mt-8 space-y-6">
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Member-Funded</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The RBF is entirely funded by its members. Contributions
                    from alumni enable us to provide support to those in need,
                    creating a self-sustaining community of care and mutual
                    assistance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Transparent Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We operate with complete transparency, ensuring that all
                    members understand how funds are managed and distributed.
                    Our commitment to accountability builds trust and confidence
                    in our operations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our People Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our People
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Meet the dedicated individuals who make the Regentonians' Benevolent Fund possible
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => {
              const delayClass =
                index % 3 === 0
                  ? "animation-delay-200"
                  : index % 3 === 1
                    ? "animation-delay-400"
                    : "animation-delay-600";
              return (
                <Card
                  key={member.id}
                  className={`overflow-hidden animate-fade-in-up ${delayClass} transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center`}
                >
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-muted mt-6 shrink-0 ring-2 ring-primary/20">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 192px, 224px"
                      className="object-cover object-top transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
