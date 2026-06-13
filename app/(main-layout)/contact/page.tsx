import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, Clock, MapPin, ArrowLeft } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Kiddvant",
  description:
    "Reach Kiddvant for order help, product questions, or partnerships. We are here to help families get the most out of playtime.",
};

const contactCards = [
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@kiddvant.com", "support@kiddvant.com"],
    href: "mailto:support@kiddvant.com",
    action: "Email us",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+880 1234-567890"],
    href: "tel:+8801234567890",
    action: "Call us",
  },
  {
    icon: Clock,
    title: "Hours",
    lines: ["Sat–Thu, 10:00–18:00", "Closed Fridays & public holidays"],
    href: null as string | null,
    action: null as string | null,
  },
  {
    icon: MapPin,
    title: "Visit",
    lines: ["Dhaka, Bangladesh", "Showroom by appointment"],
    href: null,
    action: null,
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 max-h-[40vh] opacity-40"
        aria-hidden
      >
        <div className="absolute left-1/4 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute right-1/4 top-12 h-56 w-56 translate-x-1/4 rounded-full bg-chart-2/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to home
        </Link>

        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Contact us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Questions about an order, a toy, or working together? Send a message
            and our team will get back to you as soon as we can.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12 xl:grid-cols-[1fr_380px]">
          <ContactForm />

          <aside className="space-y-4 lg:pt-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Other ways to reach us
            </h2>
            <ul className="space-y-3">
              {contactCards.map((card) => (
                <li
                  key={card.title}
                  className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <card.icon className="size-5" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{card.title}</p>
                      {card.lines.map((line) => (
                        <p
                          key={line}
                          className="text-sm leading-relaxed text-muted-foreground"
                        >
                          {line}
                        </p>
                      ))}
                      {card.href && card.action ? (
                        <a
                          href={card.href}
                          className="mt-2 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {card.action}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              Prefer social? Links are in the site footer. For order numbers, please
              include them in your message so we can help faster.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
