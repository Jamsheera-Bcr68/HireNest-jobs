import { Response,Request } from "express";
import { IMessageRepository } from "../../../domain/repository-interfaces/message.repository.interface";
import { asyncHandler } from "../middleweres/async-handler";
import { AppError } from "../../../domain/errors/app-error";
import { authMessages } from "../../../shared/constants/messages/auth.mesages";
import { statusCodes } from "../../../shared/enums/statuscodes";
import { IGetUnreadMessageCountUsecase } from "../../../applications/useCases/messages/get_unread_count.usecase";
import { generalMessages } from "../../../shared/constants/messages/general.messages";

export class MessageController{
    constructor(private _getUnreadMessageCountUsecase:IGetUnreadMessageCountUsecase){}

    getUnreadMessageCount=asyncHandler(async(req:Request,res:Response)=>{
      //  console.log('from uneread count controller');
       const user=req.user
       if(!user)throw new AppError(authMessages.error.UNAUTHORIZED,statusCodes.NOTFOUND)
        
        const unreadCount=await this._getUnreadMessageCountUsecase.execute(user.userId,user.role)
        return res.status(statusCodes.OK).json({success:true,message:generalMessages.success.NEW_MESSAGES_COUNT_FETCHED,count:unreadCount})
    })
}