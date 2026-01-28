/**
 * WaitlistForm Component
 *
 * Clean inline waitlist form with solid CTA button.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ArrowRight } from "lucide-react";
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
      const emailExists = await checkEmailExists(trimmedEmail);

      if (emailExists) {
        setErrorMessage("You're already on the list!");
        setState("error");
        return;
      }

      await addToWaitingList({
        firstname: "",
        lastname: "",
        email: trimmedEmail,
        affiliation: "",
      });

      setState("success");
      setEmail("");

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
      <motion.div
        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl"
        style={{
          background: "var(--success-tint)",
          border: "1px solid var(--success)",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "var(--success)", color: "white" }}
        >
          <Check className="w-5 h-5" />
        </div>
        <div>
          <span className="font-semibold" style={{ color: "var(--success-text)" }}>
            You're on the list!
          </span>
          <span className="ml-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            We'll be in touch soon.
          </span>
        </div>
      </motion.div>
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
          className="w-full h-12 px-4 rounded-xl text-base transition-all focus:outline-none focus:ring-2"
          style={{
            background: "var(--bg-tertiary)",
            border: `1px solid ${state === "error" ? "var(--error)" : "var(--border-default)"}`,
            color: "var(--text-primary)",
          }}
          disabled={state === "submitting"}
          aria-label="Email address"
          aria-invalid={state === "error"}
        />
        <AnimatePresence>
          {state === "error" && errorMessage && (
            <motion.p
              className="mt-2 text-sm"
              style={{ color: "var(--error-text)" }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={state === "submitting"}
        className="h-12 px-6 rounded-xl font-semibold text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
        style={{
          background: "var(--indigo-9)",
          color: "white",
        }}
        whileHover={{
          background: "var(--indigo-10)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Joining...</span>
          </>
        ) : (
          <>
            <span>Join Beta</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}
