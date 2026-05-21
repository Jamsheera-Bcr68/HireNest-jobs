import { User } from '../../../domain/entities/user.entity';
import { IResume } from '../../../domain/values/profile-types';
import { UserRole } from '../../../domain/enums/user.enums';
import { UploadFileDto } from '../../dtos/upload-file.dto';

export interface IAddResumeUseCase {
  execute(
    data: UploadFileDto,
    userId: string,
    role: UserRole
  ): Promise<IResume>;
}
