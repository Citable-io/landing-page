import { ArrowRight, Check, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import WaitingListForm from "@/components/WaitingListForm";

const IntegrationsSection = () => {
  const integrations = [
    {
      name: "Zotero",
      description: "Sync your entire library",
      action: "Connect",
      color: "from-red-500 to-red-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
          <polygon style={{ fill: "#CC2936" }} points="13.863 2.73 13.027 1 2.137 1 2.137 3.8 2.137 3.921 8.822 3.921 1.289 13.233 2.137 15 13.863 15 13.863 12.142 13.863 12.021 6.448 12.021 13.863 2.73" />
        </svg>
      ),
    },
    {
      name: "Mendeley",
      description: "Import references",
      action: "Import",
      color: "from-red-400 to-orange-500",
      icon: (
        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.964 12.255h0.025c2.928 0 4.251 3.667 2 5.543-0.317 0.296-0.713 0.505-1.14 0.599-0.281 0.083-0.568 0.125-0.86 0.125h-0.025c-0.303 0-0.589-0.048-0.865-0.125-0.427-0.093-0.817-0.303-1.135-0.599-0.719-0.595-1.136-1.48-1.136-2.412 0.005-1.729 1.407-3.131 3.136-3.131zM2.697 24.855c1.683 0.213 3.177-1.011 3.339-2.735 0.047-0.563-0.052-1.131-0.287-1.647-2.353-5.171 9.277-5.291 7.308-0.405l-0.011 0.020c-0.932 1.485-0.427 3.417 1.115 4.308 0.573 0.333 1.199 0.468 1.812 0.443 0.615 0.025 1.245-0.109 1.813-0.443 1.547-0.891 2.052-2.823 1.12-4.308l-0.011-0.020c-1.969-4.885 9.667-4.765 7.301 0.405-0.233 0.516-0.333 1.084-0.28 1.647 0.161 1.724 1.651 2.948 3.337 2.735 0.724-0.095 1.396-0.443 1.891-0.98 0 0 0.787-0.651 0.772-2.307-0.011-1.349-0.772-2.099-0.772-2.099-0.629-0.636-1.515-0.953-2.411-0.855-2.156-0.052-2.48-1.74-1.871-4.927 0.224-0.568 0.324-1.172 0.303-1.776 0.073-1.912-1.063-3.667-2.833-4.385-0.052-0.021-0.104-0.037-0.156-0.057-0.057-0.027-0.12-0.048-0.183-0.063-2.005-0.677-4.213 0.124-5.323 1.932-1.088 1.192-1.579 1.916-2.699 1.916-1.061 0-1.609-0.724-2.692-1.916-1.141-1.869-3.459-2.661-5.505-1.875-0.052 0.020-0.104 0.041-0.156 0.063-1.776 0.719-2.907 2.473-2.833 4.385-0.021 0.604 0.077 1.208 0.301 1.776 0.609 3.187 0.287 4.875-1.869 4.921-1.057-0.115-1.849 0.323-2.645 1.125-0.797 0.796-0.729 2.932 0 3.864 0.531 0.677 1.255 1.147 2.124 1.256z" />
        </svg>
      ),
    },
    {
      name: "Overleaf",
      description: "Import your projects",
      action: "Migrate",
      color: "from-green-500 to-emerald-600",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.538 2c-1.747 0-3.33 1.025-4.044 2.622C8.78 5.475 9.317 6.524 10.197 7.28L7.04 10.437l-.001 1.414 3.889-3.889c.548.22 1.15.341 1.76.341 2.07 0 3.834-1.321 4.502-3.16.054.282.084.573.084.873 0 2.068-1.29 3.836-3.108 4.514l.001.002v8.468h1.414V11.01c2.29-.85 3.923-3.03 3.923-5.604C19.504 2.417 16.872 0 13.538 2z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      description: "Version control",
      action: "Connect",
      color: "from-gray-700 to-gray-900",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "arXiv",
      description: "Import papers",
      action: "Search",
      color: "from-red-600 to-red-700",
      icon: (
        <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.599 20.536l-2.525-6.619h1.885l1.848 4.776 1.839-4.776h1.281l-2.557 6.619zM21.729 12.803v-1.496h1.787v1.496zM21.729 20.541v-6.624h1.787v6.619zM12.443 20.541l2.864-4.401-2.733-4.531h2.172l1.817 3.005 1.968-3.005h1.496l-2.729 4.208 2.839 4.713h-2.167l-1.933-3.197-2.072 3.197h-1.521zM7.984 20.541v-6.624h1.781v1.249c0.459-0.932 1.167-1.401 2.115-1.401 0.109 0 0.224 0.011 0.328 0.032v1.593c-0.224-0.084-0.463-0.131-0.703-0.136-0.719 0-1.292 0.355-1.74 1.068v4.219zM3.948 19.823c-0.593 0.579-1.229 0.871-1.917 0.871-0.525 0.015-1.031-0.172-1.416-0.532-0.364-0.359-0.557-0.859-0.541-1.375-0.027-0.677 0.307-1.323 0.88-1.693 0.583-0.396 1.421-0.599 2.511-0.599h0.473v-0.604c0-0.683-0.391-1.027-1.172-1.027-0.744 0.016-1.473 0.219-2.115 0.589v-1.229c0.765-0.303 1.584-0.459 2.412-0.459 1.735 0 2.599 0.688 2.599 2.063v2.943c0 0.521 0.161 0.776 0.5 0.776 0.079 0 0.156-0.011 0.235-0.025l0.041 1c-0.323 0.104-0.661 0.161-1 0.172-0.74 0-1.203-0.287-1.416-0.865h-0.068zM3.948 18.864v-1.343h-0.427c-1.157 0-1.729 0.364-1.729 1.083-0.011 0.479 0.375 0.865 0.848 0.865 0.443 0.004 0.865-0.199 1.308-0.605z" />
        </svg>
      ),
    },
    {
      name: "Google Scholar",
      description: "Discovery & import",
      action: "Search",
      color: "from-blue-500 to-blue-600",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5s-5.548 1.749-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      ),
    },
  ];

  const migrationSteps = [
    { step: 1, title: "Export from Overleaf", desc: "Download your .zip project" },
    { step: 2, title: "Import to Citable", desc: "Drag & drop your project" },
    { step: 3, title: "Connect bibliography", desc: "Link your Zotero library" },
    { step: 4, title: "Start writing", desc: "Enjoy the unified experience" },
  ];

  return (
    <section id="integrations" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-secondary/50" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Works With Your Favorite Tools
          </h2>
          <p className="text-lg text-text-secondary">
            Migrate from your existing workflow in minutes. Citable connects to your entire research ecosystem.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-16">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className="group relative p-6 rounded-xl bg-bg-primary border border-border hover:border-primary/30 transition-all duration-300 text-center card-hover"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                {integration.icon}
              </div>
              <h4 className="font-medium text-foreground mb-1">{integration.name}</h4>
              <p className="text-xs text-text-muted">{integration.description}</p>
            </div>
          ))}
        </div>

        {/* Migration CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-primary/20 bg-gradient-card p-8 lg:p-12 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Upload className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Easy Migration</span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Import Your Overleaf Projects
                </h3>

                <p className="text-text-secondary mb-6">
                  Switch to Citable without losing any work. Import your existing Overleaf projects with one click and keep your bibliography synced with Zotero.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Full project structure preserved",
                    "BibTeX files automatically detected",
                    "Custom packages supported",
                    "Collaborator invites ready",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <WaitingListForm
                  trigger={
                    <Button className="rounded-full px-6">
                      Get Early Access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  }
                />
              </div>

              {/* Right: Migration Steps Visual */}
              <div className="relative">
                <div className="space-y-4">
                  {migrationSteps.map((step, index) => (
                    <div
                      key={step.step}
                      className="flex items-center gap-4 p-4 rounded-xl bg-bg-secondary/80 border border-border"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{step.title}</div>
                        <div className="text-sm text-text-muted">{step.desc}</div>
                      </div>
                      {index < migrationSteps.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-text-dim hidden lg:block" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Connecting line */}
                <div className="absolute left-7 top-14 bottom-14 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
