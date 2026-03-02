import { UploadFileDto } from '../../Dtos/uploadFileDto';

export interface IFileStorageService {
  uploadFile(file: UploadFileDto, folder?: string): Promise<string>;
  removeFile(fileName: string): Promise<void>;
}
