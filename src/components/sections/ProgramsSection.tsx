import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programs } from "@/data/programs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProgramsSection() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Training programs"
            title={
              <>
                Pick your <span className="text-ember">battle</span>
              </>
            }
            intro="Every program is coached, structured and measured — so you always know what to do next and how far you've come."
          />
          <div data-reveal>
            <ButtonLink href="/programs" variant="ghost">
              All programs
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {programs.map((program, i) => (
            <li key={program.slug} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"} data-reveal>
              <Link
                href={`/programs#${program.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card p-6 sm:aspect-[4/3] lg:aspect-auto lg:h-[26rem]"
              >
                <Image
                  src={program.image.src}
                  alt={program.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-bone/10 backdrop-blur transition-colors group-hover:bg-ember group-hover:text-ink">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ember">{program.tagline}</p>
                <h3 className="display mt-2 text-4xl">{program.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
