import { AppError } from '../../../domain/errors/app-error';
import { IChatroomRepository } from '../../../domain/repository-interfaces/chatroom.repository.interface';
import { IMessageRepository } from '../../../domain/repository-interfaces/message.repository.interface';
import { getIO } from '../../../infrastructure/socket';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { statusCodes } from '../../../shared/enums/statuscodes';

export interface IMarkChatroomMessagesAsReadUsecase {
  execute(chatroomId: string, currentUserId: string): Promise<string>;
}

export class MarkChatroomMessagesAsReadUsecase implements IMarkChatroomMessagesAsReadUsecase {
  constructor(
    private _messageRepository: IMessageRepository,
    private _chatroomRepository: IChatroomRepository
  ) {}

  async execute(chatroomId: string, currentUserId: string): Promise<string> {
    const chatroom = await this._chatroomRepository.findById(chatroomId);
    if (!chatroom)
      throw new AppError(
        generalMessages.errors.NOT_FOUND('Chatroom'),
        statusCodes.NOTFOUND
      );

    await this._messageRepository.markAllAsread(chatroomId);

    getIO().to(currentUserId).emit('marked-as-read', { chatroomId });
    return chatroomId;
  }
}
