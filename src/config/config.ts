import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apiKey: process.env.API_KEY,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    database: {
      name: process.env.DATA_BASE,
      port: process.env.DB_PORT,
    },
    postgres: {
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      host: process.env.POSTGRES_HOST,
    },
  };
});
