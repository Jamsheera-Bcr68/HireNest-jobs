export interface Message{
    id?:string,
    senderId:string,
    recieverId:string
    isRead:boolean
    chatroomId:string
    createdAt:Date,
    updatedAt:Date
    message:string
}