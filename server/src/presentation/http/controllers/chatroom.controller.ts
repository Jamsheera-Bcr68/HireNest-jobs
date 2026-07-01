import { success } from 'zod';
import { IGetChatromsUsecase } from '../../../applications/useCases/chat/get-chatrooms.usecase';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { asyncHandler } from '../middleweres/async-handler';
import { Request, Response } from 'express';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { IGetChatroomMessagesUsecase } from '../../../applications/useCases/chat/get-chatroom-messages.usecase';
import { ISendMessageUsecase } from '../../../applications/useCases/chat/send-message.usecase';

export class ChatroomController {
  constructor(
    private _getChatroomsUsecase: IGetChatromsUsecase,
    private _getChatroomMessagesUsecase: IGetChatroomMessagesUsecase,
    private _sendMessageUsecase: ISendMessageUsecase
  ) {}

  getChatrooms = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    //console.log(`from chatroom controller ,user`, user);

    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const chatrooms = await this._getChatroomsUsecase.execute(
      user.userId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITIES_FETCHED('Chatrooms'),
      chatrooms,
    });
  });

  getChatroomMessages = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const { chatroomId } = req.params;
    //  console.log(`chatroom id `, chatroomId);
    if (!chatroomId)
      if (!user)
        throw new AppError(
          authMessages.error.BAD_REQUEST,
          statusCodes.BADREQUEST
        );

    const messages = await this._getChatroomMessagesUsecase.execute(
      user.userId,
      chatroomId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITIES_FETCHED('Messages'),
      messages,
    });
  });

  sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const { chatroomId } = req.params;
    //  console.log(`chatroom id `, chatroomId);
    if (!chatroomId)
      if (!user)
        throw new AppError(
          authMessages.error.BAD_REQUEST,
          statusCodes.BADREQUEST
        );

    const { text } = req.body;

    const { message, } = await this._sendMessageUsecase.execute(
      user.userId,
      text,
      chatroomId,
      user.role
    );

    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITY_CREATED('Messages', 'send'),
      msg: message,
     
    });
  });
}
