import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { type ProfileImgViewModalProps } from '../../types/propTypes/profileProps';
import Cropper from 'react-easy-crop';

import { useToast } from '../../shared/toast/useToast';
import { useImageChange } from '../hooks/user/candidate/profile/useImageChange';

export default function ProfileImgViewModal({
  open,
  onClose,
  profileImage,
  onUserUpdate,
}: ProfileImgViewModalProps) {
  const { showToast } = useToast();
  console.log('profileimage', profileImage);

  const {
    preview,
    setPreview,
    inputRef,
    crop,
    setCrop,
    zoom,
    setZoom,
    isCropping,
    setIsCropping,
    onCropComplete,
    imageClick,
    handleFileChange,
    saveCroppedImage,
    removeProfleImage,
  } = useImageChange(showToast, onClose, onUserUpdate);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />

        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 z-50
            w-full max-w-md
            -translate-x-1/2 -translate-y-1/2
            rounded-xl bg-white p-2 shadow-lg
            focus:outline-none
            
          "
        >
          {/* Close button top-right */}
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
              onClick={() => {
                (setPreview(null), setIsCropping(false));
              }}
            >
              <X size={20} />
            </button>
          </Dialog.Close>

          {/* Profile Image */}
          {!isCropping && (
            <>
              <div className="flex justify-center mb-6">
                <img
                  src={preview || profileImage || '/profileImage.jpg'}
                  alt="Profile"
                  onClick={imageClick}
                  className="w-4/5 h-3/4  object-cover border"
                />
              </div>
            </>
          )}
          {isCropping && preview && (
            <div className="relative w-full h-72 bg-white">
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
          <div className="flex flex-col ">
            {/* Scenario 1: While Cropping (Show Save/Cancel) */}
            {isCropping && preview ? (
              <div className="flex gap-2">
                <button
                  onClick={saveCroppedImage}
                  className="w-full w-1/4 ml-4 mt-3 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setPreview(null);
                    setIsCropping(false);
                  }}
                  className="w-full w-1/4 ml-2 mr-3 mt-3 rounded-md border border-red-600 text-red-600 py-2 hover:bg-red-50"
                >
                  Cancel
                </button>
              </div>
            ) : !profileImage && !preview ? (
              <div className="flex justify-center">
                <button
                  onClick={imageClick}
                  className="w-1/2 mt-3 rounded-md bg-indigo-600 text-white py-2 hover:bg-blue-700"
                >
                  Add Image
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={imageClick}
                  className="w-full mt-3 w-1/4 ml-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Change Image
                </button>
                <button
                  onClick={removeProfleImage}
                  className="w-full w-1/4 mt-3 ml-2 mr-3 rounded-md border border-red-600 text-red-600 py-2 hover:bg-red-50"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
