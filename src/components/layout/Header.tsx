"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-line/80 bg-ink/80 backdrop-blur-lg" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative text-sm font-semibold uppercase tracking-[0.14em] transition-colors hover:text-bone ${
                      active ? "text-bone" : "text-bone/65"
                    } after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-ember after:transition-all after:duration-300 ${
                      active ? "after:w-full" : "after:w-0 hover:after:w-full"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href="/contact#enquiry" className="!px-5 !py-2.5">
              Free trial
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </Container>
    </header>

    {/* Rendered outside <header>: its backdrop-filter (when scrolled) would
        otherwise become the containing block for this fixed overlay. */}
    <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
