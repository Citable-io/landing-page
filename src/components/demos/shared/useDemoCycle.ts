import { useState, useEffect, useCallback } from "react";

interface UseDemoCycleOptions<T> {
  states: T[];
  durations: number[]; // Duration for each state in ms
  startDelay?: number;
  pauseOnHover?: boolean;
  isInView?: boolean;
}

export function useDemoCycle<T>({
  states,
  durations,
  startDelay = 500,
  pauseOnHover = false,
  isInView = true,
}: UseDemoCycleOptions<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentState = states[currentIndex];

  // Start after initial delay when in view
  useEffect(() => {
    if (!isInView || hasStarted) return;

    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [isInView, startDelay, hasStarted]);

  // Cycle through states
  useEffect(() => {
    if (!hasStarted || isPaused || !isInView) return;

    const duration = durations[currentIndex] || durations[0];
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % states.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, hasStarted, isPaused, isInView, states.length, durations]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);
  const reset = useCallback(() => {
    setCurrentIndex(0);
    setHasStarted(false);
  }, []);

  const goToState = useCallback(
    (index: number) => {
      if (index >= 0 && index < states.length) {
        setCurrentIndex(index);
      }
    },
    [states.length]
  );

  return {
    currentState,
    currentIndex,
    isPaused,
    hasStarted,
    pause,
    resume,
    reset,
    goToState,
    handlers: pauseOnHover
      ? { onMouseEnter: pause, onMouseLeave: resume }
      : {},
  };
}
