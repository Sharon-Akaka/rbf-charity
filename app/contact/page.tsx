import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { DisclaimerLink } from "@/components/disclaimer-dialog";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="Contact Us"
        description="Get in touch with the Regentonians' Benevolent Fund"
      // imageUrl="/flagbearer2.jpg"
      // imageAlt="Contact us"
      // imagePosition="center"
      >
        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none">
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="/contribute" size="lg" className="w-full sm:w-auto sm:min-w-52">
              Contribute Now
            </Button>
          <Button href="/join" variant="outline" size="lg" className="w-full sm:w-auto sm:min-w-52">
            How to Join
          </Button>
          </div>
          <DisclaimerLink />
        </div>
      </Hero>

      {/* Contact Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              {/* Contact Information */}
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Get in Touch
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Have questions about joining, need support, or want to learn
                    more? Reach out to us and we'll get back to you as soon as
                    possible.
                  </p>
                </div>
                <Card>
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      <a
                        href="mailto:admin@theregentoniansbenevolentfund.org"
                        className="text-primary hover:underline break-all"
                      >
                        admin@theregentoniansbenevolentfund.org
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong className="font-semibold text-foreground">
                        Response Time:
                      </strong>{" "}
                      We aim to respond to all inquiries within 2-3 business
                      days. For urgent matters, please indicate this in your
                      message.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in-up animation-delay-200">
                <Card>
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as
                      possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
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
