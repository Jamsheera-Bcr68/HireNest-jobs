import { Star } from 'lucide-react';
const employerTeam = '/emp_landing.jpg';
const testimonials = [
  {
    name: 'Rachel Kim',
    role: 'HR Director, TechVault',
    quote:
      'HireFlow cut our time-to-hire by 40%. The candidate management tools are incredibly intuitive.',
    rating: 5,
  },
  {
    name: 'David Martinez',
    role: 'CEO, StartupNest',
    quote:
      "We went from 0 to a team of 25 in just 3 months. Best hiring platform we've ever used.",
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Talent Lead, FinEdge',
    quote:
      'The verified profiles feature gave us confidence in every hire. Absolutely recommend it.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={employerTeam}
                alt="Happy team"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Testimonials
            </span>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Trusted by Thousands of Employers
            </h2>
            <div className="mt-10 space-y-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-warning text-warning"
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-foreground leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="mt-4">
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
