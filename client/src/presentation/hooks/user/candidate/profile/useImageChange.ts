import { useState, useRef } from 'react';
import { getCroppedImage } from '../../../../../utils/crop-image';
import { useToast } from '../../../../../shared/toast/use-toast';

import type { UserProfileType } from '../../../../../types/dtos/profile-types/user.types';
import { profileService } from '../../../../../services/api-services/candidateService';

export const useImageChange = (
  onClose: () => void,
  onUserUpdate: (user: UserProfileType) => void
) => {
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setIsCropping(true);
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

    const file = new File([croppedBlob], 'image', { type: 'image/jpeg' });

    const formdata = new FormData();
    formdata.append('image', file);

    try {
      const data = await profileService.saveImage(formdata);

      const user = data.user;
      showToast({ msg: data.message, type: 'success' });
      onUserUpdate(user);
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
      const data = await profileService.removeImage();

      onUserUpdate(data.user);
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

  return {
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
  };
};
