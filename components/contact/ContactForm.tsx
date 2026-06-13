"use client";

import { useState, FormEvent } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const topics = [
  { value: "order", label: "Order or shipping" },
  { value: "product", label: "Product question" },
  { value: "partnership", label: "Partnership or wholesale" },
  { value: "other", label: "Something else" },
] as const;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState<(typeof topics)[number]["value"]>("order");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    setName("");
    setEmail("");
    setPhone("");
    setTopic("order");
    setMessage("");
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm md:p-10"
        role="status"
      >
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <h2 className="mt-6 font-heading text-xl font-semibold">
          Message received
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out. We typically reply within one to two business
          days. If your question is urgent, call us using the number on this page.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-8 rounded-full px-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cn(
              "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition",
              "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            )}
            placeholder="Your name"
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition",
              "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            )}
            placeholder="you@example.com"
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="contact-phone"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Phone <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={cn(
              "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition",
              "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            )}
            placeholder="+880 …"
          />
        </div>
        <div className="sm:col-span-1">
          <label
            htmlFor="contact-topic"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Topic
          </label>
          <select
            id="contact-topic"
            name="topic"
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value as (typeof topics)[number]["value"])
            }
            className={cn(
              "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition",
              "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            )}
          >
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(
            "w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition",
            "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          )}
          placeholder="How can we help?"
        />
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-10 min-w-[140px] rounded-full px-8"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
