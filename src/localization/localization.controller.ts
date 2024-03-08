import { Controller, Get } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Controller('local')
export class LocalizationController {
  constructor(private readonly i18n: I18nService) {}

  @Get()
  async getHello() {
    const greeting = await this.i18n.translate('greeting');
    const welcome = await this.i18n.translate('welcome');
    return { greeting, welcome };
  }
}
