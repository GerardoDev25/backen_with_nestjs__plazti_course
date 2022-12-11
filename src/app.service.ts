import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    // @Inject('TASKS') private tasks: any[],
    private configService: ConfigService,
  ) {}
  getHello(): string {
    // console.log(this.tasks);
    const apiKey = this.configService.get<string>('API_KEY');
    const db = this.configService.get('DATA_BASE');
    return `Hello World! ${apiKey} - ${db}`;
  }
}
