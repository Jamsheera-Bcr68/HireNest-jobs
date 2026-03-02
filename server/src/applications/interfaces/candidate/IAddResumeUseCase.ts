import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { UploadFileDto } from '../../Dtos/uploadFileDto';

export interface IAddResumeUseCase {
  execute(data: UploadFileDto, userId: string, role: UserRole): Promise<User>;
}
