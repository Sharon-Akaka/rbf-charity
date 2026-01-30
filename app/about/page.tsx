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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Chairman",
    bio: "Leading the RBF with dedication and vision, ensuring our mission of support and brotherhood continues to thrive.",
    imageUrl: "https://ui-avatars.com/api/?name=John+Smith&size=400&background=6B21A8&color=ffffff&bold=true&font-size=0.5",
  },
  {
    id: "2",
    name: "Michael Johnson",
    role: "Treasurer",
    bio: "Managing our funds with transparency and integrity, ensuring every contribution makes a meaningful impact.",
    imageUrl: "https://ui-avatars.com/api/?name=Michael+Johnson&size=400&background=7C3AED&color=ffffff&bold=true&font-size=0.5",
  },
  {
    id: "3",
    name: "David Williams",
    role: "Secretary",
    bio: "Coordinating our activities and maintaining strong communication within our community of Regentonians.",
    imageUrl: "https://ui-avatars.com/api/?name=David+Williams&size=400&background=8B5CF6&color=ffffff&bold=true&font-size=0.5",
  },
  {
    id: "4",
    name: "Robert Brown",
    role: "Welfare Coordinator",
    bio: "Ensuring that members receive the support they need during difficult times with compassion and care.",
    imageUrl: "https://ui-avatars.com/api/?name=Robert+Brown&size=400&background=9333EA&color=ffffff&bold=true&font-size=0.5",
  },
  {
    id: "5",
    name: "James Davis",
    role: "Events Organiser",
    bio: "Bringing our community together through memorable events that strengthen our bonds of brotherhood.",
    imageUrl: "https://ui-avatars.com/api/?name=James+Davis&size=400&background=A855F7&color=ffffff&bold=true&font-size=0.5",
  },
  {
    id: "6",
    name: "Thomas Wilson",
    role: "Communications Officer",
    bio: "Keeping our members informed and connected, sharing updates and stories from our Regentonian community.",
    imageUrl: "https://ui-avatars.com/api/?name=Thomas+Wilson&size=400&background=6B21A8&color=ffffff&bold=true&font-size=0.5",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="About Us"
        description={`Welcome to the Regentonians Benevolent Fund, learn about our mission, values, and how we operate`}
        imageUrl="/purplefootballteam.jpeg"
        imageAlt="About the charity mission"
        imagePosition="center"
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/donate" size="lg">
            Contribute Now
          </Button>
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
                src="/ourMission.jpeg"
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
                The Regentonians Benevolent Fund (RBF) exists to provide
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
                The Regentonians Benevolent Fund supports contributing Alumni of Sierra Leone
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
              Meet the dedicated individuals who make the Regentonians Benevolent Fund possible
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
                  className={`overflow-hidden animate-fade-in-up ${delayClass} transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="relative h-64 w-full bg-muted">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
