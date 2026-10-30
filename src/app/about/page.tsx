import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "About",
  description: "The story, mission and facilities behind Real Warriors — a coached strength and conditioning gym.",
  alternates: { canonical: "/about" },
};

const facilities = [
  { name: "Strength zone", text: "Power racks, platforms, barbells and calibrated plates.", photo: photos.powerRacks },
  { name: "Machine floor", text: "Selectorised and plate-loaded machines for every muscle group.", photo: photos.machinesFloor },
  { name: "Cardio deck", text: "Treadmills, cross-trainers, bikes and rowers with natural light.", photo: photos.cardioFloor },
  { name: "Functional turf", text: "Turf lane, tyres, kettlebells and medicine balls.", photo: photos.functionalZone },
  { name: "Free weights", text: "Dumbbells from light to seriously heavy, with plenty of benches.", photo: photos.dumbbellStand },
  { name: "Cable stations", text: "Crossovers and pulleys for accessory and rehab work.", photo: photos.cableStations },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            More than a gym. <span className="text-ember">A training ground.</span>
          </>
        }
        intro="We built Real Warriors for people who want to train seriously — with the right equipment, the right coaching and the right people around them."
        image={photos.rackZone}
      />

      {/* TODO(client): replace with the real founding story and mission statement. */}
      <section className="py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Our mission" title="Make strength accessible to everyone" />
          <div className="space-y-6 text-lg leading-relaxed text-bone/80" data-reveal>
            <p>
              Real Warriors started with a simple belief: everyone deserves a gym where they are coached, not just
              charged a fee. Whether you are picking up a barbell for the first time or chasing a competition total, you
              should have a plan and someone in your corner.
            </p>
            <p>
              That&apos;s why our coaches are on the floor every session, why every member starts with an assessment, and
              why we track progress instead of just attendance.
            </p>
          </div>
        </Container>
      </section>

      <StatsSection />
      <AboutSection withLink={false} />

      <section className="bg-surface py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow="Facilities" title="Everything you need to train" />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <li key={f.name} data-reveal>
                <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                  <Image src={f.photo.src} alt={f.photo.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <h3 className="display mt-5 text-3xl">{f.name}</h3>
                <p className="mt-2 text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Visit us" title="Location & hours" />
            <address className="mt-8 text-lg not-italic text-bone/80" data-reveal>
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>
          </div>
          <dl className="divide-y divide-line self-end border-y border-line" data-reveal>
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between py-5 text-lg">
                <dt className="text-bone/75">{h.days}</dt>
                <dd className="font-semibold">{h.time}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
