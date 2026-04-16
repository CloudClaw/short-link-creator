import 'dotenv/config';
import express from 'express';
import shortnerRouter from './shortner/shortner.router';
import userRouter from './users/user.router';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import mongoose from 'mongoose';
import authMiddleware from './middlewares/auth';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './middlewares/error-handler';
import { FRONTEND_URL, MONGO_URL, PORT, SWAGGER_OPTIONS } from './constants';
import { errorLogger, requestLogger } from './middlewares/logger';

const swaggerDocs = swaggerJsDoc(SWAGGER_OPTIONS);

const app = express();

app.disable('x-powered-by');

app.use(helmet({
  contentSecurityPolicy: false,
  xPoweredBy: false
}));

// app.use((req,res,next) => {
//  res.header('x-powered-by', 'Ruby on Rails')
//  next();
// })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(cookieParser());

app.use(requestLogger);

app.use(userRouter);

app.use(authMiddleware);
app.use(shortnerRouter);

app.use(errorLogger);

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
