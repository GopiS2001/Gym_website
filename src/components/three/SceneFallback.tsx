import Image from "next/image";
import { photos } from "@/data/photos";

/** Static stand-in shown while the 3D scene loads, or instead of it when WebGL is unavailable. */
export function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[70%] max-w-md overflow-hidden rounded-full border border-line/60">
        <Image src={photos.plateRack.src} alt="" fill priority sizes="(min-width: 1024px) 28rem, 70vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
      </div>
    </div>
  );
}
