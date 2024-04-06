import { BookController } from '../controllers/books.controller.js';
import { BookRepository } from '../repositories/book.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { Routes } from '../routes.js';
import { BookService } from '../services/book.service.js';
import { NotificationService } from '../services/notification.service.js';
import { UserService } from '../services/user.service.js';

const userRepository = new UserRepository();
const bookRepository = new BookRepository();

const userService = new UserService(userRepository);
const bookService = new BookService(bookRepository);
const notificationService = new NotificationService(userService);

const bookController = new BookController(bookService, notificationService);

export const routes = new Routes(bookController);
