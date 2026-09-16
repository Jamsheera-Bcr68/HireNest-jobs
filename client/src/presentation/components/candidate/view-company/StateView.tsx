import { ArrowLeft, Building2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

export const LoadingPlaceHolder = () => {
  const { t } = useTheme();
  return (
    <div
      className={`min-h-screen ${t.pageBg} transition-colors duration-300`}
      aria-busy="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <div
          className={`rounded-3xl border ${t.surfaceBorder} ${t.cardBg} px-6 py-12 sm:px-10 sm:py-14 flex flex-col items-center`}
        >
          <Pulse className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl" />
          <Pulse className="mt-5 h-7 w-56" />
          <Pulse className="mt-3 h-4 w-80 max-w-full" />
          <div className="mt-5 flex gap-4">
            <Pulse className="h-4 w-24" />
            <Pulse className="h-4 w-24" />
            <Pulse className="h-4 w-24" />
          </div>
          <div className="mt-7 flex gap-3">
            <Pulse className="h-10 w-36 rounded-xl" />
            <Pulse className="h-10 w-32 rounded-xl" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${t.cardBorder} ${t.cardBg} p-4`}
            >
              <Pulse className="h-9 w-9 rounded-xl" />
              <Pulse className="mt-3 h-3 w-16" />
              <Pulse className="mt-2 h-4 w-24" />
            </div>
          ))}
        </div>
        <div>
          <Pulse className="h-5 w-48" />
          <Pulse className="mt-3 h-3 w-full" />
          <Pulse className="mt-2 h-3 w-full" />
          <Pulse className="mt-2 h-3 w-2/3" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${t.cardBorder} ${t.cardBg} p-6`}
            >
              <Pulse className="h-10 w-10 rounded-xl" />
              <Pulse className="mt-4 h-4 w-28" />
              <Pulse className="mt-2 h-3 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function ErrorPlaceHolder() {
  const { t } = useTheme();
  return (
    <div
      className={`min-h-screen ${t.pageBg} flex items-center justify-center px-4 transition-colors duration-300`}
    >
      <div className="text-center max-w-sm">
        <div
          className={`mx-auto h-14 w-14 rounded-2xl flex items-center justify-center ${t.emptyIconBg}`}
        >
          <Building2 className={`h-6 w-6 ${t.emptyIconText}`} />
        </div>
        <h1 className={`mt-4 text-lg font-semibold ${t.heading}`}>
          Company profile unavailable
        </h1>
        <p className={`mt-2 text-sm ${t.subheading}`}>
          We couldn't load this company's profile right now. It may no longer be
          available.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${t.secondaryButton} ${t.secondaryButtonHover}`}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Job
          </button>
          <button
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${t.primaryButton} ${t.primaryButtonHover}`}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export function Pulse({ className = '' }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/70 dark:bg-slate-800/70 ${className}`}
    />
  );
}
