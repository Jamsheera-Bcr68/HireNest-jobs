import { UserRole } from '../../../domain/enums/userEnums';
import { UploadFileDto } from '../../Dtos/uploadFileDto';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';

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
