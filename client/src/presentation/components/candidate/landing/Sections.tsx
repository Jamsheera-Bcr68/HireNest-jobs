import { HoverBox } from './HoverBox';
import {
  FeatureCard,
  TrackStep,
  WhyCard,
  CtaPanel,
  TrustBadge,
  FooterLink,
} from './Components';
import {
  Search,
  UserCircle2,
  Building2,
  ClipboardList,
  CalendarClock,
  ShieldCheck,
} from 'lucide-react';
import type { UserProfileType } from '../../../../types/dtos/user.types';
import type { UserRole } from '../../../../constants/types/user';

import { Eyebrow, Button } from './Components';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../../../../shared/toast/use-toast';
import { useNavigate } from 'react-router-dom';
const display = { fontFamily: "'Fraunces', serif" };

const mono = { fontFamily: "'JetBrains Mono', monospace" };
export function Hirenest() {
  return (
    <section
      id="what"
      className="scroll-mt-24 border-y border-[#E3DDCE] bg-white"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-20 lg:px-8">
        {/* Image: below the text on mobile, left on desktop */}
        <HoverBox className="order-2 aspect-[4/3] w-full overflow-hidden border-0 md:order-1 md:aspect-auto md:h-72 lg:h-80">
          <img
            src="/hero1.jpg"
            alt="A candidate using HireNest to search for jobs"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </HoverBox>

        <div className="order-1 text-center md:order-2 md:text-left">
          <Eyebrow>What Is HireNest?</Eyebrow>

          <h2
            className="mb-3 text-2xl text-[#12302B] sm:text-3xl md:mb-4 md:text-4xl"
            style={{ ...display, fontWeight: 600 }}
          >
            One Platform. Two Journeys.
          </h2>

          <p className="text-base leading-relaxed text-[#12302B]/70 md:text-lg">
            HireNest is a modern hiring platform built to simplify the job
            search and recruitment process. Candidates can build a profile,
            discover relevant opportunities, and manage applications — while
            employers can post jobs, evaluate candidates, and manage hiring, all
            in one place.
          </p>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Search,
    title: 'Smart Job Discovery',
    desc: 'Browse and filter opportunities tailored to your skills, location, and preferences.',
  },
  {
    icon: UserCircle2,
    title: 'Candidate Profiles',
    desc: 'Build a profile that highlights your experience, skills, and career goals.',
  },
  {
    icon: Building2,
    title: 'Employer Job Posting',
    desc: 'Create and manage listings with full control over requirements and visibility.',
  },
  {
    icon: ClipboardList,
    title: 'Application Tracking',
    desc: "Candidates and employers track every application's status in real time.",
  },
  {
    icon: CalendarClock,
    title: 'Interview Scheduling',
    desc: 'Coordinate interviews directly on the platform — no email back-and-forth.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    desc: 'Role-based access with secure login for candidates, employers, and admins.',
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mb-8 max-w-xl md:mb-12">
        <Eyebrow>Services</Eyebrow>

        <h2
          className="mb-3 text-2xl text-[#12302B] sm:text-3xl md:text-4xl"
          style={{ ...display, fontWeight: 600 }}
        >
          Everything You Need to Hire or Get Hired
        </h2>

        <p className="text-base text-[#12302B]/65 md:text-lg">
          A complete toolkit for both sides of the hiring process.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}

const candidatePoints = [
  'Create a profile that showcases your skills and experience',
  'Upload and manage your resume',
  'Discover jobs that match your goals',
  'Apply in a few clicks',
  "Track every application's status",
  'Get scheduled for interviews directly on the platform',
];

type Props = {
  user?: UserProfileType | null;
  role?: UserRole;
};
export function ForCandidates({ user, role }: Props) {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user || !role) {
      showToast({ msg: 'Please login', type: 'error' });
      return;
    }
    navigate(`/${role}/profile`);
  };

  return (
    <section
      id="candidates"
      className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-20 lg:px-8"
    >
      <div>
        <Eyebrow>For Candidates</Eyebrow>

        <h2
          className="mb-3 text-2xl text-[#12302B] sm:text-3xl md:text-4xl"
          style={{ ...display, fontWeight: 600 }}
        >
          Built for Job Seekers
        </h2>

        <p className="mb-6 text-base text-[#12302B]/65 md:text-lg">
          HireNest makes it easy to go from searching to hired.
        </p>

        <ul className="space-y-3">
          {candidatePoints.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 text-sm text-[#12302B] sm:text-base"
            >
              <CheckCircle2
                size={18}
                color="#2F6F63"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div onClick={handleClick}>
          <Button
            bg="rgb(35, 118, 103)"
            color="#F7F4EC"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium sm:w-auto"
          >
            Create Your Candidate Profile
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>

      <HoverBox className="aspect-[4/3] w-full overflow-hidden border-0 md:aspect-auto md:h-72 lg:h-80">
        <img
          src="/hero3.jpg"
          alt="A candidate managing their HireNest profile"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </HoverBox>
    </section>
  );
}

const employerPoints = [
  'Create a company profile',
  'Post job openings in minutes',
  'Review and filter candidate applications',
  'Shortlist and schedule interviews',
  'Manage your entire hiring pipeline in one dashboard',
];
export function ForEmployers({ user }: Props) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleClick = () => {
    if (!user) {
      showToast({ msg: 'Please login', type: 'error' });
      return;
    }
    navigate('/company');
  };

  return (
    <section id="employers" className="scroll-mt-24 bg-[#12302B]">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-20 lg:px-8">
        {/* Image: below the text on mobile, left on desktop */}
        <HoverBox className="order-2 aspect-[4/3] w-full overflow-hidden border-0 md:order-1 md:aspect-auto md:h-72 lg:h-80">
          <img
            src="/hero2.jpg"
            alt="An employer reviewing candidates on HireNest"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </HoverBox>

        <div className="order-1 md:order-2">
          <Eyebrow tone="gold">For Employers</Eyebrow>

          <h2
            className="mb-3 text-2xl text-[#F7F4EC] sm:text-3xl md:text-4xl"
            style={{ ...display, fontWeight: 600 }}
          >
            Built for Employers &amp; Companies
          </h2>

          <p className="mb-6 text-base text-[#F7F4EC]/70 md:text-lg">
            Post, review, and hire — without the hiring chaos.
          </p>

          <ul className="space-y-3">
            {employerPoints.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm text-[#F7F4EC] sm:text-base"
              >
                <CheckCircle2
                  size={18}
                  color="#D2992B"
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div onClick={handleClick}>
            <Button
              bg="#D2992B"
              color="#12302B"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium sm:w-auto"
            >
              Post a Job as an Employer
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const candidateSteps = [
  'Register',
  'Build Profile',
  'Discover Jobs',
  'Apply',
  'Interview',
];
const employerSteps = [
  'Register',
  'Company Profile',
  'Post Job',
  'Review Applications',
  'Interview',
];

export function Working() {
  return (
    <section className="max-w-6xl mx-auto pt-4 px-6 py-20 bg-[#2F6F63]/10">
      <div className="max-w-xl mb-14">
        <Eyebrow>Process</Eyebrow>
        <h2
          className="text-3xl mb-3"
          style={{ ...display, fontWeight: 600, color: '#12302B' }}
        >
          How HireNest Works
        </h2>
        <p style={{ color: 'rgba(18,48,43,0.65)' }}>
          Two journeys, one destination — a great hire.
        </p>
      </div>

      <div className="space-y-10">
        {/* Candidate track */}
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            {candidateSteps.map((s, i) => (
              <TrackStep key={s} index={i + 1} label={s} tone="teal" />
            ))}
          </div>
          <div
            className="h-px w-full"
            style={{ backgroundColor: '#2F6F63', opacity: 0.35 }}
          />
        </div>

        {/* Employer track */}
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            {employerSteps.map((s, i) => (
              <TrackStep key={s} index={i + 1} label={s} tone="gold" />
            ))}
          </div>
          <div
            className="h-px w-full"
            style={{ backgroundColor: '#D2992B', opacity: 0.35 }}
          />
        </div>
      </div>

      <p
        className="mt-8 text-sm"
        style={{ ...mono, color: 'rgba(18,48,43,0.45)' }}
      >
        Both tracks converge at Interview — where hiring actually happens.
      </p>
    </section>
  );
}

const whyChoose = [
  {
    title: 'Role-Based Experience',
    desc: 'Tailored dashboards for candidates, employers, and admins.',
  },
  {
    title: 'Centralized Hiring Process',
    desc: 'From application to interview, everything happens in one place.',
  },
  {
    title: 'Real-Time Application Tracking',
    desc: 'No more wondering where you stand.',
  },
  {
    title: 'Secure & Reliable',
    desc: 'Built with modern authentication and data-protection practices.',
  },
  {
    title: 'Simple, Focused Design',
    desc: 'No clutter — just the tools you need to hire or get hired.',
  },
];
export function Properties() {
  return (
    <section
      id="why"
      className="scroll-mt-24 border-y border-[#E3DDCE] bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-8 max-w-xl md:mb-12">
          <Eyebrow>Why HireNest</Eyebrow>
          <h2
            className="text-2xl text-[#12302B] sm:text-3xl md:text-4xl"
            style={{ ...display, fontWeight: 600 }}
          >
            Why Choose HireNest?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:gap-y-10 lg:grid-cols-3">
          {whyChoose.map((w, i) => (
            <WhyCard
              key={w.title}
              index={i + 1}
              title={w.title}
              desc={w.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const trustBadges = [
  { icon: ShieldCheck, label: 'Secure Authentication' },
  { icon: UserCircle2, label: 'Candidate-Focused Design' },
  { icon: Building2, label: 'Employer-Friendly Tools' },
  { icon: ClipboardList, label: 'Streamlined Hiring' },
  { icon: CheckCircle2, label: 'Easy Application Management' },
];
export function HighLights() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <Eyebrow>
          <span className="mx-auto">Designed With Purpose</span>
        </Eyebrow>
        <h2
          className="text-2xl"
          style={{ ...display, fontWeight: 600, color: '#12302B' }}
        >
          Built the Right Way, Not Just Fast
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {trustBadges.map((b) => (
          <TrustBadge key={b.label} icon={b.icon} label={b.label} />
        ))}
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section style={{ backgroundColor: '#12302B' }}>
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2
          className="text-3xl md:text-4xl mb-10"
          style={{ ...display, fontWeight: 600, color: '#F7F4EC' }}
        >
          Ready to Get Started?
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <CtaPanel prompt="Looking for your next opportunity?">
            <Button
              bg="#F7F4EC"
              color="#600f74"
              className="w-full px-5 py-3 rounded-sm text-sm font-medium"
            >
              Join as a Candidate
            </Button>
          </CtaPanel>
          <CtaPanel prompt="Looking for the right talent?">
            <Button
              bg="#D2992B"
              color="#7617be"
              className="w-full px-5 py-3 rounded-sm text-sm font-medium"
            >
              Join as an Employer
            </Button>
          </CtaPanel>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0E2622' }}>
      <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#D2992B' }}
            >
              <span
                style={{
                  ...display,
                  color: '#12302B',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                H
              </span>
            </div>
            <span style={{ ...display, fontWeight: 600, color: '#F7F4EC' }}>
              HireNest
            </span>
          </div>
          <p className="text-sm" style={{ color: 'rgba(247,244,236,0.55)' }}>
            Connecting Talent with Opportunity
          </p>
        </div>

        <div>
          <p
            style={{ ...mono, fontSize: 11, color: 'rgba(247,244,236,0.4)' }}
            className="mb-3 uppercase tracking-widest"
          >
            Platform
          </p>
          <ul className="space-y-2 text-sm">
            <FooterLink>About</FooterLink>
            <FooterLink>Features</FooterLink>
            <FooterLink>For Candidates</FooterLink>
            <FooterLink>For Employers</FooterLink>
          </ul>
        </div>

        <div>
          <p
            style={{ ...mono, fontSize: 11, color: 'rgba(247,244,236,0.4)' }}
            className="mb-3 uppercase tracking-widest"
          >
            Legal
          </p>
          <ul className="space-y-2 text-sm">
            <FooterLink>Privacy Policy</FooterLink>
            <FooterLink>Terms of Service</FooterLink>
          </ul>
        </div>

        <div>
          <p
            style={{ ...mono, fontSize: 11, color: 'rgba(247,244,236,0.4)' }}
            className="mb-3 uppercase tracking-widest"
          >
            Contact
          </p>
          <ul
            className="space-y-2 text-sm"
            style={{ color: 'rgba(247,244,236,0.7)' }}
          >
            <li>hello@hirenest.app</li>
          </ul>
        </div>
      </div>
      <div
        className="max-w-6xl mx-auto px-6 py-5 border-t flex flex-col sm:flex-row justify-between gap-2 text-xs"
        style={{
          borderColor: 'rgba(247,244,236,0.1)',
          color: 'rgba(247,244,236,0.45)',
        }}
      >
        <span>© 2026 HireNest. All rights reserved.</span>
        <span style={mono}>Built with the MERN stack</span>
      </div>
    </footer>
  );
}
