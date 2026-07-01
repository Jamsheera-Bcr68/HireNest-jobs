export interface MessageDto {
  id?: string;
  sender: 'user' | 'participant';
  reciever: 'user' | 'participant';
  message:string
  sendTime:string
}

export interface MessageFilterDto{
  chatroomId?:string
}
