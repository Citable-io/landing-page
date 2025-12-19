/**
 * WaitlistForm Component
 *
 * Simplified inline email-only waitlist form.
 * Uses Firebase to store signups.
 */

import { useState } from "react";
import { addToWaitingList, checkEmailExists } from "@/lib/firestore";

type FormState = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    // Validate email
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email");
      setState("error");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email");
      setState("error");
      return;
    }

    setState("submitting");
    setErrorMessage("");

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(trimmedEmail);

      if (emailExists) {
        setErrorMessage("You're already on the list!");
        setState("error");
        return;
      }

      // Add to waiting list (with minimal required fields)
      await addToWaitingList({
        firstname: "",
        lastname: "",
        email: trimmedEmail,
        affiliation: "",
      });

      setState("success");
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setState("idle");
      }, 5000);
    } catch (error) {
      console.error("Waitlist submission error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald/10 border border-emerald/30 text-emerald animate-fade-in">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="text-sm font-medium">You're on the list!</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      <div className="flex-1 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") {
              setState("idle");
              setErrorMessage("");
            }
          }}
          placeholder="Enter your email"
          className={`w-full h-12 px-4 rounded-lg bg-secondary border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
            state === "error"
              ? "border-destructive focus:ring-destructive/50"
              : "border-border"
          }`}
          disabled={state === "submitting"}
          aria-label="Email address"
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? "email-error" : undefined}
        />
        {state === "error" && errorMessage && (
          <p
            id="email-error"
            className="absolute -bottom-6 left-0 text-xs text-destructive"
          >
            {errorMessage}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="h-12 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
      >
        {state === "submitting" ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Joining...
          </span>
        ) : (
          "Join Private Beta"
        )}
      </button>
    </form>
  );
}
