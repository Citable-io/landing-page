import CitableIcon from "@/components/CitableIcon";

const TrustedBySection = () => {
  return (
    <section className="py-20 border-t border-border/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          
          
          {/* Title */}
          <h2 className="text-base text-muted-foreground mb-12 font-normal">
            Trusted by people from
          </h2>
          
          {/* Company Grid - exact layout from image */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-5xl mx-auto">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-normal">
                Lorem Ipsum
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;