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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="About Us"
        description="Learn about our mission, values, and how we operate"
        imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
        imageAlt="About the charity mission"
      />

      {/* Mission Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-96 animate-fade-in-up">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
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
                The Regentonians Benevolent Fund supports alumni of Sierra Leone
                Grammar School. Our members are former students who share a
                common bond through their educational experience and continue to
                support one another throughout their lives.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We provide assistance to members and their families during times
                of need, including bereavement support, health and recovery
                assistance, and milestone celebrations. Our support extends to
                the broader Regentonian community, recognizing that we are all
                connected through our shared history and values.
              </p>
            </div>
            <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-96 animate-fade-in-up animation-delay-200">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
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
    </div>
  );
}
