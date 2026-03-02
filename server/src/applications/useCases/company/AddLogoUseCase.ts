import { UserRole } from '../../../domain/enums/userEnums';
import { UploadFileDto } from '../../Dtos/uploadFileDto';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';

export interface IAddLogoUseCase {
  execute(userId: string, role: UserRole, file: UploadFileDto): Promise<String>;
}
export class AddLogoUseCase implements IAddLogoUseCase {
  constructor(private imageStorageService: IFileStorageService) {}
  async execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<String> {
    const imagePath = await this.imageStorageService.uploadFile(file);
    return imagePath;
  }
}
