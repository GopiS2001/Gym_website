"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { enquirySchema, interestOptions, type Enquiry, type EnquiryInput } from "@/schemas/enquiry";
import { Button } from "@/components/ui/Button";

const field =
  "w-full rounded-xl border border-line bg-ink px-4 py-3.5 text-bone placeholder:text-muted/70 transition-colors focus:border-ember focus:outline-none aria-[invalid=true]:border-red-500";
const label = "mb-2 block text-sm font-medium text-bone/85";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-400">
      {message}
    </p>
  );
}

export function EnquiryForm() {
  const params = useSearchParams();
  const plan = params.get("plan");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput, unknown, Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interest: plan ? "Membership" : undefined,
      visitDate: "",
      message: plan ? `I'm interested in the ${plan} membership.` : "",
      company: "",
    },
  });

  const onSubmit = async (data: Enquiry) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
      reset();
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-card border border-ember/40 bg-ember/10 p-8">
        <CheckCircle2 className="size-10 text-ember" aria-hidden />
        <h3 className="display text-4xl">Enquiry received</h3>
        <p className="text-bone/80">Thanks! A coach will call you within one working day to set up your free trial.</p>
        <Button type="button" variant="ghost" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={label}>
          Name *
        </label>
        <input id="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby="name-error" {...register("name")} />
        <FieldError id="name-error" message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="phone" className={label}>
          Phone *
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={field}
          aria-invalid={!!errors.phone}
          aria-describedby="phone-error"
          {...register("phone")}
        />
        <FieldError id="phone-error" message={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email <span className="text-muted">(optional)</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={field}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="interest" className={label}>
          Interested in *
        </label>
        <select id="interest" className={field} aria-invalid={!!errors.interest} aria-describedby="interest-error" {...register("interest")}>
          <option value="">Select…</option>
          {interestOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <FieldError id="interest-error" message={errors.interest?.message} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="visitDate" className={label}>
          Preferred visit date <span className="text-muted">(optional)</span>
        </label>
        <input
          id="visitDate"
          type="date"
          min={today}
          className={`${field} [color-scheme:dark]`}
          aria-invalid={!!errors.visitDate}
          aria-describedby="visitDate-error"
          {...register("visitDate")}
        />
        <FieldError id="visitDate-error" message={errors.visitDate?.message} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Message <span className="text-muted">(optional)</span>
        </label>
        <textarea id="message" rows={4} className={field} aria-invalid={!!errors.message} aria-describedby="message-error" {...register("message")} />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-bone/80">
          <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-[var(--color-ember)]" aria-describedby="consent-error" {...register("consent")} />
          <span>I agree to be contacted by Real Warriors about my enquiry. We only use these details to respond to you and never share them.</span>
        </label>
        <FieldError id="consent-error" message={errors.consent?.message} />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isSubmitting} className="sm:w-auto">
          {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {isSubmitting ? "Sending…" : "Book my free trial"}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-400">
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}
