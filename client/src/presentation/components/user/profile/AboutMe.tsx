import { useEditProfileDetails } from '../../../hooks/user/candidate/profile/useEditProfileDetails';
import { useToast } from '../../../../shared/toast/use-toast';
import type { UserProfileType } from '../../../../types/dtos/profile-types/user.types';
import { useEffect } from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';

const AboutMe = ({
  user,
  onUserUpdate,
}: {
  user: UserProfileType | null;
  onUserUpdate: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
}) => {
  const { showToast } = useToast();
  const {
    addAbout,
    isEditing,
    handleChange,
    onEdit,
    value,
    textref,
    cancelEdit,
    onBlur,
  } = useEditProfileDetails(showToast, onUserUpdate, user, []);

  const autoResize = () => {
    const textarea = textref.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  useEffect(() => {
    autoResize();
  }, [value]);
  const { t } = useTheme();

  return (
    <div
      className={`
      ${t.cardBg}
      ${t.cardBorder}
      border
      rounded-lg
      shadow-md
      p-6
    `}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${t.cardTitle}`}>About Me</h3>

        {isEditing ? (
          <div className="flex items-center gap-3">
            <button
              onClick={addAbout}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Save
            </button>

            <button
              onClick={cancelEdit}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        ) : user?.about ? (
          <button
            onClick={onEdit}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Edit
          </button>
        ) : null}
      </div>

      <textarea
        value={isEditing ? value : user?.about || ''}
        placeholder="Add something about you..."
        readOnly={!!user?.about && !isEditing}
        onChange={handleChange}
        onBlur={onBlur}
        ref={textref}
        className={`w-full ${t.inputText}
        ${t.placeholder} resize-none bg-transparent rounded p-2 ${isEditing ? 'border border_grey-300' : ''}  focus:outline-none text-gray-700 leading-relaxed`}
        rows={1}
      />
    </div>
  );
};

export default AboutMe;
