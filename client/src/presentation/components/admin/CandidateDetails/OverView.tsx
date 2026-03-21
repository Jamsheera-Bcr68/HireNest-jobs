import type { UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import { Section } from './Section';
import RightSideBar, { type ContactDataType } from './RightSideBar';

type Props = {
  candidate: UserProfileType;
  contactLinkes: ContactDataType[];
};
function OverView({ candidate, contactLinkes }: Props) {
  console.log('from overvire', contactLinkes);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 mt-4 space-y-6">
        {/* About */}
        <Section title="About" icon="👤">
          {candidate.about ? (
            <p className="text-slate-600 leading-relaxed text-sm break-words">
              {candidate.about}
            </p>
          ) : (
            <div>
              <p className="italic text-slate-400">
                Education is not added yet
              </p>
            </div>
          )}
        </Section>

        {/* Skills */}
        <Section title="Skills" icon="⚡">
          {candidate.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <span
                  key={skill.skillName}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100"
                >
                  {skill.skillName}
                </span>
              ))}
            </div>
          ) : (
            <div>
              <p className="italic text-slate-400">Skills are not added yet</p>
            </div>
          )}
        </Section>

        {/* Experience */}
        <Section title="Work Experience" icon="💼">
          {candidate.experience.length > 0 ? (
            candidate.experience.map((exp, i) => (
              <div
                key={exp.id}
                className={`flex gap-4 ${
                  i < candidate.experience.length - 1
                    ? 'pb-5 border-b border-slate-100'
                    : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                  🏢
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {exp.title}
                      </p>
                      <p className="text-slate-500 text-sm">{exp.company}</p>
                    </div>

                    <div className="text-right text-xs text-slate-800">
                      {exp.isWorking ? (
                        <span className="text-green-700 text-semibold bg-green-100 rounded">
                          Currently working
                        </span>
                      ) : (
                        <>
                          <p>
                            Started :{' '}
                            {new Date(exp.startDate).toLocaleDateString()}
                          </p>
                          {exp.endDate && (
                            <p>
                              {' '}
                              End date :{' '}
                              {new Date(exp.endDate).toLocaleDateString()}
                            </p>
                          )}
                        </>
                      )}
                      <br />
                      <span className="inline-block mt-1 bg-blue-100 text-slate-500 px-2 py-0.5 rounded-full">
                        {exp.mode}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm mt-2 leading-relaxed break-words">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="italic text-slate-400">This candidate is fresher</p>
          )}
        </Section>

        {/* Education */}
        <Section title="Education" icon="🎓">
          {candidate.education.length > 0 ? (
            <div className="space-y-4">
              {candidate.education.map((edu, i) => (
                <div
                  key={edu.id}
                  className={`flex gap-4 ${i < candidate.education.length - 1 ? 'pb-4 border-b border-slate-100' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg flex-shrink-0">
                    🏛️
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">
                          {edu.level}
                        </p>
                        <p className="text-slate-500 text-sm">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">
                          {edu.completedYear}
                        </p>
                        <p className="text-xs font-medium text-emerald-600">
                          {edu.cgpa} %
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="italic text-slate-400">
                Education is not added yet
              </p>
            </div>
          )}
        </Section>
      </div>

      {/* Right sidebar */}
      <RightSideBar resumes={candidate.resumes} contactLinkes={contactLinkes} />
    </div>
  );
}

export default OverView;
