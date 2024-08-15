import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppendQuery, CountryQuery } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get('countries')
  async countries(@Query() filter: CountryQuery) {
    return this.service.countries(filter);
  }

  @Get('reverse/:word')
  async reverse(@Param('word') word: string) {
    return this.service.reverseWord(word);
  }

  @Get('append')
  async append(@Query() filter: AppendQuery) {
    return this.service.append(filter);
  }
}
