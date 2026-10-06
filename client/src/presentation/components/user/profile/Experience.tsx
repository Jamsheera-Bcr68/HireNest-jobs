import type { UserProfileType } from '../../../../types/dtos/profile-types/user.types';
import DeleteConfirmationModal from '../../../modals/DeleteConfirmationModal';
import ExperienceModal from '../../../modals/AddExperienceModal';
import { Trash } from 'lucide-react';
import { useToast } from '../../../../shared/toast/use-toast';
import { useState, type SetStateAction } from 'react';
import { type ExperienceType } from '../../../../types/dtos/profile-types/experience.type';
import { profileService } from '../../../../services/api-services/candidateService';
import { useTheme } from '../../../../contexts/ThemeContext';

type ExperienceProps = {
  user: UserProfileType | undefined;
  onUserUpdate: React.Dispatch<SetStateAction<UserProfileType|null>>
};
const Experience = ({ user, onUserUpdate }: ExperienceProps) => {
  const [isExpOpen, setIsExpOpen] = useState<boolean>(false);
  const [selectedExp, setExp] = useState<ExperienceType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const { showToast } = useToast();

  const handleDelete = async () => {
    const id = deleteId;
    console.log('from delete  id', id);

    if (!id) showToast({ msg: 'Experience id is not found', type: 'error' });
    setIsDeleteModalOpen(false);
    try {
      const data = await profileService.removeExperience(deleteId);
      setDeleteId('');
      setIsDeleteModalOpen(false);
      console.log('removed exp data', data);

      onUserUpdate((prev)=>{
        if(!prev)return prev
        return{
          ...prev,experience:prev.experience.filter(exp=>exp.id!==id)
        }
      });
      showToast({ msg: data?.message, type: 'success' });
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  const {t}=useTheme()
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
      <h3 className={`text-xl font-bold ${t.cardTitle}`}>
        Work Experience
      </h3>

      <button
        onClick={() => setIsExpOpen(true)}
        className={`
          ${t.successText}
          ${t.successHover}
          text-sm font-medium
          transition-colors
        `}
      >
        Add Experience
      </button>
    </div>

    <div className="space-y-6">
      {user && user.experience?.length ? (
        user.experience.map((ex) => {
          return (
            <div
              key={ex.id}
              className={`
                border-l-4
                border-fuchsia-600
                ${t.surface}
                p-4
                rounded-md
                shadow-sm
                ${t.dropdownHover}
                transition
              `}
            >
              <div>
                {/* Top section */}
                <div className="flex justify-between items-start">
                  {/* Left side */}
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`
                        text-lg
                        font-semibold
                        ${t.cardTitle}
                      `}
                    >
                      {ex.title}
                    </h4>

                    <p className={t.subheading}>
                      {ex.company}
                    </p>

                    {/* Description */}
                    <p
                      className={`
                        ${t.inputText}
                        text-sm
                        whitespace-pre-line
                        break-words
                      `}
                    >
                      {ex.description}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end ml-4">
                    <div className="flex">
                      {/* Edit */}
                      <button
                        onClick={() => {
                          setExp(ex);
                          setIsExpOpen(true);
                          console.log(
                            'selected ex',
                            selectedExp
                          );
                        }}
                        className={`
                          mt-2
                          text-fuchsia-600
                          hover:text-fuchsia-700
                          hover:scale-150
                          duration-300
                          text-sm
                          font-medium
                          transition
                        `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 3.487a2.1 2.1 0 113.03 2.9L7.5 18.78l-4 1 1-4L16.862 3.487z"
                          />
                        </svg>
                      </button>

                      {/* Delete */}
                      <Trash
                        size={18}
                        onClick={() => {
                          setDeleteId(ex.id ? ex.id : '');
                          setIsDeleteModalOpen(true);
                        }}
                        className={`
                          mt-2
                          ml-3
                          ${t.dangerText}
                          ${t.dangerHover}
                          cursor-pointer
                          hover:scale-150
                          duration-300
                          transition
                        `}
                      />
                    </div>

                    {/* Date */}
                    <span
                      className={`
                        ${t.iconMuted}
                        text-sm
                        mt-1
                      `}
                    >
                      {new Date(ex.startDate).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          year: 'numeric',
                        }
                      )}

                      {' - '}

                      {ex.endDate
                        ? new Date(ex.endDate).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              year: 'numeric',
                            }
                          )
                        : 'Present'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className={`${t.subheading} text-sm italic`}>
          Showcase your experience here
        </p>
      )}
    </div>

    <ExperienceModal
      open={isExpOpen}
      onClose={() => {
        setExp(null);
        setIsExpOpen(false);
      }}
      user={user}
      onUserUpdate={onUserUpdate}
      selectedExp={selectedExp}
    />

    <DeleteConfirmationModal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      onDelete={handleDelete}
      item="Experience"
    />
  </div>
)};
export default Experience;
