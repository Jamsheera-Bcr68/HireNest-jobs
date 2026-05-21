import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { UploadFileDto } from '../../dtos/upload-file.dto';
export interface IEditProfileImageUsecase {
  execute(userId: string, role: UserRole, file: UploadFileDto): Promise<User>;
}
