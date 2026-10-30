import Image from "next/image";
import { trainers } from "@/data/trainers";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TrainersSection({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        {!detailed && (
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our coaches"
              title={
                <>
                  Coaches in your <span className="text-ember">corner</span>
                </>
              }
              intro="Experienced, certified and genuinely invested in your progress."
            />
            <div data-reveal>
              <ButtonLink href="/trainers" variant="ghost">
                Meet the team
              </ButtonLink>
            </div>
          </div>
        )}

        <ul className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${detailed ? "" : "mt-14"}`}>
          {trainers.map((trainer, i) => (
            <li key={`${trainer.role}-${i}`} className="group" data-reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-2">
                <Image
                  src={trainer.image.src}
                  alt={trainer.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />
                <ul className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                  {trainer.specialties.map((s) => (
                    <li key={s} className="rounded-full bg-bone/10 px-3 py-1 text-xs font-medium backdrop-blur">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <h3 className="display mt-5 text-3xl">{trainer.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.16em] text-ember">{trainer.role}</p>
              {detailed && (
                <>
                  <p className="mt-4 leading-relaxed text-muted">{trainer.bio}</p>
                  <p className="mt-3 text-sm text-bone/70">{trainer.certifications.join(" · ")}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
