import { IAttachment, Message } from '../../../domain/entities/message.entity';
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
import path from 'path';
import {
  AggregatedChatroomDto,
  ChatroomDto,
  sendMessageInputDto,
} from '../../dtos/chatroom.dto';

import { presenceService } from '../../../infrastructure/config/di';
import { getTime } from '../../../shared/utils';
import { IFileStorageService } from '../../interfaces/services/file-storage.service';
import { UploadFileDto } from '../../dtos/upload-file.dto';
import { getFileKind } from '../../utils/get-filetype';
import { IFileResolverService } from '../../services/file-url-resolver.service';

export interface ISendMessageUsecase {
  execute(
    payload: sendMessageInputDto
  ): Promise<{ message?: MessageDto; chatroom: ChatroomDto }>;
}

export class SendMessageUsecase implements ISendMessageUsecase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _chatroomRepository: IChatroomRepository,
    private _companyRepository: ICompanyRepository,
    private _fileUploadservice: IFileStorageService,
    private _fileResolverService: IFileResolverService
  ) {}

  async execute(
    payload: sendMessageInputDto
  ): Promise<{ message?: MessageDto; chatroom: ChatroomDto }> {
    const { chatroomId, userId, role, textMessage, attachements } = payload;
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
    let files: UploadFileDto[] = [];
    if (attachements.length) {
      files = attachements.map((a) => {
        return {
          buffer: a.buffer,
          mimetype: a.mimetype,
          size: a.size,
          originalName: a.originalname,
        };
      });
    }
    const attachmentDatas: IAttachment[] = await Promise.all(
      files.map(async (f) => {
        return {
          key: await this._fileUploadservice.uploadFile(
            f,
            'chat/attachments',
            path.extname(f.originalName)
          ),
          name: f.originalName,
          mimeType: f.mimetype,
          size: f.size,

          kind: getFileKind(f.originalName),
        };
      })
    );
    const messageData: Partial<Message> = {
      senderId: participantId,
      recieverId:
        role === UserRole.CANDIDATE ? chatroom.companyId : chatroom.candidateId,
      chatroomId,
      text: textMessage,
      attachments: attachmentDatas,

      isRead: false,
    };

    const msg = await this._messageRepository.create(messageData);
    await this._chatroomRepository.update(chatroomId, {
      lastMessageId: msg.id,
    });
    const fileResolver = this._fileResolverService.createResolver();

    msg.attachments = await Promise.all(
      msg.attachments.map(async (at) => {
        return {
          key: (await fileResolver(at.key)) ?? at.key,
          name: at.name,
          mimeType: at.mimeType,
          size: at.size,
          kind: at.kind,
        };
      })
    );
    const updatedChatroom: AggregatedChatroomDto =
      await this._chatroomRepository.getChatroom(
        chatroomId,
        role === UserRole.COMPANY ? UserRole.CANDIDATE : UserRole.COMPANY,
        msg.recieverId
      );

    if (!textMessage && !attachements.length)
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
        msg: MessageMapper.toMessageDto(msg, msg.recieverId),
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
