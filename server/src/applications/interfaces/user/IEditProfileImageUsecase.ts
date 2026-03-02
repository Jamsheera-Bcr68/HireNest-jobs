import { User } from '../../../domain/entities/User';
import { UserRole } from '../../../domain/enums/userEnums';
import { UploadFileDto } from '../../Dtos/uploadFileDto';
export interface IEditProfileImageUsecase {
  execute(userId: string, role: UserRole, file: UploadFileDto): Promise<User>;
}
