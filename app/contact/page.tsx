import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { ContactForm } from "@/components/contact-form";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title="Contact Us"
        description="Get in touch with the Regentonians Benevolent Fund"
        imageUrl="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
        imageAlt="Contact us"
      />

      {/* Contact Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 animate-fade-in-up">
                <Image
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=600&fit=crop"
                  alt="Contact and communication"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="animate-fade-in-up animation-delay-200">
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  We're Here to Help
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Have questions about joining, need support, or want to learn more? 
                  Reach out to us and we'll get back to you as soon as possible.
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <Card className="animate-fade-in-up animation-delay-400">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="animate-fade-in-up animation-delay-600">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="mt-1 text-muted-foreground">
                        <a 
                          href="mailto:contact@rbf-charity.org" 
                          className="text-primary hover:underline"
                        >
                          contact@rbf-charity.org
                        </a>
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        (Email address placeholder - to be updated)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Other Ways to Reach Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We're working on setting up additional contact methods including social 
                      media links. For now, please use the contact form or email address above.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      <strong className="font-semibold text-foreground">Response Time:</strong> We 
                      aim to respond to all inquiries within 2-3 business days. For urgent matters, 
                      please indicate this in your message.
                    </p>
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

