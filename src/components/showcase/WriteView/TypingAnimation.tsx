/**
 * TypingAnimation - Animates text character by character
 * Shows real-time typing effect with blinking cursor
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingAnimationProps {
  text: string;
  speed?: number; // milliseconds per character
  isActive: boolean;
  showCursor?: boolean;
}

export function TypingAnimation({
  text,
  speed = 30,
  isActive,
  showCursor = true,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isActive) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText("");
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, speed);
      }
    };

    timeoutId = setTimeout(typeNextCharacter, speed);

    return () => clearTimeout(timeoutId);
  }, [isActive, text, speed]);

  return (
    <span>
      {displayedText}
      {showCursor && isActive && displayedText.length < text.length && (
        <motion.span
          className="inline-block w-1 h-4 bg-foreground ml-0.5"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </span>
  );
}
