/**
 * FeaturePills Component
 *
 * Three feature summary cards showing key product capabilities:
 * - Organize: Bibliography management
 * - Write: LaTeX editor
 * - Connect: Citation integration
 */

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    title: "Organize",
    description: "Your library, your way",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    title: "Write",
    description: "LaTeX editor built-in",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
    title: "Connect",
    description: "Cite as you write",
  },
];

export function FeaturePills() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className="group flex flex-col items-center p-6 rounded-lg bg-card/50 border border-border/30 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover-glow animate-fade-in-up"
          style={{ animationDelay: `${0.1 + index * 0.1}s` }}
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/20 transition-colors">
            {feature.icon}
          </div>
          <h3 className="text-base font-medium text-foreground mb-1">
            {feature.title}
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
