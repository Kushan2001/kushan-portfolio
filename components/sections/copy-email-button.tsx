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

    const timeoutId = window.setTimeout(() => setStatus("idle"), 1800);

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
    <div className="w-full sm:w-auto">
      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={status === "copying"}
        aria-busy={status === "copying"}
        aria-describedby={statusId}
        onClick={copyEmail}
        className="w-full transition-[background-color,border-color,box-shadow,transform] hover:shadow-card motion-safe:hover:-translate-y-0.5 sm:w-auto"
      >
        {status === "copied" ? (
          <Check aria-hidden="true" />
        ) : (
          <Copy aria-hidden="true" />
        )}
        {status === "copying"
          ? "Copying…"
          : status === "copied"
            ? "Copied"
            : "Copy Email"}
      </Button>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className="mt-2 min-h-6 text-sm text-muted-foreground"
      >
        {message}
      </p>
    </div>
  );
}
