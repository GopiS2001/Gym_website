import Image from "next/image";
import { photos } from "@/data/photos";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tiles = [
  { photo: photos.powerRacks, className: "col-span-2 row-span-2" },
  { photo: photos.tyreTurf, className: "row-span-2" },
  { photo: photos.medicineBalls, className: "" },
  { photo: photos.rower, className: "" },
  { photo: photos.cardioFloor, className: "col-span-2" },
  { photo: photos.cableStations, className: "col-span-2" },
];

export function GalleryPreview() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Inside the gym"
            title={
              <>
                Your new <span className="text-ember">arena</span>
              </>
            }
            intro="Strength zone, cardio deck, functional turf and more — all under one roof."
          />
          <div data-reveal>
            <ButtonLink href="/gallery" variant="ghost">
              Full gallery
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4 lg:gap-4">
          {tiles.map(({ photo, className }) => (
            <div key={photo.src} className={`relative overflow-hidden rounded-card ${className}`} data-reveal-image>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 40vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
