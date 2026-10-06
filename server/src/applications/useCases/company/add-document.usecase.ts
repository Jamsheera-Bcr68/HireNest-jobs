import { UserRole } from '../../../domain/enums/user.enums';
import { UploadFileDto } from '../../dtos/upload-file.dto';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

export interface IAddFileUseCase {
  execute(userId: string, role: UserRole, file: UploadFileDto): Promise<String>;
}
export class AddDocumentUseCase implements IAddFileUseCase {
  constructor(private _fileStorageServices: IFileStorageService) {}
  async execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<String> {
    const docPath = await this._fileStorageServices.uploadFile(file,'companies/documents','pdf');
    return docPath;
  }
}
