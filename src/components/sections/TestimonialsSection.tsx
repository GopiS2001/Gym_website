import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TestimonialsSection() {
  return (
    <section className="border-t border-line py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Member stories"
          title={
            <>
              Real people. <span className="text-ember">Real results.</span>
            </>
          }
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i} data-reveal>
              <figure className="flex h-full flex-col rounded-card border border-line bg-surface p-8">
                <Quote className="size-8 text-ember" aria-hidden />
                <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-bone/90">“{t.quote}”</blockquote>
                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted">{t.detail}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
