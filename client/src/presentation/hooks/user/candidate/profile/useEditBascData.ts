import { useState } from 'react';

export const useEditBasicData = () => {
  const [open, setOpen] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleChangePassword = () => {
    setOpen(true);
  };
  const handleImageClick = () => {
    console.log('from image click');
    setOpenImageModal(true);
  };
  const handleEditProfile = () => {
    setOpenEditModal(true);
  };
  return {
    handleChangePassword,
    open,
    setOpen,
    handleImageClick,
    openImageModal,
    setOpenImageModal,
    setOpenEditModal,
    openEditModal,
    handleEditProfile,
  };
};
