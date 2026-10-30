import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="grid min-h-svh place-items-center pt-[var(--header-h)]">
      <Container className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 text-7xl sm:text-9xl">Wrong turn</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">This page skipped leg day and never showed up.</p>
        <ButtonLink href="/" className="mt-10">
          Back home
        </ButtonLink>
      </Container>
    </section>
  );
}
