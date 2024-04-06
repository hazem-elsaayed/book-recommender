import { EmailNotificationProvider } from '../notificationProviders/emailProvider.js';
import { SmsNotificationProvider } from '../notificationProviders/smsProvider.js';
import { PROVIDER_TYPES } from '../utils/constants.js';

export class NotificationProviderFactory {
  static getProvider(providerType) {
    switch (providerType) {
      case PROVIDER_TYPES.EMAIL:
        return new EmailNotificationProvider();
      case PROVIDER_TYPES.SMS:
        return new SmsNotificationProvider();
      default:
        throw new Error(`Notification provider ${providerType} not supported`);
    }
  }
}
