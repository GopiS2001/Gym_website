import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "ghost" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-ember text-ink hover:bg-bone",
  ghost: "border border-line text-bone hover:border-bone hover:bg-bone hover:text-ink",
  light: "bg-bone text-ink hover:bg-ember",
};

const base =
  "group inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & { variant?: Variant; arrow?: boolean };

export function ButtonLink({ variant = "primary", arrow = true, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
