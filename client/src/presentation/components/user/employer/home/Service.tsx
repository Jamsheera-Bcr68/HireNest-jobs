import { Search, FileText, Users, BarChart3, Shield, Zap } from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'Smart Job Posting',
    description:
      'Post jobs across multiple platforms with a single click. Reach millions of qualified candidates instantly.',
  },
  {
    icon: Users,
    title: 'Candidate Management',
    description:
      'Track, filter, and manage applicants with our intuitive dashboard. Never lose sight of top talent.',
  },
  {
    icon: FileText,
    title: 'Resume Screening',
    description:
      'AI-powered resume parsing and ranking to help you shortlist the best candidates in minutes.',
  },
  {
    icon: BarChart3,
    title: 'Hiring Analytics',
    description:
      'Get detailed insights on your hiring pipeline, time-to-hire, and recruitment ROI.',
  },
  {
    icon: Shield,
    title: 'Verified Profiles',
    description:
      'All candidates go through background verification ensuring you hire trusted professionals.',
  },
  {
    icon: Zap,
    title: 'Quick Interviews',
    description:
      'Schedule and conduct video interviews directly on the platform. No third-party tools needed.',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray/20 sm:py-28">
      <div className="mx-auto max-w-7xl bg-white px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl font-bold text-grey-400 sm:text-4xl">
            Everything You Need to Hire Smarter
          </h2>
          <p className="mt-4 text-lg text-grey-300">
            Powerful tools and services designed to simplify your entire
            recruitment process.
          </p>
        </div>
        <div className="mt-16 bg-white-100 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl bg-white border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-teal/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal-600 transition-colors group-hover:bg-teal-100 hover:text-white">
                <service.icon className="h-6 w-6 " />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
