import multer from 'multer';

const storage = multer.memoryStorage();

const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'video/mp4',
  'video/webm',
];

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'));
  }
};

export const chatAttachmentUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 5,
  },
});
