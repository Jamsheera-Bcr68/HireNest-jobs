import type { JobCardDto } from '../../../types/dtos/job.dto';
import { formatSalary } from '../../../utils/salary-format';

import { Users, Briefcase, Clock, MapPin, Bookmark, Check } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { StateType } from '../../../constants/types/user';

import { useState } from 'react';
import { cx } from './jobListing/ListingContainter';
import { useNavigate } from 'react-router-dom';
import { useTheme}from '../../../contexts/ThemeContext'

type JobCardProps = {
  job: JobCardDto;
  
  handleSave: (id: string) => Promise<void>;
  handleUnSave: (id: string) => Promise<void>;
};

const JobCard = ({ job, handleSave, handleUnSave }: JobCardProps) => {
  const user = useSelector((state: StateType) => state.auth.user);

  const isSaved: boolean = !!user?.savedJobs?.includes(job.id);
  const isApplied: boolean = !!user?.appliedJobs?.includes(job.id);

  const VISIBLE_SKILLS = 2;
  const extraSkills = Math.max(0, job.skills.length - VISIBLE_SKILLS);
  const navigate = useNavigate();

const {t}=useTheme()
  return (
  <div
    className={`
      max-w-sm w-full rounded-3xl
      ${t.cardBg}
      border ${t.cardBorder}
      hover:border ${t.cardHoverBorder}
      overflow-hidden
      transition-all duration-300
      hover:-translate-y-1.5 hover:shadow-xl
    `}
  >
    {/* Top accent bar */}
    <div className="h-2.5 bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 rounded-t-3xl" />

    <div className="p-5">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">

          {/* Company Logo */}
          <div
            className={`
              w-11 h-11 rounded-xl
              ${t.metaBadgeBg}
              border ${t.cardBorder}
              flex items-center justify-center
              overflow-hidden flex-shrink-0
            `}
          >
            <CompanyLogo
              name={job.companyName}
              src={job.companyLogo}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2
                className={`
                  text-[15px] font-medium
                  ${t.cardTitle}
                  leading-tight
                `}
              >
                {job.title}
              </h2>

              {/* Applied */}
              {isApplied && (
                <span
                  className={`
                    inline-flex items-center gap-1
                    text-[11px]
                    ${t.appliedBg}
                    ${t.appliedText}
                    border ${t.appliedBorder}
                    rounded-full px-2 py-0.5
                    font-medium
                  `}
                >
                  <Check size={11} />
                  Applied
                </span>
              )}
            </div>

            <p
              className={`
                text-[13px]
                ${t.companyName}
                mt-0.5
              `}
            >
              {job.companyName}
            </p>
          </div>
        </div>

        {/* Bookmark */}
        <button
          type="button"
          aria-label={
            isSaved
              ? "Remove from saved jobs"
              : "Save job"
          }
          onClick={(e) => {
            e.stopPropagation();

            isSaved
              ? handleUnSave(job.id)
              : handleSave(job.id);
          }}
          className={`
            p-2 rounded-full
            ${t.navIconBg}
            transition-colors
            mt-0.5
          `}
        >
          <Bookmark
            size={18}
            className={
              isSaved
                ? "text-red-700"
                : t.iconMuted
            }
            fill={
              isSaved
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">

        {/* Location */}
        <span
          className={`
            inline-flex items-center gap-1.5
            text-[12px]
            ${t.filterBg}
            ${t.filterText}
            border ${t.filterBorder}
            rounded-full px-3 py-1
          `}
        >
          <MapPin size={12} />
          {job.location.state}, {job.location.country}
        </span>

        {/* Mode */}
        <span
          className={`
            inline-flex items-center gap-1.5
            text-[12px]
            ${t.filterBg}
            ${t.filterText}
            border ${t.filterBorder}
            rounded-full px-3 py-1
          `}
        >
          <Briefcase size={12} />
          {job.mode}
        </span>

        {/* Job Type */}
        <span
          className={`
            inline-flex items-center gap-1.5
            text-[12px]
            ${t.filterBg}
            ${t.filterText}
            border ${t.filterBorder}
            rounded-full px-3 py-1
          `}
        >
          <Clock size={12} />
          {job.jobType}
        </span>

        {/* Experience */}
        <span
          className={`
            inline-flex items-center gap-1.5
            text-[12px]
            ${t.filterBg}
            ${t.filterText}
            border ${t.filterBorder}
            rounded-full px-3 py-1
          `}
        >
          <Clock size={12} />
          {job.experience} years
        </span>
      </div>

      {/* Salary + Vacancy */}
      <div className="flex items-center justify-between mb-4">

        <p
          className={`
            text-[13px]
            font-medium
            ${t.salaryText}
          `}
        >
          {formatSalary(
            job.min_salary,
            job.max_salary
          )}
        </p>

        {job.vacancyCount !== undefined && (
          <span
            className={`
              inline-flex items-center gap-1.5
              text-[12px]
              ${t.vacancyBg}
              ${t.vacancyText}
              border ${t.vacancyBorder}
              rounded-full px-3 py-1
              font-medium
            `}
          >
            <Users size={12} />

            {job.vacancyCount}{" "}
            {Number(job.vacancyCount) === 1
              ? "vacancy"
              : "vacancies"}
          </span>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills
          .slice(0, VISIBLE_SKILLS)
          .map((s) => (
            <SkillChip
              key={s}
              label={s}
            />
          ))}

        {extraSkills > 0 && (
          <SkillChip
            label={`+${extraSkills}`}
          />
        )}
      </div>

      {/* Deadline */}
      {job.lastDate && (
        <div
          className={`
            flex items-center gap-2
            mt-2
            ${t.deadlineBg}
            border ${t.deadlineBorder}
            rounded-xl
            px-3 py-1
            mb-4
          `}
        >
          <span
            className={`
              text-[12px]
              ${t.deadlineText}
              mt-2
              font-medium
            `}
          >
            Application deadline
          </span>

          <span
            className={`
              text-[12px]
              ${t.deadlineDate}
              font-medium
              ml-auto
            `}
          >
            {new Date(job.lastDate).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            )}
          </span>
        </div>
      )}

      {/* Footer */}
      <div
        className={`
          border-t ${t.dividerH}
          pt-2 
          flex items-center
          justify-between gap-2
        `}
      >
        {/* Posted Date */}
        <span
          className={`
            text-[12px]
            ${t.footerText}
            whitespace-nowrap
          `}
        >
          Posted:{" "}
          {job?.createdAt
            ? new Date(
                job.createdAt
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : ""}
        </span>

        {/* View Button */}
        <button
          onClick={() =>
            navigate(`/jobs/${job.id}`)
          }
          type="button"
          className={`
            px-4 py-1.5
            text-[13px]
            font-medium
            rounded-lg
            transition-colors

            ${t.filterActiveText}
            ${t.filterActiveBorder}
            border-2

            ${t.viewHover}
          `}
        >
          View
        </button>
      </div>

    </div>
  </div>
);
  // return (
  //   <div className="max-w-sm w-full rounded-3xl bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
  //     {/* Top accent bar */}
  //     <div className="h-2.5 bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 rounded-t-3xl" />

  //     <div className="p-5">
  //       {/* Header: logo + title + wishlist */}
  //       <div className="flex items-start justify-between mb-4">
  //         <div className="flex items-center gap-3">
  //           <div className="w-11 h-11 rounded-xl bg-fuchsia-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
  //             <CompanyLogo name={job.companyName} src={job.companyLogo} />
  //           </div>
  //           <div>
  //             <div className="flex items-center gap-2">
  //               <h2 className="text-[15px] font-medium text-gray-900 leading-tight">
  //                 {job.title}
  //               </h2>
  //               {isApplied && (
  //                 <span className="inline-flex items-center gap-1 text-[11px] bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5 font-medium">
  //                   <Check size={11} />
  //                   Applied
  //                 </span>
  //               )}
  //             </div>
  //             <p className="text-[13px] text-gray-500 mt-0.5">
  //               {job.companyName}
  //             </p>
  //           </div>
  //         </div>

  //         <button
  //           type="button"
  //           aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             isSaved ? handleUnSave(job.id) : handleSave(job.id);
  //           }}
  //           className="p-2 rounded-full hover:bg-gray-200 transition-colors mt-0.5"
  //         >
  //           <Bookmark
  //             size={18}
  //             className={isSaved ? 'text-red-700' : 'text-gray-400'}
  //             fill={isSaved ? 'currentColor' : 'none'}
  //           />
  //         </button>
  //       </div>

  //       {/* Tags */}
  //       <div className="flex flex-wrap gap-2 mb-4">
  //         <span className="inline-flex items-center gap-1.5 text-[12px] bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1">
  //           <MapPin size={12} />
  //           {job.location.state}, {job.location.country}
  //         </span>
  //         <span className="inline-flex items-center gap-1.5 text-[12px] bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1">
  //           <Briefcase size={12} />
  //           {job.mode}
  //         </span>
  //         <span className="inline-flex items-center gap-1.5 text-[12px] bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1">
  //           <Clock size={12} />
  //           {job.jobType}
  //         </span>
  //         <span className="inline-flex items-center gap-1.5 text-[12px] bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1">
  //           <Clock size={12} />
  //           {job.experience} years
  //         </span>
  //       </div>

  //       {/* Salary + Vacancy */}
  //       <div className="flex items-center justify-between mb-4">
  //         <p className="text-[13px] font-medium text-gray-800">
  //           {formatSalary(job.min_salary, job.max_salary)}
  //         </p>
  //         {job.vacancyCount !== undefined && (
  //           <span className="inline-flex items-center gap-1.5 text-[12px] bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 font-medium">
  //             <Users size={12} />
  //             {job.vacancyCount}{' '}
  //             {Number(job.vacancyCount) === 1 ? 'vacancy' : 'vacancies'}
  //           </span>
  //         )}
  //       </div>

  //       {/* Skills */}
  //       {/* <div className="flex flex-wrap gap-1.5 mb-4">
  //         {job.skills.map((skill, index) => (
  //           <span
  //             key={`${skill}-${index}`}
  //             className="text-[12px] px-3 py-1 rounded-full bg-fuchsia-50 text-fuchsia-700 font-medium"
  //           >
  //             {skill}
  //           </span>
  //         ))}
  //       </div> */}
  //       <div className="flex flex-wrap gap-1.5">
  //         {job.skills.slice(0, VISIBLE_SKILLS).map((s) => (
  //           <SkillChip key={s} label={s} />
  //         ))}
  //         {extraSkills > 0 && <SkillChip label={`+${extraSkills}`} />}
  //       </div>

  //       {/* Deadline banner */}
  //       {job.lastDate && (
  //         <div className="flex items-center gap-2 mt-2  bg-orange-50 border border-orange-200 rounded-xl px-3 py-1 mb-4">
  //           <span className="text-[12px] text-orange-800 mt-2 font-medium">
  //             Application deadline
  //           </span>
  //           <span className="text-[12px] text-orange-600 font-medium ml-auto">
  //             {new Date(job.lastDate).toLocaleDateString('en-US', {
  //               month: 'short',
  //               day: 'numeric',
  //               year: 'numeric',
  //             })}
  //           </span>
  //         </div>
  //       )}

  //       {/* Footer */}
  //       <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-2">
  //         <span className="text-[12px] text-gray-400 whitespace-nowrap">
  //           Posted:{' '}
  //           {job?.createdAt
  //             ? new Date(job.createdAt).toLocaleDateString('en-US', {
  //                 month: 'short',
  //                 day: 'numeric',
  //                 year: 'numeric',
  //               })
  //             : ''}
  //         </span>

  //         <button
  //           onClick={() => navigate(`/jobs/${job.id}`)}
  //           type="button"
  //           className=" hover:bg-fuchsia-100 px-4 py-1.5 text-fuchsia-800 border border-3 border-fuchsia-800 text-[13px] font-medium rounded-lg transition-colors"
  //         >
  //           View
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default JobCard;

function CompanyLogo({ src, name }: { src: string; name: string }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { t } = useTheme();
  const [broken, setBroken] = useState(false);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (src) {
    return (
      <img
        src={`${backendUrl}${src}`}
        alt={name}
        onError={() => setBroken(true)}
        className={cx(
          'h-11 w-11 sm:h-12 sm:w-12 rounded-xl object-cover ring-1 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5',
          t.surface,
          t.surfaceBorder
        )}
      />
    );
  }
  return (
    <div
      className={cx(
        'h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-xl flex items-center justify-center font-semibold text-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5',
        t.metaBadgeBg,
        t.metaBadgeText,
        'ring-1',
        t.metaBadgeBorder
      )}
    >
      {initials}
    </div>
  );
}

function SkillChip({ label }: { label: string }) {
  const { t } = useTheme();
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        t.skillChipBg,
        t.skillChipText,
        t.skillChipBorder
      )}
    >
      {label}
    </span>
  );
}
