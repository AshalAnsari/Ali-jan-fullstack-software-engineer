"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { ButtonArrow } from "@/components/ui/button";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = "Please add your name.";
  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = "Please add an email address so I can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That email address doesn't look right.";
  if (String(data.get("message") ?? "").trim().length < 10) errors.message = "A sentence or two about the project helps.";
  return errors;
}

/**
 * No backend required: the form validates, then opens the visitor's mail
 * client with the message composed. Swap the submit handler for a server
 * action if a delivery service is added later.
 */
export function ContactForm({ to }: { to: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const id = useId();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const subject = `Project enquiry from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <Field id={`${id}-name`} name="name" label="Name" autoComplete="name" error={errors.name} />
      <Field id={`${id}-email`} name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
      <Field id={`${id}-message`} name="message" label="What are you building?" multiline error={errors.message} />
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          className="group/btn inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Compose email
          <ButtonArrow />
        </button>
        <p className="text-xs text-subtle" role="status">
          {sent ? "Your mail app should open with the message ready to send." : "Opens your mail app with the message filled in."}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  multiline,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
}) {
  const classes = cn(
    "w-full rounded-md border bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-subtle transition-colors focus:border-primary focus:outline-none focus-visible:outline-none",
    error ? "border-primary/70" : "border-border-strong hover:border-foreground/25",
  );
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required: true,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
    className: classes,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-label uppercase text-muted">
        {label}
      </label>
      {multiline ? <textarea rows={6} {...shared} className={cn(classes, "resize-y")} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
}
