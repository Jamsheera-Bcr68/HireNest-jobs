import type { LucideIcon } from 'lucide-react';
import { type ISidebarProps } from '../../../constants/interfaces/SidebarProps';
export const SideBox = ({ text, isActive }: ISidebarProps) => {
  let classname = isActive
    ? 'w-4/5 ml-5 h-10 grid place-items-center mt-4 sidebox sidebox-active'
    : 'w-4/5 ml-5 h-10 grid place-items-center mt-4 sidebox';
  return <div className={classname}>{text}</div>;
};


 export function StatTile({ icon: Icon, label, value }:{icon:LucideIcon,label:string,value:string}) {
  return (
    <div className="vc-stat">
      <div className="flex items-center justify-between">
        <span className="vc-stat-icon">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-[26px] font-semibold leading-none tracking-tight" style={{ color: "var(--ink)" }}>
          {value !== undefined ? value : "—"}
        </span>
      </div>
      <p className="mt-3 text-xs font-medium" style={{ color: "var(--ink-faint)" }}>
        {label}
      </p>
    </div>
  );
}