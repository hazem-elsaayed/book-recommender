import { App } from '../app.js';
import request from 'supertest';
import sinon from 'sinon';
import { assert } from 'chai';
import { UserService } from '../services/user.service.js';
import { BookService } from '../services/book.service.js';
import { NotificationService } from '../services/notification.service.js';
import { BookController } from '../controllers/books.controller.js';
import { Routes } from '../routes.js';
import { UserRepository } from '../repositories/user.repository.js';
import { BookRepository } from '../repositories/book.repository.js';

describe('Book Controller', () => {
  let app;
  let userRepositoryStub;
  let bookRepositoryStub;
  let userService;
  let bookService;
  let notificationService;
  let bookController;
  let router;
  beforeEach(() => {
    userRepositoryStub = sinon.createStubInstance(UserRepository);
    bookRepositoryStub = sinon.createStubInstance(BookRepository);

    userService = new UserService(userRepositoryStub);
    bookService = new BookService(bookRepositoryStub);
    notificationService = new NotificationService(userService);
    bookController = new BookController(bookService, notificationService);
    router = new Routes(bookController, userRepositoryStub);
    app = new App(router);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('submitBookInterval', () => {
    it('should update book read intervals and number of pages read', async () => {
      bookRepositoryStub.getBookById.resolves({
        pagesReadIntervals: [[1, 5]],
      });
      bookRepositoryStub.updateBook.resolves();
      userRepositoryStub.getUserById.resolves({
        id: 1,
        name: 'John Doe',
        email: '',
        phone: '',
      });

      const response = await request(app.app)
        .post('/submit_book_interval')
        .send({
          user_id: 1,
          book_id: 1,
          start_page: 6,
          end_page: 10,
        });
      assert.equal(response.statusCode, 200);
      assert.equal(
        response.body.message,
        'Book interval submitted successfully'
      );
    });

    it('should return error if a parameter is missing', async () => {
      const response = await request(app.app)
        .post('/submit_book_interval')
        .send({
          user_id: 1,
          book_id: 1,
          start_page: 6,
        });
      assert.equal(response.statusCode, 400);
      assert.equal(response.body.errors[0].msg, 'End page is required');
    });

    it('should return error if start page is greater than end page', async () => {
      const response = await request(app.app)
        .post('/submit_book_interval')
        .send({
          user_id: 1,
          book_id: 1,
          start_page: 10,
          end_page: 6,
        });
      assert.equal(response.statusCode, 400);
      assert.equal(
        response.body.errors[0].msg,
        'Start page must be less than end page'
      );
    });

    it('should return error if user is not found', async () => {
      userRepositoryStub.getUserById.resolves(null);
      const response = await request(app.app)
        .post('/submit_book_interval')
        .send({
          user_id: 1,
          book_id: 1,
          start_page: 6,
          end_page: 10,
        });
      assert.equal(response.statusCode, 404);
      assert.equal(response.body.error, 'User not found');
    });
  });

  describe('getRecommendedBooks', () => {
    it('should return recommended books', async () => {
      bookRepositoryStub.getRecommendedBooks.resolves([
        {
          id: 1,
          title: 'Book 1',
          numberOfPagesRead: 35,
        },
        {
          id: 2,
          title: 'Book 2',
          numberOfPagesRead: 25,
        },
        {
          id: 3,
          title: 'Book 3',
          numberOfPagesRead: 15,
        },
        {
          id: 4,
          title: 'Book 4',
          numberOfPagesRead: 5,
        },
        {
          id: 5,
          title: 'Book 5',
          numberOfPagesRead: 45,
        },
      ]);
      const response = await request(app.app).get('/recommended_books');
      assert.equal(response.statusCode, 200);
      assert.equal(response.body.books.length, 5);
    });
  });
});
