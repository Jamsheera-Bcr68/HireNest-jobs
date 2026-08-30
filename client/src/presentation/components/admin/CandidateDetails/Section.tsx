import { Icon, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
};
export const Section = ({ title, icon:Icon, children }: Props) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
      <span className="text-blue-700 bg-indigo-50 rounded text-lg"><Icon/></span>
      <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
        {title}
      </h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);
