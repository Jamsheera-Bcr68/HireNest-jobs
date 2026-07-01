import { Socket } from "socket.io";
import { tokenService ,companyService} from "../../../infrastructure/config/di";
import { TokenPayload } from "../../../applications/interfaces/services/token.service";
import { AppError } from "../../../domain/errors/app-error";
import { generalMessages } from "../../../shared/constants/messages/general.messages";
import { authMessages } from "../../../shared/constants/messages/auth.mesages";
import { statusCodes } from "../../../shared/enums/statuscodes";
import { UserRole } from "../../../domain/enums/user.enums";


export const socketAuthMiddlewere=async(socket:Socket,next:(err?:Error)=>void)=>{
try {
    const token=socket.handshake.auth.token
   
    console.log('socket.handshake',socket.handshake);
    
    const payload:TokenPayload=tokenService.verifyAccessToken(token)
    socket.data.user=payload
    
    if(payload.role===UserRole.COMPANY){
        const companyId=await companyService.getCompanyIdByUserId(payload.userId)
          socket.data.user={...socket.data.user,userId:companyId}
    }
    console.log('from socket auth middlewere,user is',socket.data.user);
    
    next()
} catch (error) {
    console.log('from socket auth middlewere,error is',error);
     next(new Error('Unauthorized'));
   
}
}