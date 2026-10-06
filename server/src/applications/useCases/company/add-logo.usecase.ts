import { UserRole } from '../../../domain/enums/user.enums';
import { UploadFileDto } from '../../dtos/upload-file.dto';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

export interface IAddLogoUseCase {
  execute(userId: string, role: UserRole, file: UploadFileDto): Promise<String>;
}
export class AddLogoUseCase implements IAddLogoUseCase {
  constructor(
    private _fileStorageService:IFileStorageService,
   
   

  ) {}
  async execute(
    userId: string,
    role: UserRole,
    file: UploadFileDto
  ): Promise<String> {
    console.log('from comapny document update use case',file);
    
    const docUrl = await this._fileStorageService.uploadFile(file,'companies/logos','jpg');
   
    return docUrl;
  }
}


