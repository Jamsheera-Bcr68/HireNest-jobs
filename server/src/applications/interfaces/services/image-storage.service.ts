import { UploadFileDto } from '../../dtos/upload-file.dto';

export interface IImageStorageService {
  uploadImage(file: UploadFileDto, folder?: string): Promise<string>;
  removeImage(fileName: string): Promise<void>;
}
