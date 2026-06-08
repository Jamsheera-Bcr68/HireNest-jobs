import { User } from '../../../domain/entities/user.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { userProfileDto } from '../../dtos/user.dto';

export interface IGetUserUseCase {
  execute(userId: string, role: UserRole): Promise<userProfileDto>;
}
