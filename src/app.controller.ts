import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApliKeyGuard } from './auth/guards/apli-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApliKeyGuard)
  @Get('new')
  newEndpoint(): string {
    return 'new end point';
  }

  @Get('/ruta/')
  hello(): string {
    return '/con /';
  }

  @Get('/tasks/')
  tasks() {
    return this.appService.getTaks();
  }
}
