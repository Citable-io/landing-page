/**
 * Footer Component
 *
 * Minimal footer with copyright only.
 */

const Footer = () => {
  return (
    <footer className="w-full py-8 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Citable. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
