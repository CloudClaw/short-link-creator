import 'dotenv/config';
import express from 'express';
import shortnerRouter from './shortner/shortner.router';
import userRouter from './users/user.router';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import authMiddleware from './middlewares/auth';

import { errorHandler } from './middlewares/error-handler';
import { MONGO_URL, PORT, SWAGGER_OPTIONS } from './constants';

const app = express();

const swaggerDocs = swaggerJsDoc(SWAGGER_OPTIONS);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use(shortnerRouter);
app.use(userRouter);

app.use(authMiddleware);

app.use(errorHandler);

const run = async () => {
  try {
    await mongoose.connect(MONGO_URL as string);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log('Started on', PORT);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
