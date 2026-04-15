import 'dotenv/config';
import express from 'express';
import shortnerRouter from './shortner/shortner.router';

import { errorHandler } from './middlewares/error-handler';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const { PORT } = process.env;

const swaggerOptions = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shortner API',
      version: '1.0.0',
      description: 'Shortner API documentation',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/**/*.ts', './dist/**/*.js'],
};

const app = express();

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use(shortnerRouter);

app.use(errorHandler);

const run = async () => {
  try {
    app.listen(PORT, () => {
      console.log('Started on', PORT);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
