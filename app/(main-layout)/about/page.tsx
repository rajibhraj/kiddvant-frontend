import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Heart,
  Award,
  Users,
  Leaf,
  Sparkles,
  ShieldCheck,
  Puzzle,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Kiddvant - Purposeful Play for Every Child",
  description:
    "Learn about Kiddvant's mission to provide screen-free, educational toys that inspire imagination and learning in children of all ages.",
};

const values = [
  {
    icon: Heart,
    title: "Made with care",
    description:
      "Every toy is designed to be safe, durable, and genuinely fun—so families can focus on play, not worry.",
  },
  {
    icon: Award,
    title: "Built to last",
    description:
      "We choose materials and construction that hold up to real life, from toddler towers to backyard adventures.",
  },
  {
    icon: Users,
    title: "Rooted in development",
    description:
      "Play patterns and age ranges are informed by how kids actually grow, explore, and learn.",
  },
  {
    icon: Leaf,
    title: "Mindful footprint",
    description:
      "We keep packaging lean, source thoughtfully, and look for ways to reduce waste without cutting corners on quality.",
  },
];

const milestones = [
  {
    year: "2010",
    title: "Where it started",
    description:
      "Kiddvant began with a simple idea: toys should invite imagination, not replace it.",
  },
  {
    year: "2015",
    title: "Room to grow",
    description:
      "We widened our range so older kids could keep discovering through hands-on, screen-free play.",
  },
  {
    year: "2019",
    title: "Greener packaging",
    description:
      "Recyclable packaging and clearer labeling made it easier for families to choose responsibly.",
  },
  {
    year: "2023",
    title: "Giving back",
    description:
      "Community programs helped put quality play into more homes through donations and partnerships.",
  },
  {
    year: "2026",
    title: "Today",
    description:
      "We continue to refine our lineup, listen to parents and educators, and ship joy worldwide.",
  },
];

const stats = [
  { value: "500+", label: "Curated toys" },
  { value: "50+", label: "Countries" },
  { value: "1M+", label: "Families" },
  { value: "15+", label: "Years of play" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
        >
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-chart-2/30 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
              <Sparkles className="size-4 text-primary" aria-hidden />
              Our story
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
              Play that feels{" "}
              <span className="text-primary">purposeful</span>, not noisy.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Kiddvant exists to champion screen-free, tactile play—toys that
              reward curiosity, build confidence, and leave room for kids to
              invent their own worlds.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90"
              >
                Browse toys
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-muted/60"
              >
                Back to home
              </Link>
            </div>
          </div>

          {/* Decorative panel — no images */}
          <div className="relative flex min-h-[280px] items-center justify-center md:min-h-[360px]">
            <div
              className="absolute inset-4 rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-muted/40 shadow-lg"
              aria-hidden
            />
            <div className="relative z-10 grid w-full max-w-sm gap-4 p-6">
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Puzzle className="size-6" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Design lens
                  </p>
                  <p className="mt-1 font-medium leading-snug">
                    Open-ended play first—so every session can go somewhere new.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur-sm md:translate-x-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-chart-2/15 text-chart-2">
                  <ShieldCheck className="size-6" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Trust
                  </p>
                  <p className="mt-1 font-medium leading-snug">
                    Safety and quality checks you can feel in the hand—not just on
                    the label.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur-sm md:-translate-x-2">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/30 text-accent-foreground">
                  <Target className="size-6" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Mission
                  </p>
                  <p className="mt-1 font-medium leading-snug">
                    Help families swap passive time for moments of real wonder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-20">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Our mission
        </h2>
        <blockquote className="mt-8 border-l-4 border-primary pl-6 text-left text-lg leading-relaxed text-muted-foreground md:text-xl">
          Give children tools that respect their intelligence: tactile,
          durable, and delightful—so parents feel good about what comes off the
          shelf and kids feel proud of what they build.
        </blockquote>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-muted/30 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
              What we stand for
            </h2>
            <p className="mt-4 text-muted-foreground">
              Principles we use when we pick products, write guides, and answer
              your questions.
            </p>
          </div>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li
                key={value.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/15">
                  <value.icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
            Our journey
          </h2>
          <p className="mt-4 text-muted-foreground">
            A short history of how Kiddvant grew with the families we serve.
          </p>
        </div>

        <ul className="mt-14 list-none space-y-0 p-0">
          {milestones.map((milestone, index) => (
            <li
              key={milestone.year}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              <div className="flex w-6 shrink-0 flex-col items-center pt-1.5">
                <span
                  className="size-3.5 shrink-0 rounded-full border-4 border-background bg-primary shadow-sm"
                  aria-hidden
                />
                {index < milestones.length - 1 ? (
                  <span
                    className="mt-2 w-px flex-1 min-h-[1.25rem] bg-border"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {milestone.year}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Stats */}
      <section className="border-t border-border bg-primary py-14 text-primary-foreground md:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-4 md:grid-cols-4 md:gap-8 md:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold tabular-nums tracking-tight text-primary-foreground md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-primary-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-20">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
            Ready to shop with intention?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Explore toys chosen for creativity, longevity, and the kind of play
            you remember long after the box is gone.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Shop the collection
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-8 py-3.5 text-sm font-semibold transition hover:bg-muted/60"
            >
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
