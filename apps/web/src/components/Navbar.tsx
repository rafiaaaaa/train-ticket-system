"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { logout } from "@/features/auth/api/logout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Schedule", href: "#schedule" },
  { label: "Promotions", href: "#promotions" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { signOut, user, loading } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${scrolled ? "top-0 bg-card/50" : "top-0 bg-transparent"} ${
        mobileMenuOpen || scrolled ? "backdrop-blur-lg" : ""
      } transition-all duration-300 ease-in-out`}
    >
      <div className="container relative top-0 mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src={"/assets/railway-logo.png"}
              alt="RailWay Logo"
              className="h-10 w-10 rounded-xl object-cover transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold text-primary">RailWay</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link href={`/auth`}>
                  <Button variant="default" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href={`/auth`}>
                  <Button variant="default" size="sm">
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 btn btn-default btn-sm text-primary"
                >
                  {user.first_name + " " + user.last_name}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-99999">
                    <Link href="/profile">
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </button>
                    </Link>

                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={signOut}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in backdrop-blur-lg">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 rounded-lg text-primary hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-4 px-4">
                <Button variant="outline" className="flex-1">
                  Log in
                </Button>
                <Button variant="default" className="flex-1">
                  Sign up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
