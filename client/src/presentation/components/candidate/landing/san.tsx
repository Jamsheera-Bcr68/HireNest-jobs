import {
  BarChart3,
  BellRing,
  Bookmark,
  Building2,
  CheckCircle2,
  FileText,
  Filter,
  KeyRound,
  LayoutDashboard,
  ShieldCheck,
  UploadCloud,
  UserCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div
      className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="platform" className="border-b border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
        <SectionHeading
          align="left"
          eyebrow="What is HireNest"
          title="One nest for every part of the hiring journey"
          description="HireNest is a full-stack job portal built around three roles — candidates, employers, and admins. Candidates build a profile once and apply in a click. Employers publish roles and manage their pipeline. Admins keep the platform clean and trusted. Everything lives behind secure authentication, so real opportunities stay with real users."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: Users, label: "Candidates", copy: "Profiles, résumés, applications, saved roles." },
            { icon: Building2, label: "Employers", copy: "Job posting, applicant review, company page." },
            { icon: ShieldCheck, label: "Admins", copy: "Moderation, user management, platform health." },
            { icon: KeyRound, label: "Secure by design", copy: "Role-based routes and protected listings." },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-border bg-surface p-5">
              <item.icon className="size-5 text-primary" />
              <p className="mt-4 text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section className="border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Platform features"
          title="Built to make hiring feel effortless"
          description="Every feature below is part of the HireNest product — no filler, no placeholder listings."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={UserCheck}
            title="Role-based accounts"
            description="Separate candidate, employer, and admin experiences with protected routes and permissions."
          />
          <FeatureCard
            icon={Filter}
            title="Smart job search"
            description="Filter by role, location, salary range, experience level, and work type once you're signed in."
          />
          <FeatureCard
            icon={FileText}
            title="One-click applications"
            description="Apply with a stored résumé and profile, then follow each application's status in real time."
          />
          <FeatureCard
            icon={LayoutDashboard}
            title="Employer dashboard"
            description="Post and edit openings, review incoming applicants, and shortlist candidates in one view."
          />
          <FeatureCard
            icon={BarChart3}
            title="Insights that matter"
            description="See views, applicant counts, and pipeline stages so you know which roles need attention."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Admin moderation"
            description="Verify companies, remove spam postings, and keep the marketplace trustworthy."
          />
        </div>
      </div>
    </section>
  );
}

function AudienceList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function AudienceSections() {
  return (
    <>
      <section id="candidates" className="border-b border-border/60 bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="For candidates"
              title="Stop re-typing your CV for every application"
              description="Build your HireNest profile once, then browse verified openings and apply in seconds."
            />
            <AudienceList
              items={[
                "Create a profile with skills, experience, and an uploaded résumé.",
                "Search and filter roles that actually match what you want.",
                "Save jobs to a shortlist and come back when you're ready.",
                "Track every application from applied to interview to offer.",
              ]}
            />
            <Button className="mt-8">Create your candidate profile</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: UploadCloud, t: "Résumé upload", d: "Store one CV, reuse it everywhere." },
              { icon: Bookmark, t: "Saved jobs", d: "Shortlist roles you like." },
              { icon: BellRing, t: "Status updates", d: "Know where you stand." },
              { icon: Filter, t: "Precise filters", d: "Only relevant openings." },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-border bg-card p-5"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <c.icon className="size-5 text-primary" />
                <p className="mt-4 text-sm font-semibold text-foreground">{c.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="employers" className="border-b border-border/60 bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
            {[
              { icon: Building2, t: "Company profile", d: "Show who you are." },
              { icon: LayoutDashboard, t: "Job management", d: "Post, edit, close roles." },
              { icon: Users, t: "Applicant review", d: "Screen and shortlist." },
              { icon: BarChart3, t: "Hiring insights", d: "Track pipeline health." },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-border bg-card p-5"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <c.icon className="size-5 text-primary" />
                <p className="mt-4 text-sm font-semibold text-foreground">{c.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="For employers"
              title="Post a role, meet the right people"
              description="Publish openings from your company account and manage every applicant without spreadsheets."
            />
            <AudienceList
              items={[
                "Register your company and set up a public profile.",
                "Create detailed job postings with skills and salary range.",
                "Review applications with résumés attached, in one place.",
                "Move candidates through shortlist, interview, and offer stages.",
              ]}
            />
            <Button className="mt-8" variant="outline">
              Register your company
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function HowItWorksSection() {
  const flows = [
    {
      role: "Candidates",
      steps: [
        "Create your free account",
        "Complete your profile and upload a résumé",
        "Browse verified jobs and apply",
      ],
    },
    {
      role: "Employers",
      steps: [
        "Register your company account",
        "Publish a job with full details",
        "Review applicants and shortlist",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="How HireNest works"
          title="Three steps, whichever side you're on"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {flows.map((flow) => (
            <div
              key={flow.role}
              className="rounded-2xl border border-border bg-card p-7"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <h3 className="text-lg font-semibold text-foreground">{flow.role}</h3>
              <ol className="mt-6 space-y-5">
                {flow.steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="pt-1.5 text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section className="border-b border-border/60 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Why HireNest"
          title="Access you can trust, not noise you scroll past"
          description="Listings are only available to registered users, which keeps postings genuine and applications intentional."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Lockish, t: "Verified access", d: "Only signed-in users can view and apply to jobs." },
            { icon: ShieldCheck, t: "Moderated postings", d: "Admins review companies and remove spam." },
            { icon: LayoutDashboard, t: "Clear dashboards", d: "Every role gets a purpose-built workspace." },
            { icon: BellRing, t: "No dead ends", d: "Application statuses are always visible." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border bg-card p-6">
              <c.icon className="size-5 text-primary" />
              <p className="mt-4 text-sm font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lockish({ className }: { className?: string }) {
  return <KeyRound className={className} />;
}

export function CtaSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div
          className="relative overflow-hidden rounded-3xl border border-border px-8 py-14 text-center"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/10 blur-3xl" />
          <h2 className="relative text-3xl font-semibold text-foreground sm:text-4xl">
            Ready to see what's inside HireNest?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Create a free account to unlock job listings, applications, and dashboards built for your
            role.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg">Get started free</Button>
            <Button size="lg" variant="outline">
              I already have an account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
