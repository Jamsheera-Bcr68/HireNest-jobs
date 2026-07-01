export interface Chatroom {
  id?: string;
  companyId: string;
  candidateId: string;
  jobId: string;
  lastMessage?: string;
  lastMessagedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
