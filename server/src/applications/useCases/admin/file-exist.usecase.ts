import { AppError } from '../../../domain/errors/app-error';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

export interface IGetFileExistUseCase {
  execute(url: string): Promise<boolean>;
}
export class GetFileExistUseCase implements IGetFileExistUseCase {
  constructor(private fileStorageServise: IFileStorageService) {}
  async execute(url: string): Promise<boolean> {
    //const filename = url.split('/').pop();
    console.log('url', url);

    console.log('file naem', url);

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
