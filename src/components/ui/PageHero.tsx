import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/types";
import { Container } from "./Container";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  image: Photo;
};

/** Banner used at the top of every inner page. */
export function PageHero({ eyebrow, title, intro, image }: PageHeroProps) {
  return (
    <section className="grain relative isolate flex min-h-[62svh] items-end overflow-hidden pb-16 pt-[calc(var(--header-h)+4rem)]">
      <Image src={image.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/80">{intro}</p>
      </Container>
    </section>
  );
}
