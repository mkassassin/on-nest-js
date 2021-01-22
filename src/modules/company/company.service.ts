import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as CryptoJS from 'crypto-js';

import { Company } from './interface/company.interface';
import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
  PasswordResetDTO,
  NotificationStatusDTO,
  ObjectIdDTO,
  CompanyLoginDTO,
  DeleteCompanyDTO,
} from './dto/company.dto';
import { JobService } from '../job/job.service';

@Injectable()
export class CompanyService {
  constructor(@InjectModel('Company') private CompanyModel: Model<Company>, private jobService: JobService) {}

  async create(createCompanyDTO: CreateCompanyDTO): Promise<any> {
    createCompanyDTO.password = CryptoJS.SHA256(createCompanyDTO.password).toString(CryptoJS.enc.Hex);
    createCompanyDTO.notification = false;
    createCompanyDTO.status = 'Pending';
    createCompanyDTO.category = 'Free';
    createCompanyDTO.ifDeleted = false;
    const createdCat = new this.CompanyModel(createCompanyDTO);
    const result = await createdCat.save();
    if (result) {
      result.password = undefined;
      result.ifDeleted = undefined;
      result.__v = undefined;
      delete result.password;
      delete result.__v;
      delete result.ifDeleted;
    }
    return result;
  }

  async update(updateCompanyDTO: UpdateCompanyDTO): Promise<any> {
    const result = await this.CompanyModel.updateOne({ _id: updateCompanyDTO._id, ifDeleted: false }, { $set: updateCompanyDTO }).exec();
    if (result && result.n && result.n >= 1) {
      return await this.CompanyModel.findOne({ _id: updateCompanyDTO._id, ifDeleted: false }, { password: 0, ifDeleted: 0, __v: 0 }).exec();
    } else {
      return;
    }
  }

  async findById(objectIdDTO: ObjectIdDTO): Promise<Company> {
    const customer = await this.CompanyModel.findOne({ _id: objectIdDTO._id, ifDeleted: false }, { password: 0, ifDeleted: 0, __v: 0 }).exec();
    if (customer && customer !== null) {
      const Jobs = await this.jobService.jobsByCompany({ company: objectIdDTO._id });
      const result: Company = JSON.parse(JSON.stringify(customer));
      result.Jobs = Jobs;
      return result;
    } else {
      customer.Jobs = [];
      return customer;
    }
  }

  async delete(deleteCompanyDTO: DeleteCompanyDTO): Promise<any> {
    return await this.CompanyModel.updateOne(
      { _id: deleteCompanyDTO._id },
      { $set: { ifDeleted: true, timestamp: deleteCompanyDTO.timestamp } },
    ).exec();
  }

  async loginValidate(companyLoginDTO: CompanyLoginDTO): Promise<any> {
    const encPassword = CryptoJS.SHA256(companyLoginDTO.password).toString(CryptoJS.enc.Hex);
    const result = await this.CompanyModel.findOne({
      email: companyLoginDTO.email,
      ifDeleted: false,
    }).exec();

    if (result && result.password === encPassword) {
      result.password = undefined;
      result.ifDeleted = undefined;
      result.__v = undefined;
      delete result.password;
      delete result.ifDeleted;
      delete result.__v;
      return result;
    }
    return;
  }

  async updatePassword(passwordResetDTO: PasswordResetDTO): Promise<any> {
    return await this.CompanyModel.updateOne(
      { _id: passwordResetDTO._id },
      {
        $set: {
          password: passwordResetDTO.new_password,
          timestamp: passwordResetDTO.timestamp,
        },
      },
    ).exec();
  }

  async checkNotification(objectIdDTO: ObjectIdDTO): Promise<any> {
    return await this.CompanyModel.findOne({ _id: objectIdDTO._id }, { notification: 1 }).exec();
  }

  async updateNotification(notificationStatusDTO: NotificationStatusDTO): Promise<any> {
    return await this.CompanyModel.updateOne(
      { _id: notificationStatusDTO._id },
      {
        $set: {
          notification: notificationStatusDTO.notification,
          timestamp: notificationStatusDTO.timestamp,
        },
      },
    ).exec();
  }
}
