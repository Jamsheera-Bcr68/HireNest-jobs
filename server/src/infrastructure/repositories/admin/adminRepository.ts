import { Admin } from '../../../domain/entities/admin';
import { IAdminRepository } from '../../../domain/repositoriesInterfaces/IAdminRepository';
import {
  adminModel,
  IAdminDocument,
} from '../../database/models/admin/adminModel';
import { GenericRepository } from '../genericRepository';

export class AdminRepository
  extends GenericRepository<Admin, IAdminDocument>
  implements IAdminRepository
{
  constructor() {
    super(adminModel);
  }
  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.findOne({ email });
    if (!admin) return null;
    return admin;
  }
  protected mapToEntity(doc: IAdminDocument): Admin {
    return {
      email: doc.email,
      role: doc.role,
      password: doc.password,
      googleId: doc.googleId ?? undefined,
      id: doc._id.toString(),
    } as Admin;
  }
  protected mapToPersistance(entity: Admin): Partial<IAdminDocument> {
    return {
      email: entity.email,
    };
  }
  async updateGoogleId(email: string, googleId: string): Promise<Admin | null> {
    const document = await this._model.findOneAndUpdate(
      { email },
      { googleId }
    );
    if (!document) return null;
    return this.mapToEntity(document);
  }
}
