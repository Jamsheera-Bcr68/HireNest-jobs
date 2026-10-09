import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { useExperience } from '../hooks/user/candidate/profile/useEditExperience';

import type { UserProfileType } from '../../types/dtos/profile-types/user.types';
import type { ExperienceType } from '../../types/dtos/profile-types/experience.type';
import { useTheme } from '../../contexts/ThemeContext';

type ExperienceModalProps = {
  open: boolean;
  onClose: () => void;
  onUserUpdate: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
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
  const { t } = useTheme();
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={`fixed inset-0 z-[100] ${t.overlay}/40`} />

        <Dialog.Content
          className={`  z-[100]   fixed
    top-1/2 left-1/2
    w-[95%] max-w-lg
    -translate-x-1/2 -translate-y-1/2
      ${t.surface} 
    ${t.cardBorder}
     border
    rounded-lg
    shadow-lg
    max-h-[90vh]
    overflow-y-auto
    p-6
    space-y-5`}
        >
          {/* Header */}
          <Dialog.Close asChild>
            <button
              onClick={onClose}
              aria-label="Close"
              className={`absolute top-3 right-3 p-2 t rounded-full ${t.navMuted} ${t.navIconBg}`}
            >
              <X size={20} />
            </button>
          </Dialog.Close>
          <Dialog.Title
            className={`text-2xl font-semibold mt-3 ${t.cardTitle} text-center`}
          >
            {selectedExp ? 'Edit Experience' : 'Add Experience'}
          </Dialog.Title>

          {/* Job Title */}
          <div className="flex flex-col gap-1">
            <label className={`text-sm font-medium ${t.inputText}`}>
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Full Stack Developer"
              className={`border ${t.surfaceBorder} ${t.surface} ${t.inputText} ${t.placeholder} rounded p-2 ${t.inputFocusRing}`}
            />
            {error?.title && (
              <p className={`text-sm ${t.dangerText}`}>* {error.title}</p>
            )}
          </div>

          {/* Company */}
          <div className="flex flex-col gap-1">
            <label className={`text-sm font-medium ${t.inputText}`}>
              Company
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              type="text"
              placeholder="e.g. Tech Solutions Pvt Ltd"
              className={`border ${t.surfaceBorder} ${t.surface} ${t.inputText} ${t.placeholder} rounded p-2 ${t.inputFocusRing}`}
            />
            {error?.company && (
              <p className={`text-sm ${t.dangerText}`}>* {error.company}</p>
            )}
          </div>
          {/* mode */}

          <div>
            <label className={`text-sm font-medium ${t.inputText}`}>
              Mode of Work
            </label>
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
                <label htmlFor="" className={t.inputText}>
                  Remote{' '}
                </label>{' '}
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
                <label className={t.inputText} htmlFor="">
                  Offline{' '}
                </label>{' '}
              </div>
              <div className="flex items-center w-1/4">
                <input
                  className="mr-1 mt-1 focus:border-fuchsia-700"
                  value="hybrid"
                  onChange={handleModeChange}
                  onClick={() => setIsOffline(false)}
                  checked={formData.mode == 'hybrid'}
                  type="radio"
                  name="mode"
                />
                <label className={t.inputText} htmlFor="">
                  Hybrid{' '}
                </label>{' '}
              </div>
            </div>
          </div>
          {/* Location */}
          {isOffline && (
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${t.inputText}`}>
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Chennai, India"
                className={`border rounded p-2  ${t.surfaceBorder} ${t.surface} ${t.inputText} ${t.placeholder} rounded p-2 ${t.inputFocusRing}`}
              />
              {error?.location && (
                <p className={`text-sm ${t.dangerText}`}>* {error.location}</p>
              )}
            </div>
          )}

          {/* Dates */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className={`text-sm font-medium ${t.inputText}`}>
                Start Date
              </label>
              <input
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                type="month"
                className={`border ${t.surfaceBorder} ${t.surface} ${t.inputText} rounded p-2 ${t.inputFocusRing}`}
              />
              {error?.startDate && (
                <p className={`text-sm ${t.dangerText}`}>* {error.startDate}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              {!formData.isWorking && (
                <>
                  {' '}
                  <label className={`text-sm font-medium ${t.inputText}`}>
                    End Date
                  </label>
                  <input
                    type="month"
                    className={`border ${t.surfaceBorder} ${t.surface} ${t.inputText} rounded p-2 ${t.inputFocusRing}`}
                    name="endDate"
                    onChange={handleChange}
                    value={formData.endDate}
                  />
                  {error?.endDate && (
                    <p className={`text-sm ${t.dangerText}`}>
                      * {error.endDate}
                    </p>
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

            <label className={`text-sm ${t.inputText}`}>
              I currently work here
            </label>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className={`text-sm font-medium ${t.inputText}`}>
              Description
            </label>
            <textarea
              rows={4}
              placeholder="• Led development of e-commerce platform"
              name="description"
              value={formData.description}
              onChange={handleTextareaChange}
              className={`border ${t.surfaceBorder} ${t.surface} ${t.inputText} ${t.placeholder} rounded p-2 ${t.inputFocusRing}`}
            />
            {error?.discription && (
              <p className={`text-sm ${t.dangerText}`}>* {error.discription}</p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 ${t.dangerText} ${t.dangerHover} ${t.surface} ${t.surfaceBorder} border rounded`}
            >
              Cancel
            </button>

            {selectedExp ? (
              <button
                onClick={handleEdit}
                className={`px-4 py-2 ${t.primaryButton} rounded`}
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 ${t.primaryButton} rounded`}
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
