import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Job } from './interface/job.interface';
import { CreateJobDTO, UpdateJobDTO } from './dto/job.dto';

@Injectable()
export class JobService {
  constructor(@InjectModel('Job') private JobModel: Model<Job>) {}

  async create(createJobDTO: CreateJobDTO): Promise<any> {
    createJobDTO.ifDeleted = false;
    const createdJob = new this.JobModel(createJobDTO);
    const result = await createdJob.save();
    if (result) {
      result.ifDeleted = undefined;
      result.__v = undefined;
      delete result.__v;
      delete result.ifDeleted;
    }
    return result;
  }

  async update(updateJobDTO: UpdateJobDTO): Promise<any> {
    const result = await this.JobModel.updateOne(
      { _id: updateJobDTO._id, ifDeleted: false },
      { $set: updateJobDTO },
    );
    if (result && result.n && result.n >= 1) {
      return await this.JobModel.findOne(
        { _id: updateJobDTO._id, ifDeleted: false },
        {
          ifDeleted: 0,
          __v: 0,
        },
      ).exec();
    } else {
      return;
    }
  }
}
