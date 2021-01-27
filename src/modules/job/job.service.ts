import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Job } from './interface/job.interface';
import { CompanyObjectIdDTO, CreateJobDTO, ObjectIdDTO, UpdateJobDTO } from './dto/job.dto';
import * as moment from 'moment';

@Injectable()
export class JobService {
  constructor(@InjectModel('Job') private JobModel: Model<Job>) {}

  async create(createJobDTO: CreateJobDTO): Promise<any> {
    createJobDTO.ifDeleted = false;
    const lastJob = await this.JobModel.findOne({}, { jobCodeUnique: 1 }, { sort: { jobCodeUnique: 1 } });
    let LastJobUnique = 1;
    if (lastJob !== null && lastJob.jobCodeUnique) {
      LastJobUnique = lastJob.jobCodeUnique + 1;
    }
    createJobDTO.jobCodeUnique = LastJobUnique;
    createJobDTO.jobCode = 'CI' + new Date().getFullYear() + '-' + LastJobUnique;
    const createdJob = new this.JobModel(createJobDTO);
    const result = await createdJob.save();
    if (result) {
      result.jobCodeUnique = undefined;
      result.ifDeleted = undefined;
      result.__v = undefined;
      delete result.jobCodeUnique;
      delete result.__v;
      delete result.ifDeleted;
      result.Date = moment(result.Date).format('DD-MM-YYYY');
    }
    return result;
  }

  async update(updateJobDTO: UpdateJobDTO): Promise<any> {
    const result = await this.JobModel.updateOne({ _id: updateJobDTO._id, ifDeleted: false }, { $set: updateJobDTO }).exec();
    if (result && result.n && result.n >= 1) {
      const data = await this.JobModel.findOne(
        { _id: updateJobDTO._id, ifDeleted: false },
        {
          jobCodeUnique: 0,
          ifDeleted: 0,
          __v: 0,
        },
      ).exec();
      const returnData: Job = JSON.parse(JSON.stringify(data));
      returnData.Date = moment(returnData.Date).format('DD-MM-YYYY');
    } else {
      return;
    }
  }

  async findById(objectIdDTO: ObjectIdDTO): Promise<Job> {
    const Jobs = await this.JobModel.findOne({ _id: objectIdDTO._id, ifDeleted: false }, { ifDeleted: 0, jobCodeUnique: 0, __v: 0 }).exec();
    const returnData: Job = JSON.parse(JSON.stringify(Jobs));
    returnData.Date = moment(returnData.Date).format('DD-MM-YYYY');
    return returnData;
  }

  async jobsByCompany(companyObjectIdDTO: CompanyObjectIdDTO): Promise<Job[]> {
    const Jobs = await this.JobModel.find(
      { company: companyObjectIdDTO.company, ifDeleted: false },
      { ifDeleted: 0, jobCodeUnique: 0, __v: 0 },
    ).exec();
    const data: Job[] = JSON.parse(JSON.stringify(Jobs));
    const returnData = data.map((Obj: Job) => {
      Obj.Date = moment(Obj.Date).format('DD-MM-YYYY');
      return Obj;
    });
    return returnData;
  }
}
