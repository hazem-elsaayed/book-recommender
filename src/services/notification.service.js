import { NotificationProviderFactory } from '../factories/notificationProvider.factory.js';

export class NotificationService {
  constructor(userService) {
    this.userService = userService;
  }

  async sendNotification(user) {
    try {
      const notificationProvider = NotificationProviderFactory.getProvider(
        process.env.NOTIFICATION_PROVIDER
      );
      await notificationProvider.sendNotification(user, this.getMessage(user));
      return { message: `Notification sent to ${user.name}`, success: true };
    } catch (error) {
      console.error(error);
      // improvement: send to a message broker for retry
      return { error: 'Failed to send notification', success: false };
    }
  }

  getMessage({ name }) {
    return `Dear ${name}, 

    Thank you for your submission! We appreciate your contribution and value your participation. Your support means a lot to us.

    Best regards,
    The Book Recommender Team`;
  }
}
