import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroIntro } from "@/components/animation/HeroIntro";
import { HeroVisual } from "@/components/three/HeroVisual";

const headline = ["Forged", "in", "iron."];
const ticker = ["Strength", "Conditioning", "Personal training", "Fat loss", "Functional", "Cardio", "Community"];

export function HeroSection() {
  return (
    <section className="grain relative isolate flex min-h-svh flex-col overflow-hidden pt-[var(--header-h)]">
      <Image src={photos.coachingFloor.src} alt="" fill priority sizes="100vw" className="-z-30 object-cover opacity-35" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_70%_45%,rgb(255_77_26/0.22),transparent_55%)]" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <Container className="grid flex-1 items-center gap-6 py-10 lg:grid-cols-[1.1fr_1fr] lg:py-0">
        <HeroIntro className="relative z-10">
          <p className="eyebrow" data-hero="fade">
            Unisex Gym · Salem
          </p>
          <h1 className="display mt-5 text-[clamp(4rem,min(13vw,14svh),9rem)]">
            {headline.map((word, i) => (
              <span key={word} data-hero="line" className="block overflow-hidden pb-1">
                <span className={`block ${i === 2 ? "text-ember" : i === 1 ? "text-outline" : ""}`}>{word}</span>
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-bone/80" data-hero="fade">
            {site.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-hero="fade">
            <ButtonLink href="/contact#enquiry">Book a free trial</ButtonLink>
            <ButtonLink href="/programs" variant="ghost" arrow={false}>
              Explore programs
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted" data-hero="fade">
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-ember" aria-hidden />
              {site.hours.map((h) => h.time).join(" · ")}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-ember" aria-hidden />
              {site.address.short}
            </li>
          </ul>
        </HeroIntro>

        <div className="relative h-[42svh] min-h-72 lg:h-[78svh]">
          <HeroVisual />
        </div>
      </Container>

      <div className="relative border-y border-line bg-ink/60 py-4 backdrop-blur" aria-hidden>
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 motion-reduce:animate-none whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i} className="display flex items-center gap-10 text-2xl text-bone/70">
              {item}
              <span className="size-2 rotate-45 bg-ember" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
