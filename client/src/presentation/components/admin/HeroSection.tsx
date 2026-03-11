import { Plus } from 'lucide-react';

type Props = {
  title: string;
  tagline: string;
  buttonText: string;
};
function HeroSection({ title, tagline, buttonText }: Props) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{tagline}</p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
