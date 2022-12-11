import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATA_BASE,
      port: process.env.PORT,
    },
    apiKey: process.env.API_KEY,
  };
});
