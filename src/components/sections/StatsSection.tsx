import { stats } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/animation/CountUp";

export function StatsSection() {
  return (
    <section aria-label="Gym in numbers" className="border-y border-line bg-surface">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse gap-2 py-10 sm:py-14 ${i % 2 ? "pl-6 sm:pl-10" : ""} ${
                i > 0 ? "lg:border-l lg:border-line lg:pl-10" : ""
              } ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""}`}
            >
              <dt className="text-sm uppercase tracking-[0.16em] text-muted">{stat.label}</dt>
              <dd className="display text-5xl text-bone sm:text-6xl">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
