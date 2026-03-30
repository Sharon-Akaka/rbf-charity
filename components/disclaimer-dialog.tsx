"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const disclaimerContent = (
  <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
    <p>
      This disclaimer is intended to ensure that any individual, group, or organisation outside of
      the Regentonians&apos; community that wishes to make a contribution to the Regentonians
      Benevolent Fund (RBF) does so with a full understanding of the Fund&apos;s nature, purpose,
      and legal status.
    </p>
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-foreground">1. Non-Charitable Status</h3>
        <p className="mt-1">
          The Regentonians Benevolent Fund (RBF) is not a registered charity or charitable trust. It
          is an internal support initiative under the Sierra Leone Grammar School Old Boys&apos;
          Association Foundation Trust (UK) for the benefit of its members and related persons.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">2. Internal Benevolence Structure</h3>
        <p className="mt-1">
          The RBF exists solely to provide set and discretionary support to eligible individuals
          connected to the Regentonians&apos; family, based on clearly defined eligibility criteria
          and the discretion of the Benevolence Committee.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">3. No Public Solicitation</h3>
        <p className="mt-1">
          The RBF does not actively solicit donations from the general public. Contributions from
          outside the Regentonians community are accepted only on the basis of informed understanding
          and voluntary goodwill.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">4. No Tax Relief or Charitable Exemptions</h3>
        <p className="mt-1">
          Contributions to the RBF do not qualify for tax relief or charitable donation exemptions
          under UK law or any other applicable jurisdiction.
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">5. Use of Funds</h3>
        <p className="mt-1">
          All contributions are managed privately and used at the discretion of the Benevolence
          Committee in line with internal policy. The RBF does not publish public financial reports
          or submit filings required of registered charities. However, a simple annual income and
          expenditure statement will be provided at the end of March.
        </p>
      </div>
    </div>
  </div>
);

function DisclaimerModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Info className="h-5 w-5 shrink-0" />
            Contribution Disclaimer
          </DialogTitle>
        </DialogHeader>
        {disclaimerContent}
      </DialogContent>
    </Dialog>
  );
}

/** Small inline i icon placed next to "Contribute" buttons */
export function DisclaimerIcon({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-label="Contribution disclaimer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={`inline-flex items-center justify-center rounded-full w-5 h-5 text-primary transition-colors ${className}`}
      >
        <Info className="h-5 w-5" />
      </button>
      <DisclaimerModal open={open} onOpenChange={setOpen} />
    </>
  );
}

export function DisclaimerLink({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 text-sm text-primary/80 transition-colors hover:text-primary ${className}`}
      >
        <Info className="h-4 w-4 shrink-0" />
        <span>Contribution disclaimer</span>
      </button>
      <DisclaimerModal open={open} onOpenChange={setOpen} />
    </>
  );
}

/** Floating button fixed at the bottom-right of every page */
export function DisclaimerFloatingButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-label="View contribution disclaimer"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-110"
      >
        <Info className="h-5 w-5" />
      </button>
      <DisclaimerModal open={open} onOpenChange={setOpen} />
    </>
  );
}
