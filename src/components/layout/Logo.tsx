import Link from "next/link";

// TODO(client): swap for the official logo file when supplied.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Real Warriors home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 text-ember transition-transform duration-500 group-hover:rotate-12">
        <path fill="currentColor" d="M16 1 29 6v9.5C29 23 23.5 28.6 16 31 8.5 28.6 3 23 3 15.5V6L16 1Z" />
        <path fill="#0a0a0b" d="m9 10 3.2 12h2.4L16 15.6l1.4 6.4h2.4L23 10h-2.6l-1.9 8.2L17.1 12h-2.2l-1.4 6.2L11.6 10H9Z" />
      </svg>
      <span className="display whitespace-nowrap text-xl tracking-wide">
        Real <span className="text-ember">Warriors</span>
      </span>
    </Link>
  );
}
