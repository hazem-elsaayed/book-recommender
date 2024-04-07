import { Router } from 'express';
import {
  getRecommendedBooksValidations,
  submitBookIntervalValidations,
} from './validators/bookRoutes.validator.js';
import { validatorMiddleware } from './middlewares/validator.js';
import { validateUser } from './middlewares/validateUser.js';

export class Routes {
  constructor(bookController, userRepository) {
    this.router = Router();
    this.bookController = bookController;
    this.userRepository = userRepository;
    this.setupRoutes();
  }

  getRouter() {
    return this.router;
  }

  setupRoutes() {
    this.router.get('/', (req, res) => {
      res.json({ message: 'Welcome to Book Recommender API', success: true });
    });

    /**
     * @swagger
     * /submit_book_interval:
     *   post:
     *     summary: Submit a book reading interval
     *     description: Submit a book reading interval
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               user_id:
     *                 type: integer
     *               book_id:
     *                 type: integer
     *               start_page:
     *                 type: integer
     *               end_page:
     *                 type: integer
     *             required:
     *               - user_id
     *               - book_id
     *               - start_page
     *               - end_page
     *     responses:
     *       200:
     *         description: Book interval submitted successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    this.router.post(
      '/submit_book_interval',
      submitBookIntervalValidations,
      validatorMiddleware,
      validateUser(this.userRepository),
      this.bookController.submitBookInterval
    );

    /**
     * @swagger
     * /recommended_books:
     *   get:
     *     summary: Get recommended books
     *     description: Get recommended books
     *     parameters:
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *         description: Number of books to return
     *     responses:
     *       200:
     *         description: Recommended books
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 books:
     *                   schema:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: integer
     *                         title:
     *                           type: string
     *                         author:
     *                           type: string
     *                         numberOfPagesRead:
     *                           type: integer
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    this.router.get(
      '/recommended_books',
      getRecommendedBooksValidations,
      validatorMiddleware,
      this.bookController.getRecommendedBooks
    );

    this.router.use((req, res) => {
      res.status(404).json({ message: 'Route not found', success: false });
    });
  }
}
