import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type MobileRole = 'primary' | 'status' | 'actions';

interface ColumnConfig<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  mobileRender?: (item: T) => React.ReactNode;
  mobile?: MobileRole;
  icon?: React.ReactNode; // 👈 new — small icon shown next to detail rows
  width?: string;
}

export function MobileEntityList<T extends { id: string | number }>({
  columns,
  entities,
}: {
  columns: ColumnConfig<T>[];
  entities: T[];
}) {
  const [expandedIds, setExpandedIds] = useState<Set<string | number>>(new Set());

  const toggle = (id: string | number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderCol = (col: ColumnConfig<T>, entity: T) =>
    (col.mobileRender ?? col.render)(entity);

  const primaryCols = columns.filter((c) => c.mobile === 'primary');
  const statusCol = columns.find((c) => c.mobile === 'status');
  const actionsCol = columns.find((c) => c.mobile === 'actions');
  const detailCols = columns.filter((c) => !c.mobile);

  return (
    <div className="md:hidden flex flex-col gap-3 p-3">
      {entities.map((entity) => {
        const isExpanded = expandedIds.has(entity.id);
        return (
          <div
            key={entity.id}
            className={`rounded-2xl border transition-all duration-200 ${
              isExpanded
                ? 'border-indigo-200 bg-indigo-50/30 shadow-md'
                : 'border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-indigo-200'
            }`}
          >
            {/* Collapsed row — tap anywhere to expand */}
            <button
              onClick={() => toggle(entity.id)}
              className="w-full flex items-center justify-between gap-2 p-3 text-left"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {primaryCols.map((col) => (
                  <div key={col.key} className="min-w-0">
                    {renderCol(col, entity)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {statusCol && renderCol(statusCol, entity)}
                <div
                  className={`p-1.5 rounded-full transition-colors ${
                    isExpanded ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>
            </button>

            {/* Expanded details */}
            <div
              className={`grid transition-all duration-200 ease-in-out ${
                isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-3 pb-3 pt-1 border-t border-slate-100 space-y-1">
                  {detailCols.map((col) => (
                    <div
                      key={col.key}
                      className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-white/60 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        {col.icon}
                        {col.label}
                      </span>
                      <span className="text-sm text-slate-700 text-right">
                        {renderCol(col, entity)}
                      </span>
                    </div>
                  ))}
                  {actionsCol && (
                    <div className="pt-2 mt-1 border-t border-slate-100">
                      {renderCol(actionsCol, entity)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}