import Image from "next/image";
import { Dumbbell, ShieldCheck, Users } from "lucide-react";
import { photos } from "@/data/photos";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  { icon: Dumbbell, title: "Serious equipment", text: "Power racks, plate-loaded machines, dumbbells to heavy and a full cardio deck." },
  { icon: ShieldCheck, title: "Coaching that cares", text: "Certified coaches on the floor every session to correct form and keep you safe." },
  { icon: Users, title: "A real community", text: "Train alongside people who show up, push hard and lift each other up." },
];

export function AboutSection({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="py-24 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative grid grid-cols-5 gap-4">
          <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-card" data-reveal-image>
            <Image src={photos.squatRack.src} alt={photos.squatRack.alt} fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
          </div>
          <div className="col-span-2 flex flex-col gap-4 pt-16">
            <div className="relative aspect-[3/4] overflow-hidden rounded-card" data-reveal-image>
              <Image src={photos.hexGrip.src} alt={photos.hexGrip.alt} fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            </div>
            <div className="rounded-card bg-ember p-5 text-ink" data-reveal>
              <p className="display text-5xl">100%</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider">Effort. Every rep.</p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Who we are"
            title={
              <>
                Built for people who <span className="text-ember">show up</span>
              </>
            }
            intro="Real Warriors is not a place to wander between machines. It's a training ground — coached, focused and built around one thing: helping you get stronger than you were yesterday."
          />
          <ul className="mt-10 space-y-6">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-5" data-reveal>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-ember">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          {withLink && (
            <div className="mt-10" data-reveal>
              <ButtonLink href="/about" variant="ghost">
                Our story
              </ButtonLink>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
