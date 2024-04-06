import { Router } from 'express';
import {
  getRecommendedBooksValidations,
  submitBookIntervalValidations,
} from './validators/bookRoutes.validator.js';
import { validatorMiddleware } from './middlewares/validator.js';

export class Routes {
  constructor(bookController) {
    this.router = Router();
    this.bookController = bookController;
    this.setupRoutes();
  }

  getRouter() {
    return this.router;
  }

  setupRoutes() {
    this.router.post(
      '/submit_book_interval',
      submitBookIntervalValidations,
      validatorMiddleware,
      this.bookController.submitBookInterval
    );

    this.router.get(
      '/recommended_books',
      getRecommendedBooksValidations,
      validatorMiddleware,
      this.bookController.getRecommendedBooks
    );
  }
}
