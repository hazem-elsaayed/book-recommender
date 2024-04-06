import axios from 'axios';
import { STATUS_CODES, URLS } from '../utils/constants.js';

export class EmailNotificationProvider {
  async sendNotification({ email }, message) {
    const response = await axios.post(URLS.EMAIL_PROVIDER_URL, {
      email,
      message,
    });

    if (response.status !== STATUS_CODES.OK) {
      throw new Error('Failed to send email notification');
    }

    console.log(`Email notification: ${message}`);
  }
}
