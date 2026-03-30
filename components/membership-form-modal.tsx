"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MembershipFormModalProps {
  size?: "sm" | "default" | "lg";
  animated?: boolean;
  label?: string;
  showIcon?: boolean;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function MembershipFormModal({
  size = "lg",
  animated = true,
  label = "Apply for Membership",
  showIcon = true,
  className,
  variant = "default",
}: MembershipFormModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size={size}
        variant={variant}
        onClick={() => setOpen(true)}
        className={cn(
          animated ? "transition-transform duration-200 hover:scale-105" : "",
          className,
        )}
      >
        {showIcon && <ClipboardList className="mr-2 h-5 w-5" />}
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-xl text-primary">
              Membership Application
            </DialogTitle>
          </DialogHeader>
          <div className="w-full overflow-y-auto" style={{ maxHeight: "75vh" }}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSe9Mvd_nXAd6tiQIzznKIoJANUyoZ19_6_anUKOeRzOTTvJ_Q/viewform?embedded=true"
              width="100%"
              height="1517"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              style={{ display: "block", border: "none" }}
              title="RBF Membership Application Form"
            >
              Loading…
            </iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
