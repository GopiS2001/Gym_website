import type { Photo } from "@/types";
import { photos } from "./photos";

export const galleryCategories = ["All", "Strength", "Cardio", "Functional", "Facility"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = { photo: Photo; category: Exclude<GalleryCategory, "All"> };

export const gallery: GalleryItem[] = [
  { photo: photos.rackZone, category: "Strength" },
  { photo: photos.treadmillView, category: "Cardio" },
  { photo: photos.functionalZone, category: "Functional" },
  { photo: photos.machinesFloor, category: "Facility" },
  { photo: photos.squatRack, category: "Strength" },
  { photo: photos.cardioFloor, category: "Cardio" },
  { photo: photos.medicineBalls, category: "Functional" },
  { photo: photos.hexGrip, category: "Strength" },
  { photo: photos.weightsRoom, category: "Facility" },
  { photo: photos.rower, category: "Cardio" },
  { photo: photos.tyreTurf, category: "Functional" },
  { photo: photos.powerRacks, category: "Strength" },
  { photo: photos.cardioHall, category: "Cardio" },
  { photo: photos.cableStations, category: "Facility" },
  { photo: photos.barbellKettlebell, category: "Functional" },
  { photo: photos.plateRack, category: "Strength" },
  { photo: photos.studioRoom, category: "Facility" },
  { photo: photos.spinBike, category: "Cardio" },
  { photo: photos.dumbbellRack, category: "Strength" },
  { photo: photos.coachingFloor, category: "Facility" },
  { photo: photos.cableRope, category: "Strength" },
  { photo: photos.treadmillsWindow, category: "Cardio" },
  { photo: photos.strengthMachines, category: "Facility" },
  { photo: photos.dumbbellsClose, category: "Strength" },
];
