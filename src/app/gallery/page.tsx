import type { Metadata } from "next";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Take a look inside Real Warriors — strength zone, cardio deck, functional turf and more.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Step <span className="text-ember">inside</span>
          </>
        }
        intro="Better yet, see it in person — your free trial includes a full tour of the gym."
        image={photos.weightsRoom}
      />
      <section className="py-20 lg:py-24">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
