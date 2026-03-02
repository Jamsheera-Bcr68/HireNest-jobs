import { type UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import type { SkillType } from '../../../../types/dtos/profileTypes/skillTypes';
import { useToast } from '../../../../shared/toast/useToast';
import { useEditProfileDetails } from '../../../hooks/user/candidate/profile/useEditProfileDetails';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Skills = ({
  user,
  skills,
  onUserUpdate,
}: {
  user: UserProfileType | undefined;
  skills: SkillType[];
  onUserUpdate: (user: UserProfileType) => void;
}) => {
  const { showToast } = useToast();
  const {
    selectSkill,
    isAddSkill,
    skillName,
    setSkillName,
    removeSkill,
    filteredSkills,
    setIsAddSkill,
  } = useEditProfileDetails(showToast, onUserUpdate, user, skills);
  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsAddSkill(false);
        setSkillName('');
      }
    };
    document.addEventListener('mousedown', handleOutSideClick);
    return () => document.removeEventListener('mousedown', handleOutSideClick);
  }, [setIsAddSkill]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Skills</h3>

        {!isAddSkill ? (
          <button
            onClick={() => setIsAddSkill(true)}
            className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
          >
            Add Skill
          </button>
        ) : (
          <button
            onClick={() => {
              setIsAddSkill(false);
              setSkillName('');
            }}
            className="text-red-500 text-bold text-sm"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Skills list */}
      <div className="flex flex-wrap gap-2 mb-3">
        {user?.skills?.length ? (
          user.skills.map((skill) => (
            <span
              key={skill.id}
              className="
            flex items-center
                bg-blue-100 text-blue-800
                px-3 py-1.5
                rounded-full
                text-sm font-medium
              "
            >
              {skill.skillName}
              <X
                onClick={() => removeSkill(skill.id)}
                className="ml-2"
                size={14}
              />{' '}
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">
            Showcase your skills here...
          </p>
        )}
      </div>

      {isAddSkill && (
        <div ref={inputRef} className="mt-2 relative">
          <input
            value={skillName}
            type="text"
            onChange={(e) => {
              setSkillName(e.target.value);
            }}
            placeholder="Enter a skill"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {filteredSkills.length > 0 && (
            <div className="absolute bg-white shadow-md w-1/4 border rounded-md z-10">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  onMouseDown={() => {
                    setSkillName(skill.skillName);
                    selectSkill(skill.id);
                  }}
                  className="p-2 hover:bg-gray-100 border cursor-pointer"
                >
                  {skill.skillName}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Skills;
