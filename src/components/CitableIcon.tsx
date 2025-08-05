const CitableIcon = ({ className = "w-20 h-20" }: { className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <img 
        src="/assets/citable-logo.png" 
        alt="Citable Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CitableIcon;