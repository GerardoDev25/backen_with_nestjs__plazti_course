import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config/config';
@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const db = this.configService.database.name;
    return `Hello World! ${apiKey} - ${db}`;
  }

  getTaks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM task', (err, res) => {
        err ? reject(err) : resolve(res.rows);
      });
    });
  }
}
