import { UserPlus, Building2, ClipboardCheck, Rocket } from 'lucide-react';

const employerReview = '/review.jpg';
const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Create Your Account',
    description:
      'Sign up for free and set up your employer profile with company details and branding.',
  },
  {
    number: '02',
    icon: Building2,
    title: 'Set Up Company Profile',
    description:
      'Add your company logo, description, culture, benefits, and team photos to attract top talent.',
  },
  {
    number: '03',
    icon: ClipboardCheck,
    title: 'Post Your First Job',
    description:
      'Create detailed job listings with requirements, salary range, and perks. Publish in seconds.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Start Hiring',
    description:
      'Review applications, schedule interviews, and make offers — all from your dashboard.',
  },
];

const Steps = () => {
  return (
    <section className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Become an Employer in 4 Simple Steps
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Getting started is easy. Set up your account, post jobs, and find
              the perfect candidates.
            </p>
            <div className="mt-10 space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={employerReview}
                alt="Employer reviewing candidates"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border bg-card p-5 shadow-lg sm:block">
              <p className="text-3xl font-bold text-accent">10k+</p>
              <p className="text-sm text-muted-foreground">Companies Hiring</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
