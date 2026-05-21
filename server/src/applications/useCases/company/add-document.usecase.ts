import { UserRole } from '../../../domain/enums/user.enums';
import { UploadFileDto } from '../../dtos/upload-file.dto';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

export interface IAddLogoUseCase {
  execute(userId: string, role: UserRole, file: UploadFileDto): Promise<String>;
}
export class AddDocumentUseCase implements IAddLogoUseCase {
  constructor(private fileStorageServices: IFileStorageService) {}
  async execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<String> {
    const docPath = await this.fileStorageServices.uploadFile(file);
    return docPath;
  }
}
