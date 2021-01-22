import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../interface/company.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UpdateCompanyDTO } from '../dto/company.dto';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCompanyEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel('Company')
    private readonly companyModel: Model<Company>,
  ) {}

  async validate(email: string, validationArguments: ValidationArguments) {
    const findQuery = { email: email };
    if (validationArguments.targetName === 'UpdateCompanyDTO') {
      const DTOValue = validationArguments.object as UpdateCompanyDTO;
      findQuery['_id'] = { $ne: DTOValue._id };
    }
    const company = await this.companyModel.findOne(findQuery, { email: 1 }, {}).exec();
    if (company !== null) return false;
    return true;
  }
}

export function IsCompanyEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCompanyEmailAlreadyExistConstraint,
    });
  };
}
