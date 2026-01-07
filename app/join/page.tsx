import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Users, Handshake, ArrowRight, CheckCircle } from "lucide-react";

export default function JoinPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="How to Join"
        description="Become part of a community dedicated to supporting one another"
        imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop"
        imageAlt="Join our community"
      />

      {/* Who Can Join Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 lg:h-96 animate-fade-in-up">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
                alt="Community membership and joining"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <Card className="animate-fade-in-up animation-delay-200">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Who Can Join</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg leading-8 text-muted-foreground">
                  The Regentonians Benevolent Fund is open to all alumni of Sierra Leone Grammar School. 
                  Whether you graduated recently or many years ago, you are welcome to join our community 
                  of caring individuals committed to supporting one another.
                </p>
                <p className="text-lg leading-8 text-muted-foreground">
                  Membership is open to former students who share our values of care, unity, and 
                  brotherhood. We believe that the bonds formed at Sierra Leone Grammar School create 
                  a lifelong connection that extends beyond graduation.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-muted-foreground">
                      Open to all Sierra Leone Grammar School alumni
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-muted-foreground">
                      No membership fees required
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-muted-foreground">
                      Voluntary contributions support the fund
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Get Involved Section */}
      <section className="bg-muted py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">How to Get Involved</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-8 text-muted-foreground">
                  Joining the Regentonians Benevolent Fund is simple. We welcome all alumni who 
                  wish to be part of our supportive community.
                </p>
                
                <div className="space-y-4">
                  <div className="rounded-lg border-l-4 border-primary bg-background p-4">
                    <h3 className="font-semibold text-foreground">Step 1: Contact Us</h3>
                    <p className="mt-2 text-muted-foreground">
                      Reach out through our contact form or email to express your interest in joining. 
                      We'll be happy to answer any questions you may have.
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-primary bg-background p-4">
                    <h3 className="font-semibold text-foreground">Step 2: Share Your Information</h3>
                    <p className="mt-2 text-muted-foreground">
                      Provide your details including your graduation year and contact information. 
                      This helps us connect you with the community and keep you informed.
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-primary bg-background p-4">
                    <h3 className="font-semibold text-foreground">Step 3: Welcome to the Community</h3>
                    <p className="mt-2 text-muted-foreground">
                      Once you're registered, you'll receive information about upcoming events, 
                      ways to contribute, and how to access support when needed.
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Membership in the RBF is about more than just joining an organization—it's about 
                  becoming part of a community that cares for one another. Your participation, whether 
                  through contributions, volunteering, or simply staying connected, makes a difference.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to Join?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get in touch with us today to become part of the Regentonians Benevolent Fund community.
            </p>
            <div className="mt-10">
              <Button href="/contact" size="lg" className="transition-transform duration-200 hover:scale-105">
                Contact Us to Join
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

