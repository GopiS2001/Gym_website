import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, intro, align = "left", as: Tag = "h2" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <Tag className="display mt-4 text-5xl sm:text-6xl lg:text-7xl">{title}</Tag>
      {intro && <p className={`mt-6 text-lg leading-relaxed text-muted ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{intro}</p>}
    </div>
  );
}
