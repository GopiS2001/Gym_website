import type { Metadata } from "next";
import { photos } from "@/data/photos";
import { PageHero } from "@/components/ui/PageHero";
import { TrainersSection } from "@/components/sections/TrainersSection";
import { CtaSection } from "@/components/sections/CtaSection";

export const metadata: Metadata = {
  title: "Trainers",
  description: "Meet the certified coaches at Real Warriors — strength, personal training and conditioning specialists.",
  alternates: { canonical: "/trainers" },
};

export default function TrainersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our coaches"
        title={
          <>
            The people behind <span className="text-ember">your progress</span>
          </>
        }
        intro="Our coaches are on the floor every session — correcting form, adjusting plans and pushing you when it counts. Book a free trial to train with any of them."
        image={photos.coachingFloor}
      />
      <TrainersSection detailed />
      <CtaSection />
    </>
  );
}
