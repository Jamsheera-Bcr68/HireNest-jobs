import { Message } from '../../../domain/entities/message.entity';
import { UserRole } from '../../../domain/enums/user.enums';
import { AppError } from '../../../domain/errors/app-error';
import { IChatroomRepository } from '../../../domain/repository-interfaces/chatroom.repository.interface';
import { ICompanyRepository } from '../../../domain/repository-interfaces/company-repository.interface';
import { IMessageRepository } from '../../../domain/repository-interfaces/message.repository.interface';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { MessageDto } from '../../dtos/messages.dto';
import { MessageMapper } from '../../mappers/message.mapper';
import { getIO } from '../../../infrastructure/socket';
import { AggregatedChatroomDto, ChatroomDto } from '../../dtos/chatroom.dto';
import { ChatroomMapper } from '../../mappers/chatroom.mapper';
import { presenceService } from '../../../infrastructure/config/di';
import { getTime } from '../../../shared/utils';

export interface ISendMessageUsecase {
  execute(
    userId: string,
    message: string,
    chatroomId: string,
    role: UserRole
  ): Promise<{ message: MessageDto; chatroom: ChatroomDto }>;
}

export class SendMessageUsecase implements ISendMessageUsecase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _chatroomRepository: IChatroomRepository,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute(
    userId: string,
    message: string,
    chatroomId: string,
    role: UserRole
  ): Promise<{ message: MessageDto; chatroom: ChatroomDto }> {
    const chatroom = await this._chatroomRepository.findById(chatroomId);
    if (!chatroom)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Charoom'),
        statusCodes.NOTFOUND
      );
    let participantId = userId;
    if (role == UserRole.COMPANY) {
      const company = await this._companyRepository.findByUserId(userId);
      if (!company || !company.id)
        throw new AppError(
          generalMessages.errors.NOT_FOUND('Company'),
          statusCodes.NOTFOUND
        );
      participantId = company.id;
    }
    if (!this._chatroomRepository.isParticipant(chatroomId, participantId))
      throw new AppError(
        generalMessages.errors.FORBIDDEN,
        statusCodes.FORBIDDEN
      );

    const messageData: Partial<Message> = {
      senderId: participantId,
      recieverId:
        role === UserRole.CANDIDATE ? chatroom.companyId : chatroom.candidateId,
      chatroomId: chatroomId,
      message: message,
      isRead: false,
    };

    const msg = await this._messageRepository.create(messageData);
    const new_chatroom = await this._chatroomRepository.update(chatroomId, {
      lastMessage: message,
      lastMessagedAt: new Date(),
    });
    const updatedChatroom: AggregatedChatroomDto =
      await this._chatroomRepository.getChatroom(
        chatroomId,
        role === UserRole.COMPANY ? UserRole.CANDIDATE : UserRole.COMPANY,
        msg.recieverId
      );
    console.log('from send msg usecaser', updatedChatroom);

    if (!message)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Message'),
        statusCodes.NOTFOUND
      );

    const isPartipantOnline = presenceService.isOnline(
      updatedChatroom.participantId
    );

    getIO()
      .to(msg.recieverId)
      .emit('message', {
        msg,
        updatedChatroom: {
          ...updatedChatroom,

          isOnline: isPartipantOnline,
          context: updatedChatroom.jobTitle,
          participantRole:
            role == UserRole.CANDIDATE ? UserRole.COMPANY : UserRole.CANDIDATE,
          lastMessagedAt:
            updatedChatroom.lastMessagedAt?.toLocaleString() ?? undefined,
          time: updatedChatroom.lastMessagedAt
            ? getTime(new Date(updatedChatroom.lastMessagedAt))
            : '',
        },
      });

    return {
      message: MessageMapper.toMessageDto(msg, participantId),
      chatroom: {
        ...updatedChatroom,

        isOnline: isPartipantOnline,
        context: updatedChatroom.jobTitle,
        participantRole:
          role == UserRole.CANDIDATE ? UserRole.COMPANY : UserRole.CANDIDATE,
        lastMessagedAt:
          updatedChatroom.lastMessagedAt?.toLocaleString() ?? undefined,
        time: updatedChatroom.lastMessagedAt
          ? getTime(new Date(updatedChatroom.lastMessagedAt))
          : '',
      },
    };
  }
}
