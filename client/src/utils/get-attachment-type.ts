import type { Attachment } from "../types/chat.types";

export const getKind = (mime: string): Attachment['kind'] => {
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  return 'file'; 
};