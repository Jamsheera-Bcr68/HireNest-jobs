import { INotificationRepository } from "../../../domain/repository-interfaces/notification.repository.interface";

export interface IMarkAllNotificationsAsReadUsecase {
    execute(userId:string):Promise<void>
}

export class MarkAllNotificationsAsReadUsecase implements IMarkAllNotificationsAsReadUsecase{
    constructor(private _notificationRepository:INotificationRepository){}

    async execute(userId: string): Promise<void> {
       await this._notificationRepository.markAllAsRead(userId)


    }
}