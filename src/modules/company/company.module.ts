import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './schema/company.schema';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

import { IsCompanyEmailAlreadyExistConstraint } from './helpers/IsCompanyEmailAlreadyExist';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, IsCompanyEmailAlreadyExistConstraint],
})
export class CompanyModule {}
