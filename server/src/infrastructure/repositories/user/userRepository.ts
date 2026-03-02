import { GenericRepository } from '../genericRepository';
import { User } from '../../../domain/entities/User';
import { IUserDocument, userModel } from '../../database/models/user/userModel';
import { IUserRepository } from '../../../domain/repositoriesInterfaces/IUserRepositories';
import { Types } from 'mongoose';
import { UserSkillDto } from '../../../applications/Dtos/skillDto';
import { ISkillDocument } from '../../database/models/user/skillModel';
import { IResume } from '../../../domain/values/profileTypes';
import { IExperienceDocument } from '../../database/models/user/experienceModel';
import { Experience } from '../../../domain/entities/Experience';
import { IEducationDocument } from '../../database/models/user/educationModel';
import { UploadFileDto } from '../../../applications/Dtos/uploadFileDto';
import { email } from 'zod';

export class UserRepository
  extends GenericRepository<User, IUserDocument>
  implements IUserRepository
{
  constructor() {
    super(userModel);
  }
  async findByEmail(email: string, userId?: string): Promise<User | null> {
    const filter = { email };

    const user = await this._model.findOne(filter);
    //  console.log('user from repository ', email);

    if (!user) return null;
    else return this.mapToEntity(user);
  }
  async createUser(user: User): Promise<User> {
    const document = await this._model.create({
      email: user.email,
      password: user.password,
      phone: user.phone,
    });
    //  console.log('from userRepository and user is ', document);

    return this.mapToEntity(document);
  }
  async findById(id: string): Promise<User | null> {
    //  console.log('from userrepository');

    const user = await this._model
      .findById(id)
      .populate('skills')
      .populate('experience')
      .populate('education');
    console.log('user populated', user);

    if (!user) return null;
    return this.mapToEntity(user);
  }
  mapToEntity = (doc: IUserDocument): User => {
    console.log('doc from maptoentity ', doc);
    const skills = (doc.skills as ISkillDocument[]).map(
      (skill: ISkillDocument): UserSkillDto => {
        return {
          id: skill._id.toString(),
          skillName: skill.skillName,
        };
      }
    );
    const experience = (doc.experience as IExperienceDocument[]).map(
      (exp: IExperienceDocument): Experience => {
        console.log('form mapto entity exp', exp);

        return {
          id: exp._id.toString(),
          userId: exp.userId?.toString(),
          title: exp.title,
          company: exp.company,
          mode: exp.mode,
          startDate: exp.startDate,
          endDate: exp.endDate,
          location: exp.location,
          isWorking: exp.isWorking,
          description: exp.description,
        };
      }
    );
    const education = (doc.education as IEducationDocument[]).map((edu) => {
      return {
        id: edu._id?.toString(),
        userId: edu?.userId?.toString(),
        level: edu.level,
        institution: edu.institution,
        startYear: edu.startYear,
        status: edu.status,
        completedYear: edu.completedYear,
        location: edu.location,
        cgpa: edu.cgpa,
        university: edu.university,
      };
    });

    return new User(
      doc.email,
      doc.password,
      doc.phone,
      doc.isVerified,
      experience,
      education,
      doc.resumes.map((resume) => {
        return {
          id: resume?._id.toString(),
          url: resume.url,
          name: resume.name,
          isDefault: resume.isDefault,
          uploadedAt: resume.uploadedAt,
        };
      }),
      doc._id.toString(),
      doc.resetToken,
      doc.resetTokenExpiry ?? undefined,
      doc.googleId ?? undefined,
      doc.role ?? undefined,
      doc.name ?? undefined,
      doc.title ?? undefined,
      doc.address ?? undefined,
      doc.socialMediaLinks ?? {},
      doc.imageUrl ?? undefined,
      doc.about ?? 'F',
      skills
    );
  };

  mapToPersistance = (entity: Partial<User>) => {
    return {
      name: entity.name,
      title: entity.title,
      address: entity.address,
      imageUrl: entity.imageUrl,
      resumes: entity.resumes?.map((resume) => {
        return {
          _id: new Types.ObjectId(resume.id),
          url: resume.url,
          name: resume.name,
          isDefault: resume.isDefault,
          uploadedAt: new Date(resume.uploadedAt),
        };
      }),
      socialMediaLinks: entity.socialMediaLinks,
      about: entity.about,
      skills: entity.skills?.map((skill) => new Types.ObjectId(skill.id)),
    };
  };
  async verifyUser(email: string): Promise<void> {
    const user = await this._model.findOne({ email });
    if (!user) throw new Error('user not found');
    user.isVerified = true;
    await user.save();
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
  async updatePassword(email: string, password: string): Promise<void> {
    await this._model
      .findOneAndUpdate(
        { email },
        { $set: { password, resetToken: null, resetTokenExpiry: null } }
      )
      .populate('skills')
      .populate('experience');
  }

  async updateGoogleId(email: string, googleId: string): Promise<User | null> {
    const document = await this._model.findOneAndUpdate(
      { email },
      { googleId }
    );
    if (!document) return null;
    return this.mapToEntity(document);
  }

  async addProfileData(
    userId: string,
    data: Partial<User>
  ): Promise<User | null> {
    const user = await this._model
      .findByIdAndUpdate(userId, this.mapToPersistance(data), { new: true })
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!user) return null;
    return this.mapToEntity(user);
  }
  async addSkill(id: string, skillId: string): Promise<User | null> {
    const updated = await this._model
      .findByIdAndUpdate(id, { $addToSet: { skills: skillId } }, { new: true })
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!updated) return null;
    return this.mapToEntity(updated);
  }
  async removeSkill(userId: string, skillId: string): Promise<User | null> {
    const updated = await this._model
      .findByIdAndUpdate(
        userId,
        { $pull: { skills: new Types.ObjectId(skillId) } },
        { new: true }
      )
      .populate('skills')
      .populate('experience')
      .populate('education');
    //  console.log('updated after removeskill from repo', updated);
    if (!updated) return null;
    return this.mapToEntity(updated);
  }
  async addExperience(userId: string, expId: string): Promise<User | null> {
    const updated = await this._model
      .findByIdAndUpdate(
        userId,
        { $addToSet: { experience: expId } },
        { new: true }
      )
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!updated) return null;
    return this.mapToEntity(updated);
  }
  async removeExperience(userId: string, expId: string): Promise<User | null> {
    const doc = await this._model
      .findByIdAndUpdate(userId, {
        $pull: { experience: new Types.ObjectId(expId) },
      })
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!doc) return null;
    return this.mapToEntity(doc);
  }
  async addEducation(userId: string, eduId: string): Promise<User | null> {
    const user = await this._model
      .findByIdAndUpdate(
        userId,
        { $addToSet: { education: new Types.ObjectId(eduId) } },
        { new: true }
      )
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!user) return null;
    return this.mapToEntity(user);
  }
  async removeEducation(userId: string, eduId: string): Promise<User | null> {
    const user = await this._model
      .findByIdAndUpdate(
        userId,
        { $pull: { education: new Types.ObjectId(eduId) } },
        { new: true }
      )
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!user) return null;
    return this.mapToEntity(user);
  }
  async addResume(data: IResume, userId: string): Promise<User | null> {
    const doc = await this._model
      .findByIdAndUpdate(
        userId,
        { $addToSet: { resumes: data } },
        { new: true }
      )
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!doc) return null;
    return this.mapToEntity(doc);
  }
  async addProfileImage(
    userId: string,
    imageUrl: string
  ): Promise<User | null> {
    const doc = await this._model
      .findByIdAndUpdate(
        userId,
        { $set: { imageUrl: imageUrl } },
        { new: true }
      )
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!doc) return null;
    return this.mapToEntity(doc);
  }
  async removeProfileImage(userId: string): Promise<User | null> {
    const doc = await this._model
      .findByIdAndUpdate(userId, { $set: { imageUrl: '' } }, { new: true })
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!doc) return null;
    return this.mapToEntity(doc);
  }
  async removeResume(userId: string, resumeId: string): Promise<User | null> {
    const user = await this._model
      .findByIdAndUpdate(
        userId,
        { $pull: { resumes: { _id: new Types.ObjectId(resumeId) } } },
        { new: true }
      )
      .populate('skills')
      .populate('experience')
      .populate('education');
    if (!user) return null;
    else return this.mapToEntity(user);
  }
}
