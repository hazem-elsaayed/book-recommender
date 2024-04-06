import axios from 'axios';
import { STATUS_CODES, URLS } from '../utils/constants.js';

export class SmsNotificationProvider {
  async sendNotification({ phone }, message) {
    const response = await axios.post(URLS.SMS_PROVIDER_URL, {
      phone,
      message,
    });

    if (response.status !== STATUS_CODES.OK) {
      throw new Error('Failed to send sms notification');
    }

    console.log(`SMS notification: ${message}`);
  }
}
