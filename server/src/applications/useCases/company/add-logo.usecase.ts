import { UserRole } from '../../../domain/enums/user.enums';
import { UploadFileDto } from '../../dtos/upload-file.dto';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

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
