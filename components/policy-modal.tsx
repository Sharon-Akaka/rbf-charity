"use client";

import { useState } from "react";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const documents = [
  {
    title: "RBF Policy Document",
    description: "Full policy covering eligibility, disbursements, and fund management.",
    filename: "/policies/RBF_Policy.pdf",
  },
  {
    title: "Policy Amendment V2",
    description: "Amendments covering milestone birthdays, wellness, outreach, and mentoring.",
    filename: "/policies/Policy_AmendmentV2.pdf",
  },
  {
    title: "Key Facts for Donors",
    description: "Important information for contributors outside the Regentonians community.",
    filename: "/policies/KeyFacts_RBF.pdf",
  },
];

export function PolicyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-muted-foreground hover:text-primary text-sm transition-colors"
      >
        Policy Documents
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">
              Policy Documents
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            {documents.map((doc) => (
              <div
                key={doc.filename}
                className="flex items-center justify-between gap-4 rounded-lg border p-4"
              >
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-sm text-foreground">{doc.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                  </div>
                </div>
                <a
                  href={doc.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="sm" variant="outline" className="shrink-0">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}