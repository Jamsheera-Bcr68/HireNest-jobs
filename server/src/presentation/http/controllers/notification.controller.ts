import { asyncHandler } from '../middleweres/async-handler';
import { IGetNewNotificationCountUsecase } from '../../../applications/useCases/notifications/get-count.usecase';
import { AppError } from '../../../domain/errors/app-error';
import { authMessages } from '../../../shared/constants/messages/auth.mesages';
import { statusCodes } from '../../../shared/enums/statuscodes';
import { Request, Response } from 'express';
import { generalMessages } from '../../../shared/constants/messages/general.messages';
import { NotificationDto } from '../../../applications/dtos/notification.dto';
import { IGetAllEntitiesUsecase } from '../../../applications/interfaces/usecases/get-all-entities.usecase.interface';
import { NotificationFilterType } from '../../../applications/types/notification.type';
import { boolean } from 'zod';
import { partial } from 'zod/v4/core/util.cjs';
import { IMarkAsReadUsecase } from '../../../applications/useCases/notifications/mark-as-read.usecase';
import { IMarkAllNotificationsAsReadUsecase } from '../../../applications/useCases/notifications/mark-all-as-read.usecase';
import { IDeleteNotificationUsecase } from '../../../applications/useCases/notifications/delete-notification.usecase';

export class NotificationControlller {
  constructor(
    private _getNewNotificationCount: IGetNewNotificationCountUsecase,
    private _getNotificationsUsecase: IGetAllEntitiesUsecase<
      NotificationDto[],
      NotificationFilterType
    >,
    private _markAsReadUsecase: IMarkAsReadUsecase,
    private _markAllAsReadUsecase: IMarkAllNotificationsAsReadUsecase,
    private _deleteNotificationUsecase: IDeleteNotificationUsecase
  ) {}

  getCount = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const count = await this._getNewNotificationCount.execute(
      user.userId,
      user.role
    );
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.NEW_NOTIFICATION_COUNT_FETCHED,
      count,
    });
  });

  getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    console.log('user', user);
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );
    const { value } = req.query;

    console.log(value, user.userId);
    const filter: Partial<NotificationFilterType> = {};
    if (value == 'new') {
      filter.isRead = false;
    }

    filter.userId = user.userId;

    const notifications = await this._getNotificationsUsecase.execute(
      filter,
      user.role
    );

    // console.log('notifications', notifications);
    return res.status(statusCodes.OK).json({
      success: true,
      message: generalMessages.success.ENTITIES_FETCHED('Notifications'),
      notifications,
    });
  });

  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    console.log('from notification controller');

    const user = req.user;
    console.log('user', user);
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const { id } = req.params;

    if (!id)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Notification'),
        statusCodes.BADREQUEST
      );

    console.log(id);

    await this._markAsReadUsecase.execute(id, user.userId, user.role);

    return res
      .status(statusCodes.OK)
      .json({ success: true, message: generalMessages.success.MARK_AS_READ });
  });

  markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
    console.log('from notification controller');

    const user = req.user;
    console.log('user', user);
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    await this._markAllAsReadUsecase.execute(user.userId);

    return res
      .status(statusCodes.OK)
      .json({ success: true, message: generalMessages.success.MARK_AS_READ });
  });

  deleteNotification = asyncHandler(async (req: Request, res: Response) => {
    console.log('from notification controller');

    const user = req.user;
    console.log('user', user);
    if (!user)
      throw new AppError(
        authMessages.error.UNAUTHORIZED,
        statusCodes.UNAUTHERIZED
      );

    const { id } = req.params;

    if (!id)
      throw new AppError(
        generalMessages.errors.ID_NOT_FOUND('Notification'),
        statusCodes.BADREQUEST
      );

    console.log(id);

    await this._deleteNotificationUsecase.execute(id, user.userId, user.role);

    return res
      .status(statusCodes.OK)
      .json({
        success: true,
        message: generalMessages.success.NOTIFICATION_DELETED,
      });
  });
}
