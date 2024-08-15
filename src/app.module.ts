import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleForRoot } from './utils';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [configModuleForRoot, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
