const CitableIcon = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 32 32" className="w-full h-full">
        {/* Outer cube frame */}
        <path
          d="M6 6 L26 6 L26 26 L6 26 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />
        {/* Inner cube */}
        <path
          d="M10 10 L22 10 L22 22 L10 22 Z"
          fill="currentColor"
          className="text-primary"
        />
        {/* Connecting lines */}
        <path
          d="M6 6 L10 10 M26 6 L22 10 M26 26 L22 22 M6 26 L10 22"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
      </svg>
    </div>
  );
};

export default CitableIcon;