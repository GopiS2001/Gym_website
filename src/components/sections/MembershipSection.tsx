import { Check } from "lucide-react";
import { advanceFee, currency, memberships } from "@/data/memberships";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MembershipSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        {showHeading && (
          <SectionHeading
            align="center"
            eyebrow="Membership"
            title={
              <>
                Choose your <span className="text-ember">commitment</span>
              </>
            }
            intro="Simple, affordable plans for every goal — from month-to-month to a full year."
          />
        )}

        <ul className={`grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4 ${showHeading ? "mt-16" : ""}`}>
          {memberships.map((plan) => (
            <li
              key={plan.name}
              data-reveal
              className={`relative flex flex-col rounded-card border p-8 ${
                plan.featured ? "border-ember bg-ember text-ink shadow-[var(--shadow-card)] xl:-my-4 xl:py-12" : "border-line bg-surface"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-8 rounded-full bg-ink px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ember">
                  Most popular
                </span>
              )}
              <h3 className="display text-3xl">{plan.name}</h3>
              <p className={`mt-2 ${plan.featured ? "text-ink/75" : "text-muted"}`}>{plan.description}</p>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="display text-5xl">
                  {currency}
                  {plan.price.toLocaleString("en-IN")}
                </span>
                {plan.period && <span className={plan.featured ? "text-ink/70" : "text-muted"}>/ {plan.period}</span>}
              </p>
              <ul className="mt-8 flex-1 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className={`mt-0.5 size-5 shrink-0 ${plan.featured ? "text-ink" : "text-ember"}`} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={`/contact?plan=${encodeURIComponent(plan.name)}#enquiry`}
                aria-label={`Choose ${plan.name} plan`}
                variant={plan.featured ? "light" : "ghost"}
                className={`mt-10 w-full ${plan.featured ? "hover:!bg-ink hover:!text-bone" : ""}`}
              >
                Choose plan
              </ButtonLink>
            </li>
          ))}
        </ul>

        <div
          data-reveal
          className="mt-12 flex flex-col items-center gap-6 rounded-card border-2 border-dashed border-ember/70 bg-ember/10 px-6 py-10 text-center sm:flex-row sm:justify-center sm:gap-10 sm:text-left lg:py-12 xl:mt-16"
        >
          <p className="display text-7xl text-ember sm:text-8xl lg:text-9xl">
            {currency}
            {advanceFee}
          </p>
          <div>
            <p className="display text-4xl sm:text-5xl lg:text-6xl">One-time advance</p>
            <p className="mt-2 text-lg text-bone/80 sm:text-xl">Payable at joining, along with your plan fee.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
