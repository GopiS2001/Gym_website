import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { photos } from "@/data/photos";
import { whatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaSection() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grain relative isolate overflow-hidden rounded-[2rem] px-6 py-20 text-center sm:px-12 lg:py-28" data-reveal>
          <Image src={photos.barbellKettlebell.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ember/95 via-ember-deep/85 to-ink/90" />
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ink">First session on us</p>
          <h2 className="display mx-auto mt-5 max-w-4xl text-6xl text-ink sm:text-7xl lg:text-8xl">Your first rep starts today</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink/80">
            Book a free trial, meet a coach and get a full fitness assessment — no pressure, no obligation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact#enquiry" variant="light" className="hover:!bg-ink hover:!text-bone">
              Book free trial
            </ButtonLink>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              <MessageCircle className="size-4" aria-hidden />
              WhatsApp us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
