export type MessageType = {
  id: string;
  chatroomId: string;
  attachments: Attachment[];
  sender: 'user' | 'participant';
  reciever: 'user' | 'participant';
  message: string;
  sendTime: string;
  status: string;
};

export type Attachment = {
  key: string;
  name: string;
  mimeType: string;
  size: number;
  kind: 'image' | 'video' | 'audio' | 'document' | 'file';
};
