import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  return (
    <Button
      href="/join/apply"
      size={size}
      variant={variant}
      className={cn(
        animated ? "transition-transform duration-200 hover:scale-105" : "",
        className,
      )}
    >
      {showIcon && <ClipboardList className="mr-2 h-5 w-5" />}
      {label}
    </Button>
  );
}
