import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

import { CompanyModule } from './modules/company/company.module';
import { JobModule } from './modules/job/job.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), CompanyModule, JobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
