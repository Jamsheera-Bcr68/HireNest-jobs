import { UploadFileDto } from '../../dtos/upload-file.dto';

export interface IFileStorageService {
  uploadFile(file: UploadFileDto, folder: string,fileExtension:string): Promise<string>;
  removeFile(fileName: string): Promise<void>;
  checkExist(fileName: string): Promise<boolean>;
  getFileUrl(key: string, expiresIn?: number): Promise<string>
}
