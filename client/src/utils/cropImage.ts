import { type typeOfToast } from '../types/toastTypes';

export async function getCroppedImage(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  showToast: (args: typeOfToast) => void
): Promise<Blob> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    showToast({ msg: 'Canvas not supported', type: 'error' });
  } else {
    canvas.width = crop.width;
    canvas.height = crop.height;
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );
  }
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, 'image/jpeg');
  });
}
