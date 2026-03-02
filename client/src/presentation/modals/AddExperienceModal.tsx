import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useExperience } from '../hooks/user/candidate/profile/useEditExperience';

import type { UserProfileType } from '../../types/dtos/profileTypes/userTypes';
import type { ExperienceType } from '../../types/dtos/profileTypes/experienceType';

type ExperienceModalProps = {
  open: boolean;
  onClose: () => void;
  onUserUpdate: (user: UserProfileType) => void;
  user?: UserProfileType;

  selectedExp: ExperienceType | null;
};

export default function ExperienceModal({
  open,
  onClose,
  onUserUpdate,
  selectedExp,
}: ExperienceModalProps) {
  const {
    formData,
    handleChange,
    handleTextareaChange,
    handleEdit,
    handleSubmit,
    error,
    handleModeChange,
  } = useExperience(open, onUserUpdate, onClose, selectedExp);

  const [isOffline, setIsOffline] = useState<boolean>(true);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content
          className="    fixed
    top-1/2 left-1/2
    w-[95%] max-w-lg
    -translate-x-1/2 -translate-y-1/2
    bg-white
    rounded-lg
    shadow-lg
    max-h-[90vh]
    overflow-y-auto
    p-6
    space-y-5"
        >
          {/* Header */}
          <Dialog.Close asChild>
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </Dialog.Close>
          <Dialog.Title className="text-2xl font-semibold mt-3 text-indigo-800 text-center">
            {selectedExp ? 'Edit Experience' : 'Add Experience'}
          </Dialog.Title>

          {/* Job Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Full Stack Developer"
              className="border rounded p-2"
            />
            {error?.title && (
              <p className=" text-sm text-red-600">* {error.title}</p>
            )}
          </div>

          {/* Company */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Tech Solutions Pvt Ltd"
              className="border rounded p-2"
            />
            {error?.company && (
              <p className=" text-sm text-red-600">* {error.company}</p>
            )}
          </div>
          {/* mode */}

          <div>
            <label className="text-sm font-medium">Mode of Work</label>
            <div className="  w-full flex  ">
              {' '}
              <div className="flex w-1/4 items-center">
                <input
                  className="mr-1 mt-1"
                  type="radio"
                  value="remote"
                  onClick={() => setIsOffline(false)}
                  onChange={handleModeChange}
                  checked={formData.mode === 'remote'}
                  name="mode"
                />
                <label htmlFor="">Remote </label>{' '}
              </div>
              <div className="flex items-center w-1/4">
                <input
                  className="mr-1 mt-1"
                  onClick={() => setIsOffline(true)}
                  type="radio"
                  value="onsite"
                  onChange={handleModeChange}
                  checked={formData.mode === 'onsite'}
                  name="mode"
                />
                <label htmlFor="">Offline </label>{' '}
              </div>
              <div className="flex items-center w-1/4">
                <input
                  className="mr-1 mt-1"
                  value="hybrid"
                  onChange={handleModeChange}
                  onClick={() => setIsOffline(false)}
                  checked={formData.mode == 'hybrid'}
                  type="radio"
                  name="mode"
                />
                <label htmlFor="">Hybrid </label>{' '}
              </div>
            </div>
          </div>
          {/* Location */}
          {isOffline && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Chennai, India"
                className="border rounded p-2"
              />
              {error?.location && (
                <p className=" text-sm text-red-600">* {error.location}</p>
              )}
            </div>
          )}

          {/* Dates */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium">Start Date</label>
              <input
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                type="month"
                className="border rounded p-2"
              />
              {error?.startDate && (
                <p className=" text-sm text-red-600">* {error.startDate}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              {!formData.isWorking && (
                <>
                  {' '}
                  <label className="text-sm font-medium">End Date</label>
                  <input
                    type="month"
                    className="border rounded p-2 "
                    name="endDate"
                    onChange={handleChange}
                    value={formData.endDate}
                  />
                  {error?.endDate && (
                    <p className=" text-sm text-red-600">* {error.endDate}</p>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Currently Working */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isWorking"
              checked={formData.isWorking}
              onChange={handleChange}
            />

            <label className="text-sm">I currently work here</label>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={1}
              placeholder="• Led development of e-commerce platform"
              name="description"
              value={formData.description}
              onChange={handleTextareaChange}
              className="border rounded p-2"
            />
            {error?.discription && (
              <p className=" text-sm text-red-600">* {error.discription}</p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-white bg-red-600 border rounded"
            >
              Cancel
            </button>

            {selectedExp ? (
              <button
                onClick={handleEdit}
                className="px-4  py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4  py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
