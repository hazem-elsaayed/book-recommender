import { check } from 'express-validator';

export const submitBookIntervalValidations = [
  check('user_id').notEmpty().withMessage('User ID is required'),
  check('user_id').isInt().withMessage('User ID must be an integer'),
  check('book_id').notEmpty().withMessage('Book ID is required'),
  check('book_id').isInt().withMessage('Book ID must be an integer'),
  check('start_page').notEmpty().withMessage('Start page is required'),
  check('start_page').isInt().withMessage('Start page must be an integer'),
  check('end_page').notEmpty().withMessage('End page is required'),
  check('end_page').isInt().withMessage('End page must be an integer'),
  check('start_page').custom((value, { req }) => {
    if (value >= req.body.end_page) {
      throw new Error('Start page must be less than end page');
    }
    return true;
  }),
];

export const getRecommendedBooksValidations = [
  check('limit').optional().isInt().withMessage('Limit must be an integer'),
];
