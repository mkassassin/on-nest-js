import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [CompanyModule, MongooseModule.forRoot(config.mongoURI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
