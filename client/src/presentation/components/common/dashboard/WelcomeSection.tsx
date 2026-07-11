import { Sparkles } from 'lucide-react';

type WelcomeProps = {
  today: string;
  greeting: string;
  name: string;
};
function WelcomeSection({ today, greeting, name }: WelcomeProps) {
  return (
    <div className="rise flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
      <div>
        <p className="text-xs font-medium text-teal-700 mb-1.5">{today}</p>
        <h1 className="font-display text-[28px] sm:text-[32px] font-semibold tracking-tight text-slate-900">
          {greeting}, {name}
        </h1>
        <p className="text-sm text-slate-500 mt-1.5 flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-500" />
          Take a look how your performance in this Platfoam
        </p>
      </div>
    </div>
  );
}

export default WelcomeSection;
