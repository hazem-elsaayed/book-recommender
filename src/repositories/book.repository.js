import { Book } from '../models/book.model.js';

export class BookRepository {
  async getBookById(id) {
    return await Book.findByPk(id);
  }

  async updateBook(id, data) {
    return await Book.update(data, {
      where: {
        id: id,
      },
    });
  }

  async getRecommendedBooks(limit) {
    return await Book.findAll({
      order: [['numberOfPagesRead', 'DESC']],
      attributes: ['id', 'title', 'author', 'numberOfPagesRead'],
      limit: limit,
    });
  }
}
