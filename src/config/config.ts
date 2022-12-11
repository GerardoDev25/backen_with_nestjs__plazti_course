import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATA_BASE,
      port: process.env.DB_PORT,
    },
    apiKey: process.env.API_KEY,
    port: process.env.PORT,
  };
});
