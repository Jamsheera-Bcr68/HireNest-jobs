import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { CompanyProfileType } from '../../types/dtos/profileTypes/userTypes';
import { companyService } from '../../services/apiServices/companyService';
import { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { useToast } from '../../shared/toast/useToast';
import { getCroppedImage } from '../../utils/cropImage';

type ImgViewModalProps = {
  open: boolean;
  onClose: () => void;
  profileImage: string | undefined;
  onUpdate: (updatedUser: CompanyProfileType) => void;
};

export default function LogoImgViewModal({
  open,
  onClose,
  profileImage,
  onUpdate,
}: ImgViewModalProps) {
  console.log('profileimage', profileImage);

  const { showToast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = (
    _: any,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const imageClick = () => {
    inputRef?.current?.click();
  };
  const saveCroppedImage = async () => {
    //  console.log('preview is ', preview, 'pixels is ', croppedAreaPixels);

    if (!preview || !croppedAreaPixels) return;
    const croppedBlob = await getCroppedImage(
      preview,
      croppedAreaPixels,
      showToast
    );
    setIsCropping(false);
    const croppedUrl = URL.createObjectURL(croppedBlob);
    setPreview(croppedUrl);

    const file = new File([croppedBlob], 'logo', { type: 'image/jpeg' });
    console.log('croppd blob is ', croppedBlob);
    console.log('crepped url is ', croppedUrl);
    console.log('file is ', file);

    const formdata = new FormData();
    formdata.append('logo', file);
    console.log('form data is ', formdata.get('logo'));

    try {
      const data = await companyService.changeLogo(formdata);
      console.log('response user', data.company);
      const company = data.company;
      showToast({ msg: data.message, type: 'success' });
      onUpdate(company);
      onClose();
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
      console.log(error);
    }
  };
  const removeProfleImage = async () => {
    console.log('from remove profile image');
    try {
      const data = await companyService.removeLogo();
      console.log(data.company);
      onUpdate(data.company);
      showToast({ msg: data.message, type: 'success' });
      setPreview(null);
      onClose();
    } catch (error: any) {
      showToast({
        msg: error?.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setIsCropping(true);
  };
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
