import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Contact", "FAQs", "Accessibility"],
  Legal: [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Refund Policy",
  ],
};

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <img
                src={"/assets/railway-logo.png"}
                alt="RailWay Logo"
                className="h-10 w-10 rounded-xl object-cover"
              />
              <span className="text-xl font-bold">RailWay</span>
            </a>
            <p className="text-background/70 mb-6 max-w-sm">
              Making train travel accessible, affordable, and enjoyable for
              everyone. Your journey starts with us.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Mail].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2026 RailWay. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-background/60 hover:text-background transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-background/60 hover:text-background transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-background/60 hover:text-background transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
