import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { photos } from "@/data/photos";
import { site, whatsappLink } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Real Warriors Unisex Gym, Sakthi Nagar, Veeranam Main Rd, Salem. Call 79049 72611 / 80150 03663. Open 5–9 AM and 5–9 PM.",
  alternates: { canonical: "/contact" },
};

const mapSrc = `https://www.google.com/maps?q=${site.map.lat},${site.map.lng}&z=17&output=embed`;

export default function ContactPage() {
  const details: { icon: LucideIcon; label: string; links: { value: string; href: string }[]; external?: boolean }[] = [
    { icon: Phone, label: "Call", links: site.phones.map((p) => ({ value: p.display, href: p.href })) },
    { icon: MessageCircle, label: "WhatsApp", links: [{ value: "Chat with us", href: whatsappLink() }], external: true },
    {
      icon: MapPin,
      label: "Address · Get directions",
      links: [{ value: `${site.address.line1}, ${site.address.line2}`, href: site.map.url }],
      external: true,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Book your <span className="text-ember">free trial</span>
          </>
        }
        intro="Tell us a little about your goals and a coach will call you to set up your first session."
        image={photos.hexDumbbells}
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="space-y-10">
            <ul className="space-y-6">
              {details.map(({ icon: Icon, label, links, external }) => (
                <li key={label} className="flex gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-ember">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-muted">{label}</p>
                    <p className="text-lg font-semibold">
                      {links.map((link, i) => (
                        <span key={link.href}>
                          {i > 0 && <span className="mx-2 text-ember">-</span>}
                          <a
                            href={link.href}
                            className="hover:text-ember"
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {link.value}
                          </a>
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-card border border-line bg-surface p-6">
              <p className="flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-muted">
                <Clock className="size-4 text-ember" aria-hidden /> Opening hours
              </p>
              <dl className="mt-4 space-y-2">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between">
                    <dt className="text-bone/75">{h.days}</dt>
                    <dd className="font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div id="enquiry" className="scroll-mt-28 rounded-[1.5rem] border border-line bg-surface p-6 sm:p-10">
            <h2 className="display text-4xl sm:text-5xl">Send an enquiry</h2>
            <p className="mt-3 text-muted">We usually reply within one working day.</p>
            <div className="mt-8">
              <Suspense>
                <EnquiryForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Map" className="relative border-t border-line">
        <iframe
          title={`Map showing ${site.fullName}`}
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[420px] w-full invert-[0.9] hue-rotate-180"
        />
        <a
          href={site.map.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ember px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink shadow-[var(--shadow-card)] transition-colors hover:bg-bone"
        >
          <MapPin className="size-4" aria-hidden />
          Get directions
        </a>
      </section>
    </>
  );
}
