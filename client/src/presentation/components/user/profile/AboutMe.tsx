import { useEditProfileDetails } from '../../../hooks/user/candidate/profile/useEditProfileDetails';
import { useToast } from '../../../../shared/toast/useToast';
import type { UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';

const AboutMe = ({
  user,
  onUserUpdate,
}: {
  user: UserProfileType | undefined;
  onUserUpdate: (user: UserProfileType) => void;
}) => {
  const { showToast } = useToast();
  const {
    addAbout,
    isEditing,
    handleChange,
    onEdit,
    value,
    cancelEdit,
    onBlur,
  } = useEditProfileDetails(showToast, onUserUpdate, user, []);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">About Me</h3>

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
        className={`w-full resize-none bg-transparent rounded p-2 ${isEditing ? 'border border_grey-300' : ''}  focus:outline-none text-gray-700 leading-relaxed`}
        rows={1}
      />
    </div>
  );
};

export default AboutMe;
