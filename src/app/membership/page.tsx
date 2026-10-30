import type { Metadata } from "next";
import { photos } from "@/data/photos";
import { membershipTerms } from "@/data/memberships";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { MembershipSection } from "@/components/sections/MembershipSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Membership",
  description: "Real Warriors Unisex Gym, Salem — ₹700 per month, ₹1,500 for 3 months, ₹9,500 per year, personal training ₹10,000.",
  alternates: { canonical: "/membership" },
};

const faqs = [
  { q: "Is the free trial really free?", a: "Yes. One full session with a coach plus a fitness assessment, with no obligation to join." },
  { q: "Is there a joining fee?", a: "Yes — a one-time advance of ₹500 is paid when you join, along with your plan fee." },
  { q: "What are the timings?", a: "We're open in two batches: morning 5 AM – 9 AM and evening 5 PM – 9 PM." },
  { q: "Is the gym for men and women?", a: "Yes. Real Warriors is a unisex gym — everyone is welcome." },
  { q: "Do I need experience?", a: "Not at all. Every new member gets an orientation and a plan matched to their level." },
  { q: "How do I pay?", a: "Visit the gym or send an enquiry and we'll guide you through the available payment options." },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title={
          <>
            Invest in <span className="text-ember">yourself</span>
          </>
        }
        intro="Straightforward plans with everything you need to make progress. Start with a free trial — join when you're ready."
        image={photos.dumbbellRack}
      />
      <MembershipSection showHeading={false} />

      <section className="pb-8">
        <Container>
          <ul className="mx-auto max-w-3xl space-y-2 text-center text-sm text-muted">
            {membershipTerms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24">
        <Container className="max-w-4xl">
          <h2 className="display text-center text-5xl sm:text-6xl" data-reveal>
            Questions
          </h2>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                  {f.q}
                  <span className="text-2xl text-ember transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-4 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
