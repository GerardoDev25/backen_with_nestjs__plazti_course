import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as joi from 'joi';

import { AuthModule } from './auth/auth.module';

import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import config from './config/config';
import { enviroments } from './config/enviroment';

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
        JWT_SECRET: joi.string().required(),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
