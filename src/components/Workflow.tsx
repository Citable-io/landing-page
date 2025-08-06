import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Github,
  Gitlab,
  Database,
  FileText,
  Cloud,
  Zap,
  CheckCircle,
  ExternalLink,
  ArrowRight
} from "lucide-react";

const Workflow = () => {
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);

  const integrations = [
    {
      name: "Zotero",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <polygon style={{ fill: "#CC0000" }} points="13.863 2.73 13.027 1 2.137 1 2.137 3.8 2.137 3.921 8.822 3.921 1.289 13.233 2.137 15 13.863 15 13.863 12.142 13.863 12.021 6.448 12.021 13.863 2.73" />
        </svg>

      ),
      color: "bg-gradient-to-br from-[#f1f1f1] to-[#f1f1f1]",
      position: { top: "15%", left: "5%" }
    },
    {
      name: "GitHub",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-slate-700 to-slate-900",
      position: { top: "25%", left: "85%" }
    },
    {
      name: "Notion",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.047.933-.56.933-1.167V6.354c0-.606-.28-.933-.747-.887l-15.176.887c-.56.047-.747.327-.747.933zm14.337-.373c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-slate-800 to-black",
      position: { top: "10%", right: "8%" }
    },
    {
      name: "Mendeley",
      icon: (
        <svg fill="#000000" className='w-8 h-8' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.964 12.255h0.025c2.928 0 4.251 3.667 2 5.543-0.317 0.296-0.713 0.505-1.14 0.599-0.281 0.083-0.568 0.125-0.86 0.125h-0.025c-0.303 0-0.589-0.048-0.865-0.125-0.427-0.093-0.817-0.303-1.135-0.599-0.719-0.595-1.136-1.48-1.136-2.412 0.005-1.729 1.407-3.131 3.136-3.131zM2.697 24.855c1.683 0.213 3.177-1.011 3.339-2.735 0.047-0.563-0.052-1.131-0.287-1.647-2.353-5.171 9.277-5.291 7.308-0.405l-0.011 0.020c-0.932 1.485-0.427 3.417 1.115 4.308 0.573 0.333 1.199 0.468 1.812 0.443 0.615 0.025 1.245-0.109 1.813-0.443 1.547-0.891 2.052-2.823 1.12-4.308l-0.011-0.020c-1.969-4.885 9.667-4.765 7.301 0.405-0.233 0.516-0.333 1.084-0.28 1.647 0.161 1.724 1.651 2.948 3.337 2.735 0.724-0.095 1.396-0.443 1.891-0.98 0 0 0.787-0.651 0.772-2.307-0.011-1.349-0.772-2.099-0.772-2.099-0.629-0.636-1.515-0.953-2.411-0.855-2.156-0.052-2.48-1.74-1.871-4.927 0.224-0.568 0.324-1.172 0.303-1.776 0.073-1.912-1.063-3.667-2.833-4.385-0.052-0.021-0.104-0.037-0.156-0.057-0.057-0.027-0.12-0.048-0.183-0.063-2.005-0.677-4.213 0.124-5.323 1.932-1.088 1.192-1.579 1.916-2.699 1.916-1.061 0-1.609-0.724-2.692-1.916-1.141-1.869-3.459-2.661-5.505-1.875-0.052 0.020-0.104 0.041-0.156 0.063-1.776 0.719-2.907 2.473-2.833 4.385-0.021 0.604 0.077 1.208 0.301 1.776 0.609 3.187 0.287 4.875-1.869 4.921-1.057-0.115-1.849 0.323-2.645 1.125-0.797 0.796-0.729 2.932 0 3.864 0.531 0.677 1.255 1.147 2.124 1.256z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-[#fff] to-[#fff]",
      position: { top: "45%", left: "2%" }
    },
    {
      name: "Google Scholar",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5s-5.548 1.749-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      position: { bottom: "25%", left: "8%" }
    },
    {
      name: "arXiv",
      icon: (
        <svg fill="#000000" className='w-8 h-8' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.599 20.536l-2.525-6.619h1.885l1.848 4.776 1.839-4.776h1.281l-2.557 6.619zM21.729 12.803v-1.496h1.787v1.496zM21.729 20.541v-6.624h1.787v6.619zM12.443 20.541l2.864-4.401-2.733-4.531h2.172l1.817 3.005 1.968-3.005h1.496l-2.729 4.208 2.839 4.713h-2.167l-1.933-3.197-2.072 3.197h-1.521zM7.984 20.541v-6.624h1.781v1.249c0.459-0.932 1.167-1.401 2.115-1.401 0.109 0 0.224 0.011 0.328 0.032v1.593c-0.224-0.084-0.463-0.131-0.703-0.136-0.719 0-1.292 0.355-1.74 1.068v4.219zM3.948 19.823c-0.593 0.579-1.229 0.871-1.917 0.871-0.525 0.015-1.031-0.172-1.416-0.532-0.364-0.359-0.557-0.859-0.541-1.375-0.027-0.677 0.307-1.323 0.88-1.693 0.583-0.396 1.421-0.599 2.511-0.599h0.473v-0.604c0-0.683-0.391-1.027-1.172-1.027-0.744 0.016-1.473 0.219-2.115 0.589v-1.229c0.765-0.303 1.584-0.459 2.412-0.459 1.735 0 2.599 0.688 2.599 2.063v2.943c0 0.521 0.161 0.776 0.5 0.776 0.079 0 0.156-0.011 0.235-0.025l0.041 1c-0.323 0.104-0.661 0.161-1 0.172-0.74 0-1.203-0.287-1.416-0.865h-0.068zM3.948 18.864v-1.343h-0.427c-1.157 0-1.729 0.364-1.729 1.083-0.011 0.479 0.375 0.865 0.848 0.865 0.443 0.004 0.865-0.199 1.308-0.605z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-[#fff] to-[#fff]",
      position: { bottom: "35%", right: "5%" }
    },
  ];

  return (
    <section id="integrations" className="py-32 bg-muted/20 dark:bg-muted/20 relative overflow-hidden min-h-[800px]">

      {/* Floating Integration Icons - Desktop Only */}
      <div className="hidden md:block">
        {integrations.map((integration, index) => (
          <div
            key={integration.name}
            className={`absolute w-16 h-16 rounded-2xl flex items-center justify-center text-white cursor-pointer transition-transform duration-300 hover:scale-110 z-20 ${integration.color} shadow-2xl`}
            style={{
              ...integration.position,
              animation: `gentle-float ${3 + (index * 0.3)}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <div className="transform">
              {integration.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4 font-normal animate-fade-in-up">Our integrations</p>
          <h1 className="text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4 animate-fade-in-up bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>
            POWERFUL INTEGRATIONS<br />
            FOR MODERN RESEARCH
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up mb-8" style={{ animationDelay: '0.4s' }}>
            Citable isn't just another research tool - it's a hub that connects seamlessly with your entire research ecosystem.
          </p>

          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed">
            <p className="text-muted-foreground">
              From reference management in Zotero to version 
              control in GitHub, and collaborative writing in Notion, our{' '}
              <span className="font-semibold text-primary">
                AI-powered research assistant
              </span>{' '}
              works harmoniously with the tools researchers already love.
            </p>

            <p className="text-muted-foreground">
              Import citations directly from your preferred platforms, organize your research 
              notes and findings, and maintain perfect synchronization across your 
              research workflow. From paper discovery on arXiv to data analysis in Jupyter, 
              Citable adapts to your research stack, making{' '}
              <span className="font-semibold text-primary">
                citation management
              </span>{' '}
              a natural extension of your research process.
            </p>
          </div>

          {/* Mobile Integration Icons - Grid Layout */}
          <div className="md:hidden mt-8 w-full">
            <div className="flex justify-center items-center gap-4">
              {integrations.map((integration, index) => (
                <div
                  key={integration.name}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white cursor-pointer transition-all duration-300 hover:scale-105 ${integration.color} shadow-lg`}
                >
                  <div className="transform scale-75">
                    {integration.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gentle-float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(2deg);
            }
          }
          
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.2s ease-out;
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
    </section>
  );
}

export default Workflow;  