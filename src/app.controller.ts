import { Controller, Get, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApliKeyGuard } from './auth/guards/apli-key.guard';

@Controller()
@UseGuards(ApliKeyGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new')
  @Public()
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
