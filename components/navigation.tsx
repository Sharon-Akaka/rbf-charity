"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MembershipFormModal } from "@/components/membership-form-modal";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/support", label: "Support We Provide" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "How to Join" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex py-2 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/logo.png"
              alt="RBF Logo"
              width={40}
              height={40}
              className="w-14 h-14 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="mx-3 h-6 w-px bg-border" />

            {/* Primary CTA */}
            <Link
              href="/contribute"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 h-10 inline-flex items-center"
            >
              Contribute
            </Link>

            {/* Secondary CTA */}
            <MembershipFormModal
              size="default"
              animated={false}
              showIcon={false}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2 text-base font-medium transition-colors",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="my-2 border-t border-border" />

              {/* Buttons side by side */}
              <div className="flex gap-2 px-1">
                <Link
                  href="/contribute"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Contribute
                </Link>
                <MembershipFormModal
                  size="sm"
                  animated={false}
                  showIcon={false}
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/10"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
