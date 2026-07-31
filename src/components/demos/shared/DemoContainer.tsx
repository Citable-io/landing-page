import { ReactNode } from "react";
import { useInViewAnimation } from "./useInViewAnimation";

interface DemoContainerProps {
  children: ReactNode;
  className?: string;
  onInView?: (isInView: boolean) => void;
}

export function DemoContainer({
  children,
  className = "",
  onInView,
}: DemoContainerProps) {
  const { ref, isInView } = useInViewAnimation({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Notify parent of visibility changes
  if (onInView) {
    onInView(isInView);
  }

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-xl bg-bg-secondary/50 border border-border overflow-hidden transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
