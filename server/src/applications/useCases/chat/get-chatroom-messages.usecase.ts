import { Message } from '../../../domain/entities/message.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IChatroomRepository } from '../../../domain/repository-interfaces/chatroom.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IMessageRepository } from '../../../domain/repository-interfaces/message.repository.interface';
import { IChatroomDocument } from '../../../infrastructure/database/models/chatroom.model';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { MessageDto } from '../../dtos/messages.dto';
import { MessageMapper } from '../../mappers/message.mapper';

export interface IGetChatroomMessagesUsecase {
  execute(
    userId: string,
    chatroomId: string,
    role: string
  ): Promise<MessageDto[]>;
}

export class GetChatroomMessagesUsecase implements IGetChatroomMessagesUsecase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _chatroomRepository: IChatroomRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(
    userId: string,
    chatroomId: string,
    role: string
  ): Promise<MessageDto[]> {
    const chatroom = await this._chatroomRepository.findById(chatroomId);
  //  console.log('chatroom id',chatroomId);
    
    if (!chatroom)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Chatroom'),
        statusCodes.NOTFOUND
      );

    let participantId = userId;
    if (role === UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company || !company.id)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );

      participantId = company.id;
    }

    const isAuthorized =
      chatroom.candidateId === participantId ||
      chatroom.companyId === participantId;
    if (!isAuthorized)
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    const messages = await this._messageRepository.findByChatroomId(chatroomId);
    await this._messageRepository.markAllAsread(chatroomId)
    return messages.map((m) => MessageMapper.toMessageDto(m, participantId));
  }
}
