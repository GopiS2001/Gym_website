import { z } from "zod";
import { programs } from "@/data/programs";

export const interestOptions = [...programs.map((p) => p.name), "Membership", "Other"] as const;

/** Shared by the browser form and the API route so validation can never drift. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{8,16}$/, "Please enter a valid phone number"),
  email: z.union([z.literal(""), z.email("Please enter a valid email").max(120)]),
  interest: z.enum(interestOptions, { error: "Please choose an option" }),
  visitDate: z.union([z.literal(""), z.iso.date("Please choose a valid date")]),
  message: z.string().trim().max(1000, "Please keep your message under 1000 characters"),
  consent: z.literal(true, { error: "Please agree so we can contact you" }),
  // Honeypot: real people never see or fill this field.
  company: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
