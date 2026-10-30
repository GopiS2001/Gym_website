import type { Trainer } from "@/types";
import { photos } from "./photos";

// PLACEHOLDER: names, bios, certifications and photos must be supplied and approved by the client.
export const trainers: Trainer[] = [
  {
    name: "Coach Name",
    role: "Head Strength Coach",
    bio: "Specialises in powerlifting technique and building strength safely for lifters of every level.",
    specialties: ["Powerlifting", "Technique", "Programming"],
    certifications: ["Certification to be confirmed"],
    image: photos.dumbbellDeadlift,
  },
  {
    name: "Coach Name",
    role: "Personal Training Lead",
    bio: "Helps members lose fat and build confidence through structured training and sustainable nutrition.",
    specialties: ["Fat loss", "Nutrition", "Body recomposition"],
    certifications: ["Certification to be confirmed"],
    image: photos.athletePortrait,
  },
  {
    name: "Coach Name",
    role: "Conditioning Coach",
    bio: "Builds engines. Runs interval and functional sessions that push stamina and athletic performance.",
    specialties: ["HIIT", "Endurance", "Functional fitness"],
    certifications: ["Certification to be confirmed"],
    image: photos.bikeAthlete,
  },
];
