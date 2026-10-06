import { UploadFileDto } from '../../applications/dtos/upload-file.dto';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { IFileStorageService } from '../../applications/interfaces/services/file-storage.service';
import { env } from '../config/env';
import { randomUUID } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AppError } from '../../domain/errors/app-error';
import { generalMessages } from '../../shared/constants/messages/general.messages';
import { statusCodes } from '../../shared/enums/statuscodes';

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  },
});
export class S3FileStorageService implements IFileStorageService {
  async uploadFile(
    file: UploadFileDto,
    folder: string,
    fileExtension: string = 'jpg'
  ): Promise<string> {
    console.log('from s3 stroage folder name is ', folder);

    const fileName = `${randomUUID()}.${fileExtension}`;
    const key = `${folder}/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await s3Client.send(command);
    return key;
  }

  async getFileUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key,
    });
    return getSignedUrl(s3Client, command, { expiresIn });
  }

  async removeFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: key,
      });
      await s3Client.send(command);
    } catch (error) {
      throw new AppError(
        generalMessages.errors.UNABLE_TO_DELETE_FILE,
        statusCodes.SERVERERROR
      );
    }
  }

  async checkExist(fileName: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: fileName,
      });
      await s3Client.send(command);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
