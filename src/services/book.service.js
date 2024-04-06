import { RECOMMENDED_BOOKS_LIMIT } from '../utils/constants.js';

export class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async submitBookInterval({ bookId, startPage, endPage }) {
    const numberOfPagesRead = endPage - startPage;
    await this.bookRepository.updateBook(bookId, { numberOfPagesRead });
    return { message: 'Book interval submitted successfully' };
  }

  async getRecommendedBooks({ limit = RECOMMENDED_BOOKS_LIMIT }) {
    return await this.bookRepository.getRecommendedBooks(limit);
  }
}
