/**
 * Footer Component
 *
 * Clean footer with gradient accent and organized links.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Twitter, Github, Mail } from "lucide-react";
import CitableIcon from "@/components/CitableIcon";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import UserAgreementModal from "@/components/UserAgreementModal";

const Footer = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [agreementOpen, setAgreementOpen] = useState(false);

  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--indigo-7), var(--purple-7), var(--teal-7), transparent)",
        }}
      />

      <div
        className="py-16 md:py-20"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <CitableIcon className="w-28 mb-4" />
              <p
                className="text-sm max-w-sm mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                The unified research platform for academics. Organize your library,
                write with confidence, and discover connections.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                <motion.a
                  href="https://twitter.com/citableio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    background: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                  }}
                  whileHover={{
                    background: "var(--indigo-a3)",
                    color: "var(--indigo-11)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://github.com/citable"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    background: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                  }}
                  whileHover={{
                    background: "var(--purple-a3)",
                    color: "var(--purple-11)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="mailto:hello@citable.io"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                  style={{
                    background: "var(--bg-tertiary)",
                    color: "var(--text-secondary)",
                  }}
                  whileHover={{
                    background: "var(--teal-a3)",
                    color: "var(--teal-11)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h4
                className="font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#demo"
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#waitlist"
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Join Beta
                  </a>
                </li>
                <li>
                  <span
                    className="text-sm inline-flex items-center gap-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Pricing
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: "var(--indigo-a3)",
                        color: "var(--indigo-11)",
                      }}
                    >
                      Soon
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h4
                className="font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setPrivacyOpen(true)}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setAgreementOpen(true)}
                    className="text-sm transition-colors hover:underline"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              &copy; {new Date().getFullYear()} Citable. All rights reserved.
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Made with care for researchers everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PrivacyPolicyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <UserAgreementModal open={agreementOpen} onOpenChange={setAgreementOpen} />
    </footer>
  );
};

export default Footer;
