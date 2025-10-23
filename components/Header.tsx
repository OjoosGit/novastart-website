"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./ui/button";

type NavigationItem = {
  name: string;
  href?: string;
  children?: Array<{ name: string; href: string }>;
};

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Wat we bieden", href: "/wat-we-bieden" },
  { 
    name: "Over ons", 
    children: [
      { name: "Waar we voor staan", href: "/waar-we-voor-staan" },
      { name: "Wie we zijn", href: "/wie-we-zijn" },
      { name: "Kwaliteit", href: "/kwaliteit" },
      { name: "Samenwerkingen", href: "/samenwerkingen" },
    ]
  },
  { name: "Voor ouders", href: "/voor-ouders" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-5 md:py-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl md:text-4xl font-bold text-primary focus-visible-ring rounded-lg py-1 px-2"
          >
            Novastart
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      className="px-4 py-2.5 text-base font-medium text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-all flex items-center gap-1 focus-visible-ring"
                    >
                      {item.name}
                      <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown menu */}
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-5 py-3 text-base text-neutral-700 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    className="px-4 py-2.5 text-base font-medium text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-all focus-visible-ring"
                  >
                    {item.name}
                  </Link>
                ) : null}
              </div>
            ))}
            
            {/* CTA Button */}
            <Link href="/kennismaken-en-aanmelden">
              <Button size="default" className="ml-2">
                Kennismaken & aanmelden
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2.5 rounded-xl text-neutral-700 hover:bg-primary/5 focus-visible-ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu openen"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="w-full text-left px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors flex items-center justify-between"
                      >
                        {item.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2.5 text-base text-neutral-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : null}
                </div>
              ))}
              
              {/* Mobile CTA Button */}
              <Link href="/kennismaken-en-aanmelden" onClick={() => setMobileMenuOpen(false)}>
                <Button size="default" className="w-full mt-2">
                  Kennismaken & aanmelden
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

