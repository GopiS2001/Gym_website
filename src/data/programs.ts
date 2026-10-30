import type { Program } from "@/types";
import { photos } from "./photos";

// TODO(client): keep only the programs actually offered.
export const programs: Program[] = [
  {
    slug: "strength",
    name: "Strength Training",
    tagline: "Build raw power",
    description:
      "Barbell-focused programming around the big lifts — squat, bench, deadlift and press — with progressive overload tracked every session.",
    highlights: ["Coached technique sessions", "Power racks & platforms", "Progress tracking"],
    image: photos.rackZone,
  },
  {
    slug: "personal-training",
    name: "Personal Training",
    tagline: "One coach. One goal. Yours.",
    description:
      "One-to-one coaching with a plan built around your body, schedule and goals, plus nutrition guidance and regular check-ins.",
    highlights: ["Custom training plan", "Nutrition guidance", "Monthly assessments"],
    image: photos.dumbbellDeadlift,
  },
  {
    slug: "weight-loss",
    name: "Weight Loss & Fitness",
    tagline: "Lose fat, keep strength",
    description:
      "A structured mix of resistance training and conditioning that burns fat while protecting muscle, with habits that last beyond the program.",
    highlights: ["Body composition tracking", "Small-group sessions", "Habit coaching"],
    image: photos.legPress,
  },
  {
    slug: "cardio",
    name: "Cardio & Endurance",
    tagline: "Engine work",
    description:
      "Treadmills, rowers, bikes and cross-trainers for steady-state and interval work that improves heart health and stamina.",
    highlights: ["Interval programming", "Heart-rate zones", "Bikes & rowers"],
    image: photos.treadmillsWindow,
  },
  {
    slug: "functional",
    name: "Functional Training",
    tagline: "Move better, everywhere",
    description:
      "Kettlebells, turf lanes, tyres and medicine balls for athletic, full-body conditioning that carries over to everyday life.",
    highlights: ["Turf sprint lane", "Kettlebells & tyres", "Mobility work"],
    image: photos.functionalZone,
  },
];
