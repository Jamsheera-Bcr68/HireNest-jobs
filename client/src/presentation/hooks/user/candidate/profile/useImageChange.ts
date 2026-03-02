import { useState, useRef } from 'react';
import { getCroppedImage } from '../../../../../utils/cropImage';
import { type typeOfToast } from '../../../../../types/toastTypes';
import axiosInstance from '../../../../../libraries/axios';
import type { UserProfileType } from '../../../../../types/dtos/profileTypes/userTypes';

export const useImageChange = (
  showToast: (toast: typeOfToast) => void,
  onClose: () => void,
  onUserUpdate: (user: UserProfileType) => void
) => {
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
    console.log('croppd blob is ', croppedBlob);
    console.log('crepped url is ', croppedUrl);
    console.log('file is ', file);

    const formdata = new FormData();
    formdata.append('image', file);
    console.log('form data is ', formdata.get('image'));

    try {
      const response = await axiosInstance.patch(
        '/candidate/profile/image',
        formdata
      );
      console.log('response user', response.data.user);
      const user = response.data.user;
      showToast({ msg: response.data.message, type: 'success' });
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
      const response = await axiosInstance.delete('/candidate/profile/image');
      console.log(response.data.user);
      onUserUpdate(response.data.user);
      showToast({ msg: response.data.message, type: 'success' });
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
