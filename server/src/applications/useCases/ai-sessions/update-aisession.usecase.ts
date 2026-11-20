import { AiSession } from '../../../domain/entities/ai-session.entity';
import { AISessionStatusEnum } from '../../../domain/enums/interview.enum';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IAiSessionRepository } from '../../../domain/repository-interfaces/ai-session.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { IUpdateEntityUseCase } from '../../interfaces/usecases/update-entity.usecase.interface';

export class UpdateAIsessionUsecase implements IUpdateEntityUseCase<
  AiSession,
  void
> {
  constructor(
    private _aiSessionRepository: IAiSessionRepository,
    private _userRepository: IUserRepository,
    private _companyRepository: ICompanyRepository
  ) {}
  async execute(
    id: string,
    role: UserRole,
    userId: string,
    data: Partial<AiSession>
  ): Promise<void> {
    if (role !== UserRole.CANDIDATE) {
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    }
    const session = await this._aiSessionRepository.findById(id);
    if (!session) {
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Session'),
        statusCodes.NOTFOUND
      );
    }
    if (session.candidateId !== userId) {
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );
    }
    if (session.status == AISessionStatusEnum.COMPLETED) {
      throw new AppError(
        generalMessages.errors.INTERVIEW_ALREADY_COMPLETED,
        statusCodes.CONFLICT
      );
    }
    // const updatedData: Partial<AiSession> = {};

    await this._aiSessionRepository.save(id, { ...session, ...data });
  }
}
