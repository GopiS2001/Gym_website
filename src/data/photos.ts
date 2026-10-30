import type { Photo } from "@/types";

const landscape = { width: 2000, height: 1333 };
const portrait = { width: 1333, height: 2000 };

// Optimized copies of /Photos (see scripts/optimize-images.mjs).
export const photos = {
  machinesFloor: { src: "/images/machines-floor.webp", alt: "Rows of selectorised strength machines on the gym floor", width: 2000, height: 1335 },
  strengthMachines: { src: "/images/strength-machines.webp", alt: "Multi-station strength machines under warm overhead lighting", width: 2000, height: 1335 },
  legMachines: { src: "/images/leg-machines.webp", alt: "Leg curl and leg extension machines by the windows", width: 2000, height: 1335 },
  legExtension: { src: "/images/leg-extension.webp", alt: "Leg extension machine on a rubber training mat", width: 2000, height: 1335 },
  freeWeightsCorridor: { src: "/images/free-weights-corridor.webp", alt: "Dumbbell rack and adjustable bench in a bright corridor", ...landscape },
  treadmillsWindow: { src: "/images/treadmills-window.webp", alt: "Treadmills facing floor-to-ceiling windows", ...landscape },
  treadmillView: { src: "/images/treadmill-view.webp", alt: "Treadmill overlooking greenery through the glass", ...portrait },
  cardioHall: { src: "/images/cardio-hall.webp", alt: "Long hall of cross-trainers and cardio machines", width: 1500, height: 2000 },
  cardioFloor: { src: "/images/cardio-floor.webp", alt: "Spacious cardio floor with wooden flooring and city views", width: 2000, height: 1335 },
  barbellKettlebell: { src: "/images/barbell-kettlebell.webp", alt: "Loaded barbell and kettlebell resting on rubber flooring", ...landscape },
  cableRope: { src: "/images/cable-rope.webp", alt: "Tricep rope attachment hanging from a cable pulley", width: 1498, height: 2000 },
  athletePortrait: { src: "/images/athlete-portrait.webp", alt: "Athlete in training gear standing in a dark gym", width: 1334, height: 2000 },
  squatRack: { src: "/images/squat-rack.webp", alt: "Member performing a barbell back squat in the rack", ...portrait },
  spinBike: { src: "/images/spin-bike.webp", alt: "Close-up of an indoor cycling bike flywheel", ...portrait },
  dumbbellDeadlift: { src: "/images/dumbbell-deadlift.webp", alt: "Athlete lifting heavy dumbbells in the free-weights area", ...portrait },
  dumbbellRack: { src: "/images/dumbbell-rack.webp", alt: "Row of rubber dumbbells on a rack", ...landscape },
  medicineBalls: { src: "/images/medicine-balls.webp", alt: "Rack of medicine balls and functional training gear", ...landscape },
  functionalZone: { src: "/images/functional-zone.webp", alt: "Functional training zone with turf lane and stability balls", width: 2000, height: 1200 },
  studioRoom: { src: "/images/studio-room.webp", alt: "Bright training studio with machines and mirrors", width: 2000, height: 1334 },
  legPress: { src: "/images/leg-press.webp", alt: "Member training on the seated leg press", ...portrait },
  cardioLockers: { src: "/images/cardio-lockers.webp", alt: "Cardio area beside the locker room", ...landscape },
  bikeAthlete: { src: "/images/bike-athlete.webp", alt: "Athlete pushing hard on an exercise bike", ...portrait },
  weightsRoom: { src: "/images/weights-room.webp", alt: "Weights room with dumbbells, benches and plate-loaded machines", width: 2000, height: 1211 },
  plateRack: { src: "/images/plate-rack.webp", alt: "Weight plates loaded on a power rack", ...portrait },
  dumbbellStand: { src: "/images/dumbbell-stand.webp", alt: "Three-tier dumbbell stand", width: 2000, height: 1296 },
  dumbbellsClose: { src: "/images/dumbbells-close.webp", alt: "Close-up of a long row of dumbbells", width: 1334, height: 2000 },
  hexDumbbells: { src: "/images/hex-dumbbells.webp", alt: "Pair of hex dumbbells on a dark floor", ...landscape },
  coachingFloor: { src: "/images/coaching-floor.webp", alt: "Coach and members on a dimly lit training floor", ...landscape },
  powerRacks: { src: "/images/power-racks.webp", alt: "Line of power racks and benches in the strength zone", ...landscape },
  cableStations: { src: "/images/cable-stations.webp", alt: "Cable crossover and pulley stations", ...landscape },
  rackZone: { src: "/images/rack-zone.webp", alt: "Squat racks loaded with plates", ...landscape },
  rower: { src: "/images/rower.webp", alt: "Air rowing machine on a rubber floor", ...landscape },
  hexGrip: { src: "/images/hex-grip.webp", alt: "Hand gripping a hex dumbbell from the rack", width: 1125, height: 2000 },
  tyreTurf: { src: "/images/tyre-turf.webp", alt: "Training tyre on a turf sprint lane", width: 1125, height: 2000 },
} satisfies Record<string, Photo>;
