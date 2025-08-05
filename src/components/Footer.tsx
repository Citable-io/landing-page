import { Button } from "@/components/ui/button";
import CitableIcon from "@/components/CitableIcon";
import WaitingListForm from "@/components/WaitingListForm";
import ThemeToggle from "@/components/ThemeToggle";
import UserAgreementModal from "@/components/UserAgreementModal";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import { useState } from "react";

const Footer = () => {
  const [isUserAgreementOpen, setIsUserAgreementOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  return (
    <footer className="w-full border-t border-border/30 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <CitableIcon className="w-12 h-12" />
              <span className="text-xl font-semibold text-foreground mt-2">Citable</span>
            </div>
          </div>         

          {/* Theme Toggle and Join Waiting List Button */}
          <div className="flex items-center space-x-4">
            <WaitingListForm
              trigger={
                <Button variant="outline" size="sm" className="font-normal">
                  Join the waiting list
                </Button>
              }
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 py-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>Copyright © 2025 Citable. All rights reserved.</p>
          {/* <div className="flex space-x-8 mt-4 md:mt-0">
            <button 
              onClick={() => setIsUserAgreementOpen(true)}
              className="hover:text-foreground transition-colors"
            >
              User agreement
            </button>
            <button 
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
          </div> */}
        </div>
      </div>

      {/* Modals */}
      {/* <UserAgreementModal 
        isOpen={isUserAgreementOpen} 
        onClose={() => setIsUserAgreementOpen(false)} 
      />
      <PrivacyPolicyModal 
        isOpen={isPrivacyPolicyOpen} 
        onClose={() => setIsPrivacyPolicyOpen(false)} 
      /> */}
    </footer>
  );
};

export default Footer;