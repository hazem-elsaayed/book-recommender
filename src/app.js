import express from 'express';

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const myApp = new App();
myApp.startServer();
