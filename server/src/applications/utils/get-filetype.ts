import path from 'path';

import { FileType } from '../../domain/enums/file-type.enum';

const IMAGE_EXT = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg',
  '.bmp',
  '.avif',
];
const VIDEO_EXT = ['.mp4', '.webm', '.mov', '.mkv', '.avi'];
const AUDIO_EXT = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.weba'];
export const getFileKind = (originalName: string): FileType => {
  const ext = path.extname(originalName);
  if (IMAGE_EXT.includes(ext)) return FileType.IMAGE;
  if (VIDEO_EXT.includes(ext)) return FileType.VIDEO;
  if (AUDIO_EXT.includes(ext)) return FileType.AUDIO;
  else return FileType.FILE;
};
