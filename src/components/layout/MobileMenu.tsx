"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { navLinks, site, whatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={`fixed inset-0 z-[60] flex flex-col bg-ink transition-[opacity,visibility] duration-300 lg:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="flex h-[var(--header-h)] items-center justify-end px-4 sm:px-6">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full border border-line"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-4">
        <ul className="space-y-1">
          {[{ href: "/", label: "Home" }, ...navLinks].map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`display block py-2 text-5xl ${pathname === link.href ? "text-ember" : "text-bone"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-4 border-t border-line px-6 py-6">
        <ButtonLink href="/contact#enquiry" onClick={onClose} className="w-full">
          Book a free trial
        </ButtonLink>
        <div className="flex justify-between text-sm text-muted">
          <a href={site.phones[0].href}>{site.phones[0].display}</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
