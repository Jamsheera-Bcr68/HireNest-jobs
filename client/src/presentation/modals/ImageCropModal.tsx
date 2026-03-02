import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImage } from '../../utils/cropImage';
import { useToast } from '../../shared/toast/useToast';
import { companyService } from '../../services/apiServices/companyService';

type ModalProps = {
  preview: string | null;
  setPreview: (url: string | null) => void;
  open: boolean;
  onClose: () => void;
  image: string | null;
  isCropping: boolean;
  setIsCropping: (state: boolean) => void;
  handleSelectedImage: (imageUrl: string) => void;
};

function ImageCropModal({
  preview,
  setPreview,
  open,
  onClose,
  setIsCropping,
  isCropping,
  image,
  handleSelectedImage,
}: ModalProps) {
  const { showToast } = useToast();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onCropComplete = (
    _: any,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const saveCroppedImage = async () => {
    if (!preview || !croppedAreaPixels) return;
    const croppedBlob = await getCroppedImage(
      preview,
      croppedAreaPixels,
      showToast
    );
    try {
      const formData = new FormData();
      const file = new File([croppedBlob], 'logo', { type: 'image/jpeg' });
      formData.append('logo', file);
      const data = await companyService.uploadProfileImage(formData);
      const imageUrl = data.imageUrl;
      const croppedUrl = URL.createObjectURL(croppedBlob);
      setPreview(croppedUrl);
      handleSelectedImage(imageUrl);

      setIsCropping(false);
      onClose();
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
      onClose();
    }
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
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md 
          -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-lg"
        >
          {/* Close button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
              onClick={() => {
                setPreview(null);
                setIsCropping(false);
              }}
            >
              <X size={20} />
            </button>
          </Dialog.Close>

          <h2 className="text-lg font-semibold mb-4">Company Logo </h2>

          {/* Preview Mode */}
          {!isCropping && image && (
            <div className="flex justify-center mb-4">
              <img
                src={image}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg border"
                onClick={() => setIsCropping(true)}
              />
            </div>
          )}

          {/* Cropping Mode */}
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

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-4">
            {isCropping && preview ? (
              <>
                <button
                  onClick={() => {
                    saveCroppedImage();
                    setIsCropping(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setIsCropping(false);
                  }}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-md"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsCropping(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Crop Image
              </button>
            )}
          </div>

          {/* Hidden Input */}
          <input type="file" accept="image/*" className="hidden" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default ImageCropModal;
