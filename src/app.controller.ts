import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
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
  getTasks() {
    return this.appService.getTasks();
  }
}
