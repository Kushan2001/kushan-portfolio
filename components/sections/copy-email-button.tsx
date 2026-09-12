"use client";

import { useEffect, useId, useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CopyEmailButtonProps {
  email: string;
}

type CopyStatus = "idle" | "copying" | "copied" | "error";

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const statusId = useId();

  useEffect(() => {
    if (status !== "copied" && status !== "error") {
      return;
    }

    const timeoutId = window.setTimeout(() => setStatus("idle"), 3000);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  async function copyEmail() {
    setStatus("copying");

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard access is unavailable.");
      }

      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "copied"
      ? "Email copied to clipboard."
      : status === "error"
        ? "Could not copy the email."
        : "";

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={status === "copying"}
        aria-busy={status === "copying"}
        aria-describedby={statusId}
        onClick={copyEmail}
        className="border-surface-inverse-muted/50 bg-transparent text-surface-inverse-foreground hover:border-surface-inverse-foreground/40 hover:bg-surface-inverse-foreground/10 hover:text-surface-inverse-foreground"
      >
        {status === "copied" ? (
          <Check aria-hidden="true" />
        ) : (
          <Copy aria-hidden="true" />
        )}
        {status === "copying"
          ? "Copying…"
          : status === "copied"
            ? "Email Copied"
            : "Copy Email"}
      </Button>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className="mt-2 min-h-6 text-sm text-surface-inverse-muted"
      >
        {message}
      </p>
    </div>
  );
}
