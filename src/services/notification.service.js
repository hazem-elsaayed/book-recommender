import { NotificationProviderFactory } from '../factories/notificationProvider.factory.js';

export class NotificationService {
  constructor(userService) {
    this.userService = userService;
  }

  async sendNotification({ userId }, message) {
    try {
      const user = await this.userService.getUserById(userId);
      const notificationProvider = NotificationProviderFactory.getProvider(
        process.env.NOTIFICATION_PROVIDER
      );
      await notificationProvider.sendNotification(user, message);
      return { message: `Notification sent to ${user.name}`, success: true };
    } catch (error) {
      console.error(error);
      // improvement: send to a message broker for retry
      return { error: 'Failed to send notification', success: false };
    }
  }
}
