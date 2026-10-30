// Converts the original photos in /Photos into web-sized WebP files in /public/images.
// Run with: npm run images
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC = "Photos";
const OUT = "public/images";
const MAX_EDGE = 2000;

const MAP = {
  "pexels-724211268-40371840.jpg": "machines-floor",
  "pexels-724211268-40371847.jpg": "strength-machines",
  "pexels-724211268-40371849.jpg": "leg-machines",
  "pexels-724211268-40371850.jpg": "leg-extension",
  "pexels-aj-ahamad-767001191-29149073.jpg": "free-weights-corridor",
  "pexels-aj-ahamad-767001191-29149082.jpg": "treadmills-window",
  "pexels-aj-ahamad-767001191-30147878.jpg": "treadmill-view",
  "pexels-allen-boguslavsky-1344061-34761566.jpg": "cardio-hall",
  "pexels-artbovich-7031706.jpg": "cardio-floor",
  "pexels-arturo-eg-22214041-6628962.jpg": "barbell-kettlebell",
  "pexels-arun-kachhwaha-860990-35529263.jpg": "cable-rope",
  "pexels-bymuratisikofficial-39635357.jpg": "athlete-portrait",
  "pexels-cesar-o-neill-26650613-29259727.jpg": "squat-rack",
  "pexels-davegarcia-35567435.jpg": "spin-bike",
  "pexels-dogu-tuncer-339534179-16996376.jpg": "dumbbell-deadlift",
  "pexels-dubtastic-19025674.jpg": "dumbbell-rack",
  "pexels-emanuel-pedro-1266938328-32610333.jpg": "medicine-balls",
  "pexels-eyecon-design-500632474-17211446.jpg": "functional-zone",
  "pexels-hiroom-17227607.jpg": "studio-room",
  "pexels-iram-shehzad-45081404-37570727.jpg": "leg-press",
  "pexels-jdgromov-4716814.jpg": "cardio-lockers",
  "pexels-jean-daniel-19254708.jpg": "bike-athlete",
  "pexels-maru-maru-hotel-zanzibar-2164869686-40591484.jpg": "weights-room",
  "pexels-matthew-jesus-468170389-39077994.jpg": "plate-rack",
  "pexels-olly-3916766.jpg": "dumbbell-stand",
  "pexels-pixabay-260352.jpg": "dumbbells-close",
  "pexels-rdne-7187878.jpg": "hex-dumbbells",
  "pexels-sarazhizmailov-13104546.jpg": "coaching-floor",
  "pexels-totalshape-6046978.jpg": "power-racks",
  "pexels-totalshape-6046979.jpg": "cable-stations",
  "pexels-totalshape-6046983.jpg": "rack-zone",
  "pexels-victorfreitas-897061.jpg": "rower",
  "pexels-warrecreates-32233887.jpg": "hex-grip",
  "pexels-woom-fitness-2155946557-33966785.jpg": "tyre-turf",
};

await fs.mkdir(OUT, { recursive: true });
for (const [file, name] of Object.entries(MAP)) {
  const dest = path.join(OUT, `${name}.webp`);
  const info = await sharp(path.join(SRC, file))
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(dest);
  console.log(`${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}

// Small poster shown while the 3D hero loads or when WebGL is unavailable.
await sharp(path.join(SRC, "pexels-sarazhizmailov-13104546.jpg"))
  .resize(1600)
  .webp({ quality: 70 })
  .toFile("public/posters/hero-poster.webp");
