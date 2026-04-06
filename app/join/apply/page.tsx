import { Hero } from "@/components/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MembershipForm } from "@/components/membership-form";
import { ClipboardList, CheckCircle, Users, Heart, Shield } from "lucide-react";
import { DisclaimerLink } from "@/components/disclaimer-dialog";
import { PolicyModal } from "@/components/policy-modal";

export default function MembershipApplicationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero
        title="Membership Application"
        description="Join a community dedicated to supporting one another. Complete the form below to apply."
      >
        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="/contribute" size="lg" className="w-full sm:w-auto sm:min-w-52">
              Contribute Now
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-52">
              Contact Us
            </Button>
            <PolicyModal asButton className="w-full sm:w-auto sm:min-w-52" />
          </div>
          <DisclaimerLink />
        </div>
      </Hero>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">

              {/* Form */}
              <div className="animate-fade-in-up">
                <Card>
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <ClipboardList className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold">
                      The Regentonians&apos; Benevolent Fund (RBF)
                    </h2>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      This form allows you to apply for membership in the
                      Regentonians&apos; Benevolent Fund (RBF). The RBF provides
                      support to Contributing Regentonians&apos; in times of need.
                      Please read the policy document carefully before proceeding.
                      Membership in the benevolent fund is open to Alumni who
                      makes the minimum contribution.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <MembershipForm />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6 animate-fade-in-up animation-delay-200">
                <Card>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Who Can Join</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p>Open to all Sierra Leone Grammar School alumni</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p>Minimum contribution of £60 per annum</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p>Voluntary contributions also welcome</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Member Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p>Bereavement support for you and your family</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p>Get Well Soon support during illness</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p>Milestone birthday recognition</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p>Access to the RBF mentoring scheme</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Your data will only be used for membership administration
                        in line with our privacy notice.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
