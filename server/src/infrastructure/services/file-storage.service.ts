import path from 'path';
import fs from 'fs/promises';
import { UploadFileDto } from '../../applications/dtos/upload-file.dto';
import { randomUUID } from 'crypto';
import { IFileStorageService } from '../../applications/interfaces/services/file-storage.service';
import { AppError } from '../../domain/errors/app-error';
import { userMessages } from '../../shared/constants/messages/user.messages';
import { statusCodes } from '../../shared/enums/statuscodes';

export class FileStorageService implements IFileStorageService {
  async uploadFile(
    file: UploadFileDto,
    folder: string = 'uploads'
  ): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', folder);
    await fs.mkdir(uploadDir, { recursive: true });
    const extension = path.extname(file.originalName);
   // console.log('extension is ', extension);
    const fileName = `${randomUUID()}${extension}`;
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, file.buffer);
    return `/${folder}/${fileName}`;
  }

  async removeFile(fileName: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'public', fileName);
    try {
    //  console.log('removeing file path');
      await fs.unlink(filePath);
    //  console.log('file removed successfully');
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

  async checkExist(fileUrl: string) {
  //  console.log('from service', fileUrl);

    const filePath = path.join(process.cwd(), 'public', fileUrl);

 //   console.log('checking path:', filePath);

    try {
      await fs.access(filePath);
  //    console.log('File exists ');
      return true;
    } catch {
    //  console.log('File NOT exists ');
      return false;
    }
  }
}
