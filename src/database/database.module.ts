import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';

const API_KEY = '123456789';
const API_KEY_PRO = 'PROD_123456789';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PRO : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri =
          'mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary';

        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('platzi-store');
        return database;
      },
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
