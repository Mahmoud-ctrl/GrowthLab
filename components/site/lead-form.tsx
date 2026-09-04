"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Container, Kicker } from "./primitives";
import { PROGRAM } from "./data";
import { trackEvent } from "@/lib/track";

type Fields = { name: string; email: string; phone: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d][\d\s()-]{6,}$/;

/** What the strategy guide covers. */
const TEARDOWN = [
  "Market research",
  "Audience definition",
  "Campaign planning",
  "Performance measurement",
];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!PHONE_RE.test(f.phone.trim()))
    e.phone = "Enter a valid phone number (min 7 digits).";
  return e;
}

export function LeadForm() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const [fields, setFields] = React.useState<Fields>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof Fields, boolean>>
  >({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");
  // honeypot — hidden from real users; bots fill it and get silently dropped
  const [company, setCompany] = React.useState("");
  // fires the Meta "ApplicationStarted" event on the first real keystroke
  const startedRef = React.useRef(false);

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("ApplicationStarted");
    }
    const next = { ...fields, [k]: ev.target.value };
    setFields(next);
    if (touched[k]) setErrors(validate(next));
  };

  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields));
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    setTouched({ name: true, email: true, phone: true });
    if (Object.keys(e).length > 0) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="apply"
      className="scroll-mt-16 border-t border-ink bg-ink py-24 text-paper sm:py-32"
    >
      <Container>
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* left — the offer */}
          <div className="text-center lg:text-left">
            <Kicker className="text-paper/45">09 / Reserve your seat</Kicker>
            <span className="mt-6 block kicker text-orange-ink [font-size:0.62rem]">
              Free when you register
            </span>
            <h3 className="mt-2 font-display text-[1.6rem] font-black uppercase leading-[1.02] tracking-[-0.025em] text-paper sm:text-[2rem]">
              Digital Marketing Strategy Guide
            </h3>
            <p className="mx-auto mt-2.5 max-w-md text-[13px] leading-relaxed text-paper/60 lg:mx-0">
              Discover the key elements behind an effective digital marketing
              strategy, including market research, audience definition,
              objectives, channel selection, campaign planning, and performance
              measurement, all explained in a practical, easy-to-follow format.
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-1.5 lg:justify-start">
              {TEARDOWN.map((x) => (
                <li
                  key={x}
                  className="rounded-full border border-paper/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-paper/55"
                >
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* right — the form */}
          <div>
            <div className="rounded-2xl border border-paper/20 bg-paper p-6 text-ink sm:p-9">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="success"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-start py-8"
                  >
                    <motion.span
                      initial={reduce ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="grid h-12 w-12 place-items-center rounded-full bg-ink text-paper"
                    >
                      <svg viewBox="0 0 14 14" className="h-5 w-5" aria-hidden>
                        <path
                          d="M2 7.5l3.5 3.5L12 3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          fill="none"
                        />
                      </svg>
                    </motion.span>
                    <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                      You&apos;re on the list
                    </h3>
                    <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-ink-2">
                      Thanks, {fields.name.split(" ")[0] || "there"}. We just
                      emailed you your free Digital Marketing Strategy Guide.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="relative flex flex-col gap-7"
                  >
                    {/* honeypot — off-screen, absolutely positioned so it is not a
                        flex item and adds no gap; real users never reach it.
                        The field must NOT be named "company"/"organization" or
                        carry a matching label: Chrome autofill + password managers
                        fill it, which then drops every real submission. Bots that
                        blindly fill all inputs still trip it. The payload key
                        stays `company` so the API route is unchanged. */}
                    <div
                      className="absolute -left-[9999px] top-0"
                      aria-hidden="true"
                    >
                      <label htmlFor="hp-referral">Referral code</label>
                      <input
                        id="hp-referral"
                        name="hp-referral"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        data-1p-ignore
                        data-lpignore="true"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>

                    <Field id="name" label="Full name" error={errors.name}>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Jane Doe"
                        value={fields.name}
                        onChange={set("name")}
                        onBlur={blur("name")}
                        invalid={!!errors.name}
                        disabled={status === "submitting"}
                      />
                    </Field>

                    <Field id="email" label="Email" error={errors.email}>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="jane@email.com"
                        value={fields.email}
                        onChange={set("email")}
                        onBlur={blur("email")}
                        invalid={!!errors.email}
                        disabled={status === "submitting"}
                      />
                    </Field>

                    <Field id="phone" label="Phone number" error={errors.phone}>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+961 3 000 000"
                        value={fields.phone}
                        onChange={set("phone")}
                        onBlur={blur("phone")}
                        invalid={!!errors.phone}
                        disabled={status === "submitting"}
                      />
                    </Field>

                    <Button
                      type="submit"
                      size="lg"
                      className="mt-1 w-full"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : status === "error" ? (
                        "Try again"
                      ) : (
                        "Apply Now"
                      )}
                    </Button>
                    {status === "error" ? (
                      <p
                        role="alert"
                        className="text-center text-[12px] text-orange"
                      >
                        Something went wrong sending that. Please try again, or
                        email us at {PROGRAM.email}.
                      </p>
                    ) : (
                      <p className="text-center text-[12px] text-orange text-bold" style={{ fontWeight: "bold" }}>
                        When you fill out the form you will get the 
                        program details, in addition to your free Digital 
                        Marketing Strategy Guide, straight to your inbox.
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="text-[12px] text-orange"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
