import { GenericRepository } from './generic.repository';
import { IChatroomRepository } from '../../domain/repository-interfaces/chatroom.repository.interface';
import { Chatroom } from '../../domain/entities/chatroom.entity';
import { participantConfig } from '../../shared/constants/messages/repository-constants/participant.config';
import { mongo, Types } from 'mongoose';
import {
  AggregatedChatroomDto,
  ChatroomDocType,
  ChatroomInputDto,
} from '../../applications/dtos/chatroom.dto';
import {
  ChatroomFilterDto,
  ChatroomDto,
} from '../../applications/dtos/chatroom.dto';
import { PipelineStage } from 'mongoose';
import {
  IChatroomDocument,
  chatroomModel,
} from '../database/models/chatroom.model';
import mongoose from 'mongoose';
import { UserRole } from '../../domain/enums/user.enums';

export class ChatroomRepository
  extends GenericRepository<Chatroom, IChatroomDocument>
  implements IChatroomRepository
{
  constructor() {
    super(chatroomModel);
  }
  protected mapToEntity(doc: IChatroomDocument): Chatroom {
    return {
      id: doc._id.toString(),
      companyId: doc.companyId.toString(),
      candidateId: doc.candidateId.toString(),
      jobId: doc.jobId.toString(),
      lastMessage: doc.lastMessage,
      lastMessagedAt: doc.lastMessagedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    } as Chatroom;
  }

  async getChatrooms(
    filter: ChatroomFilterDto,
    role: UserRole.CANDIDATE | UserRole.COMPANY
  ): Promise<AggregatedChatroomDto[]> {
    // console.log('from repo chat', filter, role);

    const { companyId, candidateId } = filter;
    let partcipantId: string;
    const matchStage: PipelineStage.Match['$match'] = {};
    if (candidateId) {
      matchStage.candidateId = new Types.ObjectId(candidateId);
      partcipantId = candidateId;
    } else if (companyId) {
      matchStage.companyId = new Types.ObjectId(companyId);
      partcipantId = companyId;
    } else return [];

    const config: {
      from: string;
      localField: string;
      nameField: string;
      imageField: string;
    } = participantConfig[role];

    const projectStage: PipelineStage.Project['$project'] = {
      _id: 0,
      id: { $toString: '$_id' },
      lastMessage: '$lastMessage',
      lastMessagedAt: '$lastMessagedAt',
      jobTitle: '$job.title',
      participantName: `$participant.${config.nameField}`,
      imageUrl: `$participant.${config.imageField}`,
      participantId: { $toString: `$participant._id` },
      unreadCount: '$unreadCount',
    };

    const aggregatedChatrooms: AggregatedChatroomDto[] =
      await this._model.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: 'messages',
            localField: '_id',
            foreignField: 'chatroomId',
            as: 'messages',
          },
        },
        {
          $addFields: {
            unreadCount: {
              $size: {
                $filter: {
                  input: '$messages',
                  as: 'msg',
                  cond: {
                    $and: [
                      { $eq: ['$$msg.isRead', false] },
                      {
                        $ne: [
                          '$$msg.senderId',
                          new mongoose.Types.ObjectId(partcipantId),
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: config.from,
            localField: config.localField,
            foreignField: '_id',
            as: 'participant',
          },
        },
        { $unwind: '$participant' },
        {
          $lookup: {
            from: 'jobs',
            localField: 'jobId',
            foreignField: '_id',
            as: 'job',
          },
        },
        { $unwind: '$job' },

        { $project: projectStage },
        { $sort: { lastMessagedAt: -1 } },
      ]);
    // console.log('from repo,aggregatedChatroom', aggregatedChatrooms);

    return aggregatedChatrooms.map((doc) => this.mapToChatroomList(doc));
  }

  protected mapToPersistance(
    entity: Partial<Chatroom>
  ): Partial<IChatroomDocument> {
    let data: Partial<IChatroomDocument> = {};
    if (entity.id) data._id = new mongoose.Types.ObjectId(entity.id);
    if (entity.companyId)
      data.companyId = new mongoose.Types.ObjectId(entity.companyId);
    if (entity.candidateId)
      data.candidateId = new mongoose.Types.ObjectId(entity.candidateId);
    if (entity.jobId) data.jobId = new mongoose.Types.ObjectId(entity.jobId);
    if (entity.lastMessage) data.lastMessage = entity.lastMessage;
    if (entity.lastMessagedAt) data.lastMessagedAt = entity.lastMessagedAt;
    if (entity.createdAt) data.createdAt = entity.createdAt;

    return data;
  }

  async isParticipant(
    chatroomId: string,
    participantId: string
  ): Promise<boolean> {
    const chatroom = await this._model.findById(chatroomId);
    if (!chatroom) return false;
    let userId = new mongoose.Types.ObjectId(participantId);

    return (
      chatroom.companyId.equals(userId) || chatroom.candidateId.equals(userId)
    );
  }

  private mapToChatroomList(doc: AggregatedChatroomDto): AggregatedChatroomDto {
    return {
      id: doc.id,
      lastMessage: doc.lastMessage,
      lastMessagedAt: doc.lastMessagedAt,
      imageUrl: doc.imageUrl,
      jobTitle: doc.jobTitle,
      participantName: doc.participantName,
      unreadCount: doc.unreadCount,
      participantId: doc.participantId,
    };
  }

  async getChatroom(
    chatroomId: string,
    role: UserRole.CANDIDATE | UserRole.COMPANY,participantId:string
  ): Promise<AggregatedChatroomDto> {
    const matchStage: PipelineStage.Match['$match'] = {
      _id:new mongoose.Types.ObjectId(chatroomId),
    };
     const config: {
      from: string;
      localField: string;
      nameField: string;
      imageField: string;
    } = participantConfig[role];

    const projectStage: PipelineStage.Project['$project'] = {
      _id: 0,
      id: { $toString: '$_id' },
      lastMessage: '$lastMessage',
      lastMessagedAt: '$lastMessagedAt',
      jobTitle: '$job.title',
      participantName: `$participant.${config.nameField}`,
      imageUrl: `$participant.${config.imageField}`,
      participantId: { $toString: `$participant._id` },
      unreadCount: '$unreadCount',
    };

     const aggregatedChatroom: AggregatedChatroomDto[] =
      await this._model.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: 'messages',
            localField: '_id',
            foreignField: 'chatroomId',
            as: 'messages',
          },
        },
        {
          $addFields: {
            unreadCount: {
              $size: {
                $filter: {
                  input: '$messages',
                  as: 'msg',
                  cond: {
                    $and: [
                      { $eq: ['$$msg.isRead', false] },
                      {
                        $ne: [
                          '$$msg.senderId',
                          new mongoose.Types.ObjectId(participantId),
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: config.from,
            localField: config.localField,
            foreignField: '_id',
            as: 'participant',
          },
        },
        { $unwind: '$participant' },
        {
          $lookup: {
            from: 'jobs',
            localField: 'jobId',
            foreignField: '_id',
            as: 'job',
          },
        },
        { $unwind: '$job' },

        { $project: projectStage },
        { $sort: { lastMessagedAt: -1 } },
      ]);
      return this.mapToChatroomList(aggregatedChatroom[0])
  }
}
