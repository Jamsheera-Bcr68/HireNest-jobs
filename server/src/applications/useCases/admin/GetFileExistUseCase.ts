import { AppError } from '../../../domain/errors/AppError';
import { generalMessages } from '../../../shared/constants/messages/generalMessages';
import { statusCodes } from '../../../shared/enums/statusCodes';
import { IFileStorageService } from '../../interfaces/services/IFileStorageServices';

export interface IGetFileExistUseCase {
  execute(url: string): Promise<boolean>;
}
export class GetFileExistUseCase implements IGetFileExistUseCase {
  constructor(private fileStorageServise: IFileStorageService) {}
  async execute(url: string): Promise<boolean> {
    //const filename = url.split('/').pop();
    console.log('url',url);
    
    console.log('file naem',url);
    
    if (!url)
      throw new AppError(
        generalMessages.errors.URL_NOTFOUND,
        statusCodes.NOTFOUND
      );
    const isExist = await this.fileStorageServise.checkExist(url);
    console.log('exist file', isExist);
    return isExist;
  }
}
