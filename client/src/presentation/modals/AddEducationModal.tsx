import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import {
  EDUCATION_STATUS,
  EDUCATION_LEVELS,
  YEARS,
  type EducationType,
} from '../../types/dtos/profileTypes/educationTypes';
import { useEducation } from '../hooks/user/candidate/profile/useEducation';
import type { UserProfileType } from '../../types/dtos/profileTypes/userTypes';

interface AddEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdate: (updated: UserProfileType) => void;
  editEdu: EducationType | null;
}

const AddEducationModal: React.FC<AddEducationModalProps> = ({
  isOpen,
  onClose,
  onUserUpdate,
  editEdu,
}) => {
  if (!isOpen) return null;
  const [isStudying, setIsStudying] = useState(false);

  const { formData, handleChange, handleSubmit, error } = useEducation(
    onUserUpdate,
    onClose,
    editEdu
  );
  const isOngoing = editEdu ? editEdu.status === 'Ongoing' : isStudying;
  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

        {/* Content */}
        <Dialog.Content
          className="
            fixed
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[95%] max-w-lg
            bg-white
            rounded-xl
            shadow-lg
            p-6
            space-y-4
            max-h-[90vh]
            overflow-y-auto
            z-50
          "
        >
          {/* Close Button */}
          <Dialog.Close asChild>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </Dialog.Close>

          {/* Title */}
          <Dialog.Title className="text-xl font-bold text-indigo-800 text-center">
            {editEdu ? 'Edit Education' : 'Add Education'}
          </Dialog.Title>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Education Level */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Education Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select Level</option>
                {EDUCATION_LEVELS.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {error?.level && (
                <p className="text-red-600 text-sm ">* {error.level} </p>
              )}
            </div>

            {/* Univercity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Univercity
              </label>
              <input
                name="university"
                value={formData.university}
                type="text"
                onChange={handleChange}
                placeholder="e.g. Anna University"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error?.university && (
                <p className="text-red-600 text-sm ">* {error.university} </p>
              )}
            </div>
            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                name="institution"
                value={formData.institution}
                type="text"
                onChange={handleChange}
                placeholder="Enter institute name"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error?.institution && (
                <p className="text-red-600 text-sm ">* {error.institution} </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Chennai, India"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error?.location && (
                <p className="text-red-600 text-sm ">* {error.location} </p>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={(e) => {
                  const value = e.target.value;

                  setIsStudying(value === 'Ongoing');
                  handleChange(e);
                }}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Select Status</option>
                {EDUCATION_STATUS.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {error?.status && (
                <p className="text-red-600 text-sm ">* {error.status} </p>
              )}
            </div>

            {/* Years */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Year
                </label>
                <select
                  name="startYear"
                  value={formData.startYear}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">Select Year</option>
                  {YEARS.map((year, i) => (
                    <option key={i} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {error?.startYear && (
                  <p className="text-red-600 text-sm ">* {error.startYear} </p>
                )}
              </div>
              {/* !isStudying||editEdu&&editEdu.status!=='Ongoing' */}
              {!isOngoing && (
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Completed Year
                  </label>
                  <select
                    name="completedYear"
                    value={formData.completedYear}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select Year</option>
                    {YEARS.map((year, i) => (
                      <option key={i} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {error?.completedYear && (
                    <p className="text-red-600 text-sm ">
                      * {error.completedYear}{' '}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* CGPA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CGPA in Percentage
              </label>
              <input
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                type="number"
                min={0}
                placeholder="e.g. 85"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error?.cgpa && (
                <p className="text-red-600 text-sm ">* {error.cgpa} </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-blue-700"
              >
                {editEdu ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddEducationModal;
