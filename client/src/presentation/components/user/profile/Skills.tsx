import { type UserProfileType } from '../../../../types/dtos/profile-types/user.types';
import type { SkillType } from '../../../../types/dtos/profile-types/skill.types';
import { useToast } from '../../../../shared/toast/use-toast';
import { useEditProfileDetails } from '../../../hooks/user/candidate/profile/useEditProfileDetails';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useProfile } from '../../../hooks/user/candidate/profile/useProfile';
import { useTheme } from '../../../../contexts/ThemeContext';

const Skills = ({
  user,

  onUserUpdate,
}: {
  user: UserProfileType | undefined;

  onUserUpdate: React.Dispatch<
    React.SetStateAction<UserProfileType | undefined>
  >;
}) => {
  const { showToast } = useToast();
  const { updateFilter, allSkills } = useProfile();
  const {
    selectSkill,
    isAddSkill,
    skillName,
    setSkillName,
    removeSkill,
    filteredSkills,
    setIsAddSkill,
  } = useEditProfileDetails(showToast, onUserUpdate, user, allSkills);
  const inputRef = useRef<HTMLDivElement>(null);
  const [isLoading,setIsLoading]=useState<boolean>(false)

  const closeSkillInput = () => {
    setIsAddSkill(false);
    setSkillName('');
  };

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        closeSkillInput();
      }
    };
    document.addEventListener('mousedown', handleOutSideClick);
    return () => document.removeEventListener('mousedown', handleOutSideClick);
  }, [setIsAddSkill]);

  useEffect(() => {
    if (!skillName.trim()) {
      return;
    }

    const timer = setTimeout(() => {
      updateFilter(skillName);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [skillName]);
  const {t}=useTheme()

  return (
    <div className={`
      ${t.cardBg}
      ${t.cardBorder}
      border
      rounded-lg
      shadow-md
      p-6
    `}   >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
           <h3 className={`text-xl font-bold ${t.cardTitle}`}>Skills</h3>

        {!isAddSkill &&(
          <button
            onClick={() => setIsAddSkill(true)}
            className={`
            ${t.successText}
            ${t.successHover}
            text-sm font-medium
            transition-colors
          `}
          >
            Add Skill
          </button>
        )  }
        {isAddSkill&&(
          <button
            onClick={(e) => {
              if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
              ) {
                closeSkillInput();
              }
            }}
            className={`
            ${t.dangerText}
            ${t.dangerHover}
            text-sm font-medium
          `}
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
               className={`
              flex items-center
              ${t.skillChipBg}
              ${t.skillChipText}
              ${t.skillChipBorder}
              border
              px-3 py-1.5
              rounded-full
              text-sm font-medium
            `}
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
          <p className={`${t.subheading} text-sm italic`}>
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
                className={`
            w-full
            ${t.surface}
${t.surfaceBorder}
            border
            rounded-md
            px-3 py-2
            text-sm
            ${t.inputText}
            ${t.placeholder}
            focus:outline-none
            ${t.inputFocusRing}
          `}
          />

          {filteredSkills.length > 0 && (
            <div className={`
              absolute
              ${t.dropdownBg}
              ${t.dropdownBorder}
              shadow-md
              w-1/4
              border
              rounded-md
              z-10
              overflow-hidden
            `}>
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  onMouseDown={() => {
                    setSkillName(skill.skillName);
                    selectSkill(skill.id);
                  }}
                        className={`
                  ${t.dropdownHover}
                  ${t.inputText}
                  p-2
                  border-b
                  ${t.dropdownBorder}
                  cursor-pointer
                  text-sm
                `}
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
