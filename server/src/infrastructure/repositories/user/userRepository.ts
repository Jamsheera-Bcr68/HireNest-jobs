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
import { CandidateStatus } from '../../../applications/Dtos/candidateDto';
import { UserMapper } from '../../../applications/mappers/userMapper';
import {
  CandidateFilterType,
  PaginatedCandidates,
  PaginatedEntities,
} from '../../../applications/types/candidateType';
import { IEducationRepository } from '../../../domain/repositoriesInterfaces/IEducationRepository';
import { userProfileDto } from '../../../applications/Dtos/userDto';

type CandidateQuery = Partial<User> & {
  $or?: {
    name?: { $regex: string; $options: string };
    email?: { $regex: string; $options: string };
    title?: { $regex: string; $options: string };
  }[];
};

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
    // console.log('user populated', user);

    if (!user) return null;
    return this.mapToEntity(user);
  }

  mapToEntity = (doc: IUserDocument): User => {
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
        //  console.log('form mapto entity exp', exp);

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
      doc.createdAt,
      doc.updatedAt,
      doc.isVerified,
      doc.isRequested,
      doc.companyRequests ?? [],
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

      doc.imageUrl,
      doc.isBlocked,
      doc.about ?? '',
      skills,
      doc.savedJobs.map((_id) => _id.toString())
    );
  };

  mapToPersistance = (entity: Partial<User>) => {
    return {
      name: entity.name,
      title: entity.title,
      address: entity.address,
      imageUrl: entity.imageUrl,
      isRequested: entity.isRequested,
      role: entity.role,
      companyRequests: entity.companyRequests,
      isBlocked: entity.isBlocked,
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
      savedJobs: entity.savedJobs?.map((id) => new Types.ObjectId(id)),
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

  async updatePassword(id: string, password: string): Promise<void> {
    await this._model
      .findByIdAndUpdate(id, {
        $set: { password, resetToken: null, resetTokenExpiry: null },
      })
      .populate('skills')
      .populate('experience')
      .populate('education');
  }

  async clearResetToken(id: string): Promise<void> {
    await this._model.findByIdAndUpdate(id, {
      $unset: {
        resetToken: '',
        resetTokenExpiry: '',
      },
    });
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

  async getCandidateStatus(): Promise<CandidateStatus> {
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const statusDocs = await this._model.aggregate([
      { $match: { role: 'candidate' } },
      { $group: { _id: '$isBlocked', count: { $sum: 1 } } },
    ]);
    const total = statusDocs.reduce((acc, doc) => acc + doc.count, 0);
    const status = Object.fromEntries(
      statusDocs.map((doc) => [
        doc._id === false ? 'active' : 'suspended',
        doc.count,
      ])
    ) as CandidateStatus;
    const newDocCount = await this._model.countDocuments({
      createdAt: { $gte: startOfMonth },
      role: 'candidate',
    });
    console.log(status);
    status.new = newDocCount;
    status.totalCandidate = total;
    console.log('new dod', newDocCount);

    return status;
  }

  async getCandidateList(
    filter: Partial<User>,
    page: number,
    limit: number,
    search?: string,
    education?: string
  ): Promise<PaginatedEntities<User>> {
    console.log('filter', filter);
    const skip = limit * (page - 1);
    const query: any = { ...filter };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const pipeline = [
      { $match: query },
      {
        $lookup: {
          from: 'educations',
          localField: 'education',
          foreignField: '_id',
          as: 'edudata',
        },
      },
    ];
    if (education) {
      pipeline.push({
        $match: {
          edudata: {
            $elemMatch: {
              level: education,
            },
          },
        },
      });
    }

    const candidates = await this._model
      .aggregate(pipeline)
      .skip(skip)
      .limit(Number(limit));
    let totalDocs = (await this._model.aggregate(pipeline)).length;
    console.log('candidatesss', candidates);

    return {
      entities: candidates.map((doc) => this.mapToCandidateList(doc)),
      totalDocs,
    };
  }

  private mapToCandidateList(doc: any): User {
    return {
      id: doc._id.toString(),
      email: doc.email,
      password: doc.password,
      phone: doc.phone,
      createdAt: doc.createdAt,
      isBlocked: doc.isBlocked,
      updatedAt: doc.updatedAt,
      isVerified: doc.isVerified,
      isRequested: doc.isRequested,
      companyRequests: doc.companyRequests ?? [],
      experience: doc.experience || [],
      education: doc.education || [],
      resumes: doc.resumes || [],
      title: doc.title ?? undefined,
      imageUrl: doc.imageUrl ?? undefined,
      name: doc.name ?? undefined,
      savedJobs: doc.savedJobs.map((_id: Types.ObjectId) => _id.toString()),
    };
  }

  async saveJob(userId: string, jobId: string): Promise<User | null> {
    const updated = await this._model.findByIdAndUpdate(userId, {
      $addToSet: { savedJobs: jobId },
    });
    if (!updated) return null;
    return this.mapToEntity(updated);
  }

  async removeSavedJob(userId: string, jobId: string): Promise<User | null> {
    const updated = await this._model.findByIdAndUpdate(userId, {
      $pull: { savedJobs: jobId },
    });
    if (!updated) return null;
    return this.mapToEntity(updated);
  }
}
