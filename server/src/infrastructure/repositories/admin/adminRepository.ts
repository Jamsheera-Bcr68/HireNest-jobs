import { Admin } from '../../../domain/entities/admin';
import { Types } from 'mongoose';
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
    const admin = await this._model.findOne({ email });
    console.log('admin', admin);

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
      resetToken: doc.resetToken ?? undefined,
      resetTokenExpiry: doc.resetTokenExpiry ?? undefined,
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

  async updateResetToken(
    userId: string,
    hashedToken: string,
    resetTokenExpiry: Date
  ): Promise<void> {
    await this._model.updateOne(
      { _id: new Types.ObjectId(userId) },
      { resetToken: hashedToken, resetTokenExpiry }
    );
  }

  async updatePassword(id: string, password: string): Promise<void> {
    let admin = await this._model.findByIdAndUpdate(id, {
      $set: { password },
      $unset: {
        resetToken: '',
        resetTokenExpiry: '',
      },
    });
    console.log('new admin', admin);
  }

  async clearResetToken(id: string): Promise<void> {
    await this._model.findByIdAndUpdate(id, {
      $unset: {
        resetToken: '',
        resetTokenExpiry: '',
      },
    });
  }
}
