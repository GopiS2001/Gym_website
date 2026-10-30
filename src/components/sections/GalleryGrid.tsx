"use client";

import Image from "next/image";
import { useState } from "react";
import { gallery, galleryCategories, type GalleryCategory } from "@/data/gallery";

export function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory>("All");
  const items = active === "All" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <>
      <div role="group" aria-label="Filter gallery" className="flex flex-wrap gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
              active === c ? "border-ember bg-ember text-ink" : "border-line text-bone/75 hover:border-bone"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Not using [data-reveal] here: items change after the scroll reveals are set up. */}
      <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map(({ photo }) => (
          <li key={photo.src} className="mb-4 break-inside-avoid overflow-hidden rounded-card">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full transition-transform duration-700 hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
