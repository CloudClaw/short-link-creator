export const { PORT, MONGO_URL, JWT_SECRET } = process.env;

export const SWAGGER_OPTIONS = {
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

export const ERROR_CODES = {
  unique: 'E11000',
};

export const MAX_COOKIE_AGE = 3600000; // 1 hour in milliseconds
export const NODE_ENV = process.env.NODE_ENV || 'development';
