/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { ReactNode } from "react";

import SocialLinks from "./socialLinks";
import { LanguageSwitcher } from "./langSwitcher";
import { ModeToggle } from "./modeToggle";

import { useState } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur px-8 py-2">
        <div className="container flex h-16 items-center justify-between">
          <nav className="hidden md:flex md:items-center md:gap-6">
            <a
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </a>
            {/* <a
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </a>

            <a
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </a> */}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 py-3 border-t">
            <nav className="flex flex-col gap-2">
              <a
                href="/"
                className="p-2 hover:bg-accent hover:text-accent-foreground rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/dashboard"
                className="p-2 hover:bg-accent hover:text-accent-foreground rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="w-full flex-1">{children}</main>

      <footer className="border-t bg-background p-8">
        <div className="w-full max-w-screen-xl mx-auto ">
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}
