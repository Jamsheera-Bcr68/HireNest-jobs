import { CheckIcon } from 'lucide-react';

type Props = {
  title: string;
  items: readonly string[];
  selected: string[];
  onToggle: (v: string) => void;
  type?: string;
};

function FilterSection({ title, items, selected, onToggle, type }: Props) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
        {title}
      </h4>

      <div className="space-y-2">
        {items.map((item) => {
          const active = selected.includes(item);

          return (
            <button
              key={item}
              onClick={() => onToggle(item)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all overflow-hidden"
              style={{
                background: active ? '#eef2ff' : 'transparent',
                color: active ? '#4f46e5' : '#64748b',
                border: active
                  ? '1.5px solid #c7d2fe'
                  : '1.5px solid transparent',
              }}
            >
              <span className="truncate whitespace-nowrap">
                {item == 'partTime'
                  ? 'Part Time'
                  : item == 'fullTime'
                    ? 'Full Time'
                    : item}
                {type == 'exp' ? ' Years' : ''}
              </span>

              {active && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                  style={{ background: '#4f46e5' }}
                >
                  <CheckIcon size={12} className="text-bold" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default FilterSection;
