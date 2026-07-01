import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IChatroomRepository } from '../../../domain/repository-interfaces/chatroom.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IMessageRepository } from '../../../domain/repository-interfaces/message.repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export interface IGetUnreadMessageCountUsecase {
  execute(userId: string, role: UserRole): Promise<number>;
}

export class GetUnreadMessageCountUsecase implements IGetUnreadMessageCountUsecase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _companyRepository: ICompanyRepository,

  ) {}

  async execute(userId: string, role: UserRole): Promise<number> {
    let paricipantId: string = userId;
    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);

      if (!company || !company.id)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      paricipantId = company.id;
      
     
    }
     const unreadCount=await this._messageRepository.getUnreadCount(paricipantId)
      
      return unreadCount
  }
}
