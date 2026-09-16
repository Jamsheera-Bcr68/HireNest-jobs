import { ArrowLeft, Briefcase } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { PrimaryButton } from './Common';

export const JobDetailsSkeleton = () => {
  const { t } = useTheme();
  return (
    <div className={`min-h-screen ${t.pageBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 animate-pulse">
        <div className={`h-4 w-24 ${t.skeletonBg} rounded mb-6`} />
        <div
          className={`rounded-2xl sm:rounded-3xl border ${t.surfaceBorder} p-5 sm:p-7 lg:p-8 mb-6 lg:mb-8 ${t.surface}`}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl ${t.skeletonBg} flex-shrink-0`}
            />
            <div className="flex-1 w-full space-y-3">
              <div
                className={`h-6 w-2/3 mx-auto sm:mx-0 ${t.skeletonBg} rounded`}
              />
              <div
                className={`h-4 w-1/3 mx-auto sm:mx-0 ${t.skeletonBg} rounded`}
              />
              <div className="flex gap-2 justify-center sm:justify-start">
                <div className={`h-6 w-20 ${t.skeletonBg} rounded-full`} />
                <div className={`h-6 w-20 ${t.skeletonBg} rounded-full`} />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-2xl border ${t.surfaceBorder} p-5 sm:p-6 ${t.surface}`}
              >
                <div className={`h-5 w-1/3 ${t.skeletonBg} rounded mb-4`} />
                <div className="space-y-2">
                  <div
                    className={`h-3 w-full ${t.skeletonBg} rounded opacity-70`}
                  />
                  <div
                    className={`h-3 w-11/12 ${t.skeletonBg} rounded opacity-70`}
                  />
                  <div
                    className={`h-3 w-4/5 ${t.skeletonBg} rounded opacity-70`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className={`hidden lg:block rounded-2xl border ${t.surfaceBorder} p-5 sm:p-6 h-64 ${t.surface}`}
          />
        </div>
      </div>
    </div>
  );
};

export const JobDetailsError = ({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) => {
  const { t } = useTheme();
  return (
    <div
      className={`min-h-[80vh] ${t.pageBg} flex items-center justify-center px-4`}
    >
      <div className="text-center max-w-sm w-full">
        <div
          className={`w-16 h-16 rounded-2xl ${t.errorIconBg} border ${t.errorIconBorder} flex items-center justify-center mx-auto mb-4`}
        >
          <Briefcase size={26} className={t.errorIconText} />
        </div>
        <h2 className={`text-lg font-semibold mb-1 ${t.heading}`}>
          Job not found
        </h2>
        <p className={`text-[13px] mb-5 break-words ${t.subheading}`}>
          {message}
        </p>
        <div className="flex justify-center">
          <PrimaryButton className='' onClick={onBack}>
            <ArrowLeft size={14} />
            Back to Jobs
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

