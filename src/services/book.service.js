import { RECOMMENDED_BOOKS_LIMIT } from '../utils/constants.js';

export class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async submitBookInterval({
    book_id: bookId,
    start_page: startPage,
    end_page: endPage,
  }) {
    const { numberOfUniqueReadPages, pagesReadIntervals } =
      await this.updateReadIntervals(bookId, startPage, endPage);

    await this.bookRepository.updateBook(bookId, {
      numberOfPagesRead: numberOfUniqueReadPages,
      pagesReadIntervals: pagesReadIntervals,
    });

    return { message: 'Book interval submitted successfully', success: true };
  }

  async getRecommendedBooks({ limit = RECOMMENDED_BOOKS_LIMIT }) {
    const result = await this.bookRepository.getRecommendedBooks(limit);
    return { books: result, success: true };
  }

  async updateReadIntervals(bookId, startPage, endPage) {
    const book = await this.bookRepository.getBookById(bookId);
    const intervals = book.pagesReadIntervals || [];
    const readPages = new Set();

    for (const [startPage, endPage] of intervals) {
      for (let i = startPage; i <= endPage; i++) {
        readPages.add(i);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      readPages.add(i);
    }

    const newIntervals = this.convertReadPagesArrayToRanges([...readPages]);

    const numberOfUniqueReadPages = readPages.size;
    return { numberOfUniqueReadPages, pagesReadIntervals: newIntervals };
  }

  convertReadPagesArrayToRanges(readPages) {
    const newIntervals = [];
    let start = null;
    let end = null;

    for (const page of readPages.sort((a, b) => a - b)) {
      if (start === null) {
        start = page;
        end = page;
      } else if (page === end + 1) {
        end = page;
      } else {
        newIntervals.push([start, end]);
        start = page;
        end = page;
      }
    }

    if (start !== null && end !== null) {
      newIntervals.push([start, end]);
    }
    return newIntervals;
  }
}
