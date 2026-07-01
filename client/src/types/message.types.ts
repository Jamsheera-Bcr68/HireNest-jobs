export type MessageType={
    id:string,
    chatroomId:string,
    sender:'user'|'participant'
    reciever:'user'|'participant'
    message:string
    sendTime:string
    status:string
}