import Link from "next/link";
import { navLinks, site, whatsappLink } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{site.description}</p>
          </div>

          <div>
            <h2 className="eyebrow">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-bone/75 transition-colors hover:text-ember">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">Visit</h2>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-bone/75">
              <p>
                <a href={site.map.url} target="_blank" rel="noopener noreferrer" className="hover:text-ember">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </a>
              </p>
              <p>
                {site.phones.map((p, i) => (
                  <span key={p.href}>
                    {i > 0 && " - "}
                    <a href={p.href} className="hover:text-ember">
                      {p.display}
                    </a>
                  </span>
                ))}
              </p>
              <p>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-ember">
                  Chat on WhatsApp
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="eyebrow">Hours</h2>
            <dl className="mt-5 space-y-2.5 text-sm">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-line/60 pb-2.5">
                  <dt className="text-bone/75">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {Object.entries(site.socials).map(([name, href]) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-ember">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
