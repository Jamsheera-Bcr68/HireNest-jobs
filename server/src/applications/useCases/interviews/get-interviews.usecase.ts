import { Interview } from '../../../domain/entities/interview.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { IInterviewRepository } from '../../../domain/repository-interfaces/interview.repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { InterviewFilterDto, InterviewListDto } from '../../dtos/interview.dto';
import { IGetAllEntitiesUsecase } from '../../interfaces/usecases/get-all-entities.usecase.interface';
import { AppError } from '../../../domain/errors/app-error';
import { InterviewMapper } from '../../mappers/interview.mapper';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IUserRepository } from '../../../domain/repository-interfaces/user-repository.interface';
import { IChatroomRepository } from '../../../domain/repository-interfaces/chatroom.repository.interface';
import { InterviewStatusEnum } from '../../../domain/enums/status.enum';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';

export class GetInterviewsUsecase implements IGetAllEntitiesUsecase<
  InterviewListDto,
  InterviewFilterDto
> {
  constructor(
    private _interviewRepository: IInterviewRepository,
    private _companyRepository: ICompanyRepository,
    private _userRepository: IUserRepository,
    private _chatReposiory: IChatroomRepository,
    private _fileStorageService: IFileStorageService
  ) {}

  async execute(
    filter: Partial<InterviewFilterDto>,
    role: UserRole,
    userId: string
  ): Promise<InterviewListDto> {
    //  console.log('filter from usecase', filter);

    if (role === UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);

      if (!company)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company '),
          statusCodes.NOTFOUND
        );
      filter.companyId = company.id;
    } else if (role === UserRole.CANDIDATE) {
      const candidate = await this._userRepository.findById(userId);
      if (!candidate)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Candidate '),
          statusCodes.NOTFOUND
        );
      filter.candidateId = userId;
    }

    const { interviews, totalDocs } =
      await this._interviewRepository.getAllInterviews(filter);

    const chatAllowed: Array<InterviewStatusEnum> = [
      InterviewStatusEnum.SCHEDULED,
      InterviewStatusEnum.COMPLETED,
    ];

    ///////////
    const logoCache = new Map<string, string | null>();

    const resolveLogo = async (key: string|null) => {
      if(!key)return ''
      if (!logoCache.has(key)) {
        logoCache.set(key, await this._fileStorageService.getFileUrl(key));
      }
      return logoCache.get(key)!;
    };

    const chatrooms = await this._chatReposiory.getChatroomsByParticipants(
      filter.companyId,
      filter.candidateId
    );


    const updated = await Promise.all(
      interviews.map(async (int) => {
        int.companyLogo =await resolveLogo(int.companyLogo)
        int.candidateImageUrl=await resolveLogo(int.candidateImageUrl)
        if (chatAllowed.includes(int.status)) {
          const chat = chatrooms.find(
            (ch) =>
              ch.companyId == int.companyId && ch.candidateId == int.candidateId
          );
          if (!chat)
            throw new AppError(
              generalMessages.errors.NOT_FOUND('Chatroom'),
              statusCodes.NOTFOUND
            );
          return InterviewMapper.toInterviewDto(int, chat.id);
        }
          return InterviewMapper.toInterviewDto(int) 
      })
    );

    //////
    // const updatedInterviews = await Promise.all(
    //   interviews.map(async (int) => {
    //     if (chatAllowed.includes(int.status)) {
    //       const chatroom = await this._chatReposiory.findOne({
    //         companyId: int.companyId,
    //         candidateId: int.candidateId,
    //       });

    //       if (!chatroom)
    //         throw new AppError(
    //           generalMessages.errors.NOT_FOUND('Chatroom'),
    //           statusCodes.NOTFOUND
    //         );

    //       return InterviewMapper.toInterviewDto(int, chatroom.id);
    //     }

    //     int.companyLogo = await this._fileStorageService.getFileUrl(
    //       int.companyLogo
    //     );

    //     return InterviewMapper.toInterviewDto(int);
    //   })
    // );

    return {
      interviews: updated,

      totalDocs,
    };
  }
}
