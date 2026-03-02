import { Admin } from '../../domain/entities/admin';
import { AdminDto } from '../Dtos/adminDto';

export class AdminMapper {
  static toDto(admin: Admin): AdminDto {
    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };
  }
}
