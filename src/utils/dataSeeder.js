import faker from 'faker';
import { Book } from '../models/book.model.js';
import { User } from '../models/user.model.js';
import { sequelize } from '../config/db.js';

// Import necessary modules and models

// Function to generate random books
const generateBooks = async (numberOfBooks) => {
  try {
    for (let i = 0; i < 15; i++) {
      const book = new Book({
        title: faker.lorem.words(),
        author: faker.name.findName(),
        publicationYear: faker.date.past().getFullYear(),
      });
      await book.save();
    }
    console.log('Books seeded successfully!');
  } catch (error) {
    console.error('Error seeding books:', error);
  }
};

const generateUsers = async (numberOfUsers = 5) => {
  try {
    for (let i = 0; i < numberOfUsers; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
      });
      await user.save();
    }
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });
    await generateBooks();
    await generateUsers();
    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
