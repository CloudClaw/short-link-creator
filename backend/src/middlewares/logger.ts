import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

export const requestLogger = expressWinston.logger({
  transports: [
    // new winston.transports.Console({
    //   format: winston.format.simple(),
    // }),
    // new winston.transports.File({
    //   filename: 'requests.log',
    // }),
    new winston.transports.DailyRotateFile({
      filename: 'request-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      // maxSize: '20m'
      maxFiles: 14,
      zippedArchive: true
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    // new winston.transports.File({
    //   filename: 'errors.log',
    // }),
    new winston.transports.DailyRotateFile({
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      // maxSize: '20m'
      maxFiles: 14,
      zippedArchive: true
    }),
  ],
  format: winston.format.json(),
});
