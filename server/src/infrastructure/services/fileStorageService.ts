import path from 'path';
import fs from 'fs/promises';
import { UploadFileDto } from '../../applications/Dtos/uploadFileDto';
import { randomUUID } from 'crypto';
import { IFileStorageService } from '../../applications/interfaces/services/IFileStorageServices';
import { AppError } from '../../domain/errors/AppError';
import { userMessages } from '../../shared/constants/messages/userMessages';
import { statusCodes } from '../../shared/enums/statusCodes';

export class FileStorageService implements IFileStorageService {
  async uploadFile(
    file: UploadFileDto,
    folder: string = 'uploads'
  ): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', folder);
    await fs.mkdir(uploadDir, { recursive: true });
    const extension = path.extname(file.originalName);
    console.log('extension is ', extension);
    const fileName = `${randomUUID()}${extension}`;
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, file.buffer);
    return `/${folder}/${fileName}`;
  }
  async removeFile(fileName: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'public', fileName);
    try {
      console.log('removeing file path');
      await fs.unlink(filePath);
      console.log('file removed successfully');
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw new AppError(
          userMessages.error.RESUME_ALREADY_DELETED,
          statusCodes.CONFLICT
        );
      }
      throw new Error(userMessages.error.IMAGE_REMOVAL_FAILED);
    }
  }
}
