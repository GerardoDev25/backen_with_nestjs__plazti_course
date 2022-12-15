import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as joi from 'joi';
import { Client } from 'pg';

import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import config from './config/config';
import { enviroments } from './config/enviroment';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});
client.connect();
client.query('SELECT * FROM task', (err, res) => {
  err ? console.error(err) : console.log(res.rows);
});

@Module({
  imports: [
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        API_KEY: joi.number().required(),
        DATA_BASE: joi.string().required(),
        DB_PORT: joi.number().required(),
        PORT: joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'TASKS',
    //   useFactory: async (http: HttpService) => {
    //     const task = await http
    //       .get('https://jsonplaceholder.typicode.com/todos')
    //       .toPromise();
    //     return task.data;
    //   },
    //   inject: [HttpService],
    // },
  ],
})
export class AppModule {}
