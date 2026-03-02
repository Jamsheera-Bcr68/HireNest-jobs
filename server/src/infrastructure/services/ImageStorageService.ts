import { UploadFileDto } from '../../applications/Dtos/uploadFileDto';
import { IFileStorageService } from '../../applications/interfaces/services/IFileStorageServices';
import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { AppError } from '../../domain/errors/AppError';
import { userMessages } from '../../shared/constants/messages/userMessages';
import { statusCodes } from '../../shared/enums/statusCodes';

export class ImageStorageService implements IFileStorageService {
  constructor() {}
  async uploadFile(
    file: UploadFileDto,
    folder: string = 'uploads'
  ): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', folder);

    await fs.mkdir(uploadDir, { recursive: true });

    const fileExtension = 'jpg';
    console.log('file.original name', file.originalName);

    const fileName = `${randomUUID()}.${fileExtension}`;
    //console.log('file.extension name', fileExtension);
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, file.buffer);
    return `/${folder}/${fileName}`;
  }
  async removeFile(fileName: string) {
    const filePath = path.join(process.cwd(), 'public', fileName);
    try {
      console.log('removeing file path');
      fs.unlink(filePath);
      console.log('file remoeved successfully');
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new AppError(
          userMessages.error.IMAGE_ALREADY_REMOVED,
          statusCodes.CONFLICT
        );
      }
      throw new Error(userMessages.error.IMAGE_REMOVAL_FAILED);
    }
  }
}
