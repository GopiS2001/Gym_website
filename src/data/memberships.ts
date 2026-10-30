import type { MembershipPlan } from "@/types";

export const currency = "₹";

/** One-time amount paid at joining, on top of the plan fee. */
export const advanceFee = 500;

// TODO(client): confirm the feature lists for each plan.
export const memberships: MembershipPlan[] = [
  {
    name: "Monthly",
    price: 700,
    period: "month",
    description: "Full access, month by month.",
    features: ["Full gym floor access", "Morning & evening batches", "Trainer guidance on the floor"],
  },
  {
    name: "3 Months",
    price: 1500,
    period: "3 months",
    description: "Best value — save ₹600 compared to monthly.",
    features: ["Everything in Monthly", "Save ₹600 over 3 months", "Time to see real progress"],
    featured: true,
  },
  {
    name: "Annual",
    price: 9500,
    period: "year",
    description: "A full year of training, paid once.",
    features: ["Everything in Monthly", "12 months of access", "No renewals to worry about"],
  },
  {
    name: "Personal Training",
    price: 10000,
    // TODO(client): confirm duration covered by the ₹10,000 fee (e.g. per month / per program).
    description: "One-to-one coaching built around your goals.",
    features: ["Dedicated personal trainer", "Custom workout plan", "Diet guidance", "Regular progress checks"],
  },
];

export const membershipTerms = ["Memberships are non-transferable."];
