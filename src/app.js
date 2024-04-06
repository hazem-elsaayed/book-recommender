import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { sequelize } from './config/db.js';
import { routes } from './utils/dependancyMap.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerSpecs } from './config/swagger.js';
import dotenv from 'dotenv';
dotenv.config();

class App {
  constructor(router) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.routes = router.getRouter();
    this.initializeMiddlewares();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    this.app.use(this.routes);
    this.app.use(errorHandler);
  }

  async startServer() {
    await sequelize.sync();

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const myApp = new App(routes);
myApp.startServer();
