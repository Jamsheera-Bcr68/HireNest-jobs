import type { UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import DeleteConfirmationModal from '../../../modals/DeleteConfirmationModal';
import ExperienceModal from '../../../modals/AddExperienceModal';
import { Trash } from 'lucide-react';
import { useToast } from '../../../../shared/toast/useToast';
import { useState } from 'react';
import { type ExperienceType } from '../../../../types/dtos/profileTypes/experienceType';
import { profileService } from '../../../../services/apiServices/candidateService';

type ExperienceProps = {
  user: UserProfileType | undefined;
  onUserUpdate: (user: UserProfileType) => void;
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

      onUserUpdate(data.user);
      showToast({ msg: data?.message, type: 'success' });
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Work Experience</h3>
        <button
          onClick={() => setIsExpOpen(true)}
          className="text-green-600 hover:text-green-700 text-sm font-medium"
        >
          Add Experience
        </button>
      </div>
      <div className="space-y-6  bg-grey-200">
        {user && user.experience?.length ? (
          user.experience.map((ex) => {
            return (
              <div className="border-l-4 border-indigo-600 bg-white  p-4 rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 transition">
                <div className="">
                  {/* Top section */}
                  <div className="flex justify-between items-start">
                    {/* Left side */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {ex.title}
                      </h4>

                      <p className="text-gray-600">{ex.company}</p>

                      {/* Description */}
                      <p className=" text-gray-700 text-sm whitespace-pre-line break-words">
                        {ex.description}
                      </p>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col items-end ml-4">
                      <div className="flex">
                        <button
                          onClick={() => {
                            setExp(ex);
                            setIsExpOpen(true);
                            console.log('selected ex', selectedExp);
                          }}
                          className="mt-2  text-blue-600 hover:text-blue-700 text-sm font-medium transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 3.487a2.1 2.1 0 113.03 2.9L7.5 18.78l-4 1 1-4L16.862 3.487z"
                            />
                          </svg>
                        </button>
                        <Trash
                          size={18}
                          onClick={() => {
                            setDeleteId(ex.id ? ex.id : '');
                            setIsDeleteModalOpen(true);
                          }}
                          className="mt-2 ml-3 text-red-600 hover:text-red-700 text-sm font-medium transition"
                        />
                      </div>

                      <span className="text-gray-500 text-sm">
                        {new Date(ex.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}
                        {' - '}
                        {ex.endDate
                          ? new Date(ex.endDate).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Present'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm italic">
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
  );
};
export default Experience;
