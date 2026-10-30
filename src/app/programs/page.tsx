import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { photos } from "@/data/photos";
import { programs } from "@/data/programs";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Programs",
  description: "Strength training, personal training, weight loss, cardio and functional training programs at Real Warriors.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title={
          <>
            Train with <span className="text-ember">purpose</span>
          </>
        }
        intro="Every program combines expert coaching, structured progression and regular check-ins. Not sure where to start? Your free trial includes an assessment to find the right fit."
        image={photos.barbellKettlebell}
      />

      <section className="py-24 lg:py-32">
        <Container className="space-y-24 lg:space-y-32">
          {programs.map((program, i) => (
            <article
              key={program.slug}
              id={program.slug}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <div className={`relative aspect-[4/3] overflow-hidden rounded-card ${i % 2 ? "lg:order-2" : ""}`} data-reveal-image>
                <Image src={program.image.src} alt={program.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                <span className="display absolute left-5 top-4 text-7xl text-bone/90 drop-shadow-lg">0{i + 1}</span>
              </div>
              <div data-reveal>
                <p className="eyebrow">{program.tagline}</p>
                <h2 className="display mt-4 text-5xl sm:text-6xl">{program.name}</h2>
                <p className="mt-6 text-lg leading-relaxed text-bone/80">{program.description}</p>
                <ul className="mt-8 space-y-3">
                  {program.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <Check className="size-5 text-ember" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/contact#enquiry" className="mt-10">
                  Enquire about {program.name.split(" ")[0]}
                </ButtonLink>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
