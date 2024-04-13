# Book Recommender

This is a book recommendation API. <br>
The system manages two main operations: 
1. The first operation is to allow the users to submit an interval of starting and ending pages that he/she read in a specific book.
2. The second operation is to announce the most recommended five books in the system, which are picked based on how many unique pages have been read for all the users that submitted their intervals in the first operation (sorted by books with the most read pages to books with the least read pages).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. This project was built using Node.js version 18.20.1 and npm version 6.x.

### Installing

1. Clone the repository: `git clone https://github.com/hazem-elsaayed/book-recommender.git`
2. Install the dependencies: `npm install`
3. Add seeder data to the DB: `npm run seeder` -will add 15 books and 5 users-
4. Start the server: `npm start`

### Running the tests

Run the tests using the following command: `npm test`

## Usage

You can find the apis documentation [here](https://book-recommender-lsvj.onrender.com/api-docs/). <br>
You can also try the endpoints and play with them as the application is currently live -deployed on Heroku-

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/index.html)
