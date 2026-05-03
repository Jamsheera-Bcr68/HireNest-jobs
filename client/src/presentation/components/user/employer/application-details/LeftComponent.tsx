import React, { type ReactNode } from 'react';
import { appStatusStyles } from '../../../candidate/applications/ApplicationCard';
import type { ApplicationDetailsDto } from '../../../../../types/dtos/application.dto';
import { File, Mail, Phone } from 'lucide-react';

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}
type Props = {
  application: ApplicationDetailsDto;
};
const baseUrl = import.meta.env.VITE_BACKEND_URL;
function LeftComponent({ application }: Props) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="lg:col-span-2 flex flex-col gap-5">
      {/* Candidate header */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-start gap-4">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0 `}
        >
          <img
            className="w-10 h-10 rounded-full"
            src={`${baseUrl}${application.candidate.profileImg}`}
            alt={application.candidate.candidateName.charAt(0).toUpperCase()}
          />
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-semibold text-gray-900">
                {application.candidate.candidateName}
              </h2>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${appStatusStyles[application.status]}`}
              >
                {application.status}
              </span>
            </div>
            <div className="text-xs text-gray-400 shrink-0">
              Applied {application.appliedAt}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            {application.job.title}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              📍 {application.candidate.location}
            </span>

            <span className="flex items-center gap-1">
              <Mail size={14} className="text-blue-500" />
              <a
                href={`mailto:${application.candidate.email}`}
                className="text-indigo-600 hover:underline"
              >
                {application.candidate.email}
              </a>
            </span>

            <span className="flex items-center gap-1">
              <Phone size={14} className="text-green-500" />
              {application.candidate.phone}
            </span>
          </div>
          <div className="flex gap-3 mt-2 text-sm">
            <a href="#" className="text-indigo-500 hover:underline">
              🔗 LinkedIn
            </a>
            <a href="#" className="text-indigo-500 hover:underline">
              🌐 Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Resume + Cover Letter */}
      <Section title="Resume ">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold">
              <File size={14} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {application.resume.name}
              </p>
              <p className="text-xs text-gray-400">Uploaded Apr 18, 2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_BACKEND_URL}${application.resume.url}`,
                  '_blank'
                )
              }
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Preview
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {application.candidate.about}
        </p>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {application.job.skills.map((s) => (
            <span
              key={s}
              className="bg-indigo-50 text-indigo-700 text-sm px-3 py-1 rounded-full font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* Experience & Education */}
      <Section title="Experience & Education">
        {/* Experience */}
        <div className="space-y-3 mb-4">
          {application.candidate.experience.map((e, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div>
                <span className="font-medium text-gray-800">{e.role}</span>
                <span className="text-gray-400 mx-1">·</span>
                <span className="text-gray-500">{e.company}</span>
                <span className="text-gray-400 mx-1">·</span>
                <span className="text-gray-500">{e.mode}</span>
              </div>

              <span className="text-gray-400">
                {e.startYear} - {e.isWorking ? 'Present' : e.endYear}
              </span>
            </div>
          ))}
        </div>

        {/* Education (show latest only) */}
        {application.candidate.education.length > 0 && (
          <div className="border-t border-gray-100 pt-3 text-sm text-gray-600">
            🎓{' '}
            <span className="font-medium">
              {application.candidate.education[0].level}
            </span>
            {' · '}
            {application.candidate.education[0].institute}
            {' · '}
            {application.candidate.education[0].year}
          </div>
        )}
      </Section>

      {/* Screening Answers */}
      {/* <Section title="Screening Questions">
        <div className="space-y-4">
          {application.screeningAnswers.map((qa, i) => (
            <div key={i}>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Q{i + 1}. {qa.q}
              </p>
              <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                {qa.a}
              </p>
            </div>
          ))}
        </div>
      </Section> */}

      {/* Internal Notes */}
      {/* <Section title="Internal Notes (visible to your team only)">
        <div className="space-y-3 mb-4">
          {notes.map((n, i) => (
            <div
              key={i}
              className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm"
            >
              <div className="flex justify-between mb-1">
                <span className="font-medium text-amber-800">{n.author}</span>
                <span className="text-amber-500 text-xs">{n.time}</span>
              </div>
              <p className="text-amber-900">{n.text}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
            placeholder="Add a team note..."
            className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={addNote}
            className="px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition"
          >
            Add
          </button>
        </div>
      </Section> */}
    </div>
  );
}

export default LeftComponent;
