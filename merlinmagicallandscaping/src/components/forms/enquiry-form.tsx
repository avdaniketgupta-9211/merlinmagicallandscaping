"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import type { Service } from "@/data/site";
import { formLimits, validateEnquiry, type ContactMethod, type EnquiryKind, type FormErrors, type FormField } from "@/lib/enquiries";

type ControlProps = { id: string; name: FormField; "aria-invalid"?: true; "aria-describedby"?: string };

function Field({ name, label, error, wide = false, children }: { name: FormField; label: ReactNode; error?: string; wide?: boolean; children: (props: ControlProps) => ReactNode }) {
  const id = `enquiry-${name}`;
  return (
    <div className={`form-field${wide ? " field-wide" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children({ id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined })}
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  );
}

type Status = { kind: "idle" | "sending" | "error" | "success"; text?: string; reference?: string };

export function EnquiryForm({ initialKind, initialService, offered }: { initialKind: EnquiryKind; initialService: string; offered: Service[] }) {
  const [kind, setKind] = useState(initialKind);
  const [method, setMethod] = useState<ContactMethod>("email");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const feedback = kind === "feedback";
  const sending = status.kind === "sending";

  function focusError(form: HTMLFormElement) {
    requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), kind };
    const result = validateEnquiry(data);
    if (!result.data) {
      setErrors(result.errors);
      setStatus({ kind: "error", text: "Please check the highlighted fields." });
      focusError(form);
      return;
    }
    setErrors({});
    setStatus({ kind: "sending", text: "Sending…" });
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
      });
      const reply = await response.json() as { id?: string; message?: string; errors?: FormErrors };
      if (!response.ok || !reply.id) {
        setErrors(reply.errors || {});
        setStatus({ kind: "error", text: reply.message || "Your message could not be saved. Please try again." });
        if (reply.errors) focusError(form);
        return;
      }
      form.reset();
      setMethod("email");
      setStatus({ kind: "success", text: feedback ? "Thank you. Your feedback has been saved." : "Thank you. Your enquiry has been saved.", reference: reply.id });
    } catch {
      setStatus({ kind: "error", text: "We couldn’t reach the enquiry service. Your details are still in the form. Please try again." });
    }
  }

  function changeKind(next: EnquiryKind) {
    if (kind === next) return;
    setKind(next);
    setErrors({});
    setStatus({ kind: "idle" });
  }

  return (
    <form className="enquiry-form" method="post" action="/api/enquiries" onSubmit={submit} noValidate onChange={(event) => {
      const target: EventTarget = event.target;
      if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
      const name = target.name as FormField;
      if (errors[name]) setErrors((previous) => { const remaining = { ...previous }; delete remaining[name]; return remaining; });
    }}>
      <div className="form-mode" role="group" aria-label="What are you getting in touch about?">
        <button type="button" aria-pressed={!feedback} onClick={() => changeKind("project")} disabled={sending}>Project enquiry</button>
        <button type="button" aria-pressed={feedback} onClick={() => changeKind("feedback")} disabled={sending}>Share feedback</button>
      </div>
      <div className="form-grid">
        <Field name="fullName" label="Full name" error={errors.fullName}>{(props) => <input {...props} placeholder="Your full name" autoComplete="name" required maxLength={formLimits.fullName} />}</Field>
        <Field name="email" label="Email address" error={errors.email}>{(props) => <input {...props} type="email" placeholder="you@example.com" autoComplete="email" required maxLength={formLimits.email} />}</Field>
        <Field name="phone" label={<>Phone number{method !== "phone" && <span> (optional)</span>}</>} error={errors.phone}>{(props) => <input {...props} type="tel" placeholder="Your phone number" autoComplete="tel" required={method === "phone"} maxLength={formLimits.phone} />}</Field>
        <Field name="contactMethod" label="Preferred contact method" error={errors.contactMethod}>{(props) => <div className="select-wrap"><select {...props} required value={method} onChange={(event) => setMethod(event.target.value as ContactMethod)}><option value="email">Email</option><option value="phone">Phone</option></select><ChevronDown size={16} aria-hidden="true" /></div>}</Field>
        {!feedback && <>
          <Field name="service" label="Type of landscaping service" error={errors.service}>{(props) => <div className="select-wrap"><select {...props} defaultValue={initialService}><option value="general">General landscaping enquiry</option>{offered.map((service) => <option value={service.slug} key={service.slug}>{service.title}</option>)}</select><ChevronDown size={16} aria-hidden="true" /></div>}</Field>
          <Field name="location" label="Project location" error={errors.location}>{(props) => <input {...props} placeholder="Town or postcode" autoComplete="off" required maxLength={formLimits.location} />}</Field>
        </>}
        <Field name="message" label={feedback ? "Your feedback" : "Project description"} error={errors.message} wide>{(props) => <textarea {...props} placeholder={feedback ? "Tell us about your experience…" : "Tell us about your space and what you’d like to change…"} required rows={4} maxLength={formLimits.message} />}</Field>
      </div>
      <div className="form-honeypot" aria-hidden="true"><label htmlFor="enquiry-extra">Leave this field blank</label><input id="enquiry-extra" name="extraNotes" tabIndex={-1} autoComplete="off" /></div>
      <div className="form-bottom">
        <button className="button button-navy" type="submit" disabled={sending}>{sending ? "Sending…" : feedback ? "Send Feedback" : "Send Enquiry"}<ArrowUpRight size={17} strokeWidth={1.65} aria-hidden="true" /></button>
        <p>We’ll use your details to respond to your message. See our <Link href="/privacy">Privacy Policy</Link>.</p>
      </div>
      <div className={`form-status status-${status.kind}`} role="status" aria-live="polite" aria-atomic="true">
        {status.kind === "success" && <CheckCircle2 size={20} aria-hidden="true" />}
        {status.text && <div>{status.text}{status.reference && <small>Reference: {status.reference}</small>}</div>}
      </div>
    </form>
  );
}
