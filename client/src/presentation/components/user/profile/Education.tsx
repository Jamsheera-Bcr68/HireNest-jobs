import { useState } from 'react';
import EducationModal from '../../../modals/AddEducationModal';
import { type EducationType } from '../../../../types/dtos/profileTypes/educationTypes';
import type { UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import { PenIcon, Trash } from 'lucide-react';
import DeleteConfirmationModal from '../../../modals/DeleteConfirmationModal';
import { useToast } from '../../../../shared/toast/useToast';
import { profileService } from '../../../../services/apiServices/candidateService';

type EducationProps = {
  onUserUpdate: (user: UserProfileType) => void;
  educations: EducationType[] | [];
};
type ModalOpen = { type: 'edit' | 'delete' | 'add'; isOpen: boolean };
const Education = ({ onUserUpdate, educations }: EducationProps) => {
  const [isOpen, setIsOpen] = useState<ModalOpen | null>(null);
  const [editEdu, setEditEdu] = useState<EducationType | null>(null);
  const [deleteEduId, setDeleteEduId] = useState<string>('');
  const { showToast } = useToast();
  const handleDelete = async () => {
    if (!deleteEduId) {
      showToast({ msg: 'Education id is not found', type: 'error' });
      return;
    }
    try {
      const data = await profileService.deleteEducation(deleteEduId);
      setDeleteEduId('');
      setIsOpen(null);
      showToast({ msg: data.message, type: 'success' });
      onUserUpdate(data.user);
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
      return;
    }
  };
  return (
    <div className="bg-white  rounded-lg shadow-md p-6">
      <div className="flex  justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Education</h3>
        <button
          onClick={() => {
            setIsOpen({ type: 'add', isOpen: true });
            setEditEdu(null);
          }}
          className="text-green-600 hover:text-green-700 text-sm font-medium"
        >
          Add
        </button>
      </div>
      <div className="space-y-4">
        {educations.length ? (
          educations.map((edu) => {
            return (
              <div
                key={edu.id}
                className="border-l-4 border-indigo-600 bg-white p-4 rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {edu.level}
                    </h4>
                    <p className="text-gray-600">{edu.university}</p>
                    <p className="text-gray-500 text-sm">{edu.location}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-3">
                      <PenIcon
                        onClick={() => {
                          setEditEdu(edu);
                          setIsOpen({ type: 'edit', isOpen: true });
                        }}
                        className="text-blue-600 cursor-pointer"
                        size={18}
                      />
                      <Trash
                        onClick={() => {
                          setIsOpen({ type: 'delete', isOpen: true });
                          setDeleteEduId(edu.id);
                        }}
                        className="text-red-600 cursor-pointer"
                        size={18}
                      />
                    </div>

                    <span className="text-gray-500 text-sm">
                      {edu.startYear} - {edu.completedYear || 'Ongoing'}
                    </span>
                  </div>
                </div>

                <p className="mt-1 text-gray-700 text-sm">CGPA: {edu.cgpa} %</p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm italic">
            Showcase your experience here
          </p>
        )}
      </div>
      <EducationModal
        isOpen={isOpen?.type === 'edit' || isOpen?.type == 'add'}
        onClose={() => {
          setIsOpen(null);

          setEditEdu(null);
        }}
        onUserUpdate={onUserUpdate}
        editEdu={editEdu}
      />

      <DeleteConfirmationModal
        isOpen={isOpen?.type == 'delete'}
        onDelete={handleDelete}
        onClose={() => {
          setIsOpen(null);
          setDeleteEduId('');
        }}
        item={'Qualification'}
      />

      {/* <DeleteConfirmationModal isOpen={} /> */}
    </div>
  );
};
export default Education;
