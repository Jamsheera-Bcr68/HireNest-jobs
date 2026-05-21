import { boolean } from 'zod';
import { UploadFileDto } from '../../dtos/upload-file.dto';

export interface IFileStorageService {
  uploadFile(file: UploadFileDto, folder?: string): Promise<string>;
  removeFile(fileName: string): Promise<void>;
  checkExist(fileName: string): Promise<boolean>;
}
