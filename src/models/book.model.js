import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfPagesRead: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pagesReadIntervals: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);

Book.afterFind((books, options) => {
  if (!books) throw new Error('Book not found');
});
