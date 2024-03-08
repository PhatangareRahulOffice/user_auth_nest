import { Module } from '@nestjs/common';

import { LocalizationController } from './localization.controller';
// import * as path from 'path';
@Module({
  controllers: [LocalizationController],
})
export class LocalizationModule {}
