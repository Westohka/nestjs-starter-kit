import { config } from 'dotenv';

config();

export default {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  rabbit: {
    url: process.env.BROKER_URL,
    queue: process.env.BROKER_QUEUE,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  },
  auth: {
    jwt: {
      access: {
        secret: process.env.JWT_ACCESS_SECRET,
        lifetime: process.env.JWT_ACCESS_LIFETIME
          ? Number(process.env.JWT_ACCESS_LIFETIME)
          : 86400,
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        lifetime: process.env.JWT_REFRESH_LIFETIME
          ? Number(process.env.JWT_REFRESH_LIFETIME)
          : 2592000,
      },
    },
  },
  server: {
    base_url: process.env.BASE_URL,
    route_prefix: process.env.ROUTE_PREFIX,
    port: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000,
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },
  swagger: {
    prefix: process.env.SWAGGER_PREFIX,
  },
};
