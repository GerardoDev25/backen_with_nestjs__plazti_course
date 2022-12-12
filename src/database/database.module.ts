import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config/config';

const API_KEY = '123456789';
const API_KEY_PRO = 'PROD_123456789';

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   user: 'root',
    //   pass: 'root',
    //   dbName: 'platzi-store',
    // }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, dbName, host, password, port, username } =
          configService.mongo;

        return {
          uri: `${connection}://${username}:${password}@${host}:${port}`,
          user: username,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PRO : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, dbName, host, password, port, username } =
          configService.mongo;

        const uri = `${connection}://${username}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;

        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
