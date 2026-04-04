import React, { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
function SectionTitle({ children }: Props) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        {children}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

export default SectionTitle;
