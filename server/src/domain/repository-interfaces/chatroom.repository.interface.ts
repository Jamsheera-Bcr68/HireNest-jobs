import {
  ChatroomFilterDto,
  ChatroomInputDto,
  AggregatedChatroomDto,
  ChatroomDocType,
} from '../../applications/dtos/chatroom.dto';
import { Chatroom } from '../entities/chatroom.entity';
import { UserRole } from '../enums/user.enums';
import { IBaseRepository } from './base-repository.interface';

export interface IChatroomRepository extends IBaseRepository<Chatroom> {
  getChatrooms(
    filter: ChatroomFilterDto,
    role: UserRole
  ): Promise<AggregatedChatroomDto[]>;
  isParticipant(chatroomId: string, participantId: string): Promise<boolean>;
  getChatroom(chatroomId: string, role: UserRole,participantId:string): Promise<AggregatedChatroomDto>;
}
