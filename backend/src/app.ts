import 'dotenv/config';
import express from 'express';
import shortnerRouter from './shortner/shortner.router';
import { errorHandler } from './middlewares/error-handler';

const { PORT } = process.env;

const app = express();

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
