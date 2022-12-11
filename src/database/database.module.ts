import { Module, Global } from '@nestjs/common';

const API_KEY = '123456789';
const API_KEY_PRO = 'PROD_123456789';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PRO : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
