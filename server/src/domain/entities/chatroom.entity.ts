export interface Chatroom {
  id: string;
  companyId: string;
  candidateId: string;
  jobId: string;
  lastMessageId?: string;

  createdAt: Date;
  updatedAt: Date;
}
