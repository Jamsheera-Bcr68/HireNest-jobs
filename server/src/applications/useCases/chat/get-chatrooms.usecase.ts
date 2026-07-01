import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IChatroomRepository } from '../../../domain/repository-interfaces/chatroom.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { getTime } from '../../../shared/utils';
import { ChatroomDto, ChatroomFilterDto } from '../../dtos/chatroom.dto';


import { IPresenceService } from '../../interfaces/services/presence.service.interface';

export interface IGetChatromsUsecase {
  execute(userId: string, role: UserRole): Promise<ChatroomDto[]>;
}

export class GetChatroomsUsecase implements IGetChatromsUsecase {
  constructor(
    private _chatroomRepository: IChatroomRepository,
    private _companyRepository: ICompanyRepository,
    private _presenceService:IPresenceService
  ) {}
  async execute(userId: string, role: UserRole): Promise<ChatroomDto[]> {
    let filter: ChatroomFilterDto = {};
  //  console.log('from usecase', userId, role);

    if (role === UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company || !company.id)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      filter.companyId = company.id;
    } else if (role === UserRole.CANDIDATE) filter.candidateId = userId;
    else
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const chatrooms = await this._chatroomRepository.getChatrooms(
      filter,

      role
    );
   // console.log('chat rooms from usecase', chatrooms);
    return chatrooms.map((ch) => ({
      ...ch,
      isOnline: this._presenceService.isOnline(ch.participantId),
    
      context: ch.jobTitle,
      participantRole:role==UserRole.CANDIDATE?UserRole.COMPANY:UserRole.CANDIDATE,
      lastMessagedAt: ch.lastMessagedAt?.toLocaleString() ?? undefined,
      time:ch.lastMessagedAt?getTime(new Date(ch.lastMessagedAt)):''

    }));
  }
}
