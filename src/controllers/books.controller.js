import { STATUS_CODES } from '../utils/constants.js';

export class BookController {
  constructor(bookService, notificationService) {
    this.bookService = bookService;
    this.notificationService = notificationService;
  }

  submitBookInterval = async (req, res, next) => {
    try {
      const result = await this.bookService.submitBookInterval(req.body);
      await this.notificationService.sendNotification(req.body);
      return res.status(STATUS_CODES.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  getRecommendedBooks = async (req, res, next) => {
    try {
      const result = await this.bookService.getRecommendedBooks(req.query);
      return res.status(STATUS_CODES.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}
