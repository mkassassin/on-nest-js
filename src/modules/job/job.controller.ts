import { Controller, Res, HttpStatus, Post, Body, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JobService } from './job.service';
import { CompanyObjectIdDTO, CreateJobDTO, ObjectIdDTO, UpdateJobDTO } from './dto/job.dto';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/create')
  async addJob(@Res() res, @Body() createJobDTO: CreateJobDTO) {
    const result = await this.jobService.create(createJobDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'unable to create the job!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'The job has been successfully created',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/update')
  async updateJob(@Res() res, @Body() updateJobDTO: UpdateJobDTO) {
    const result = await this.jobService.update(updateJobDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Job has been successfully updated',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/find')
  async findById(@Res() res, @Body() objectIdDTO: ObjectIdDTO) {
    const result = await this.jobService.findById(objectIdDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Job details successfully found',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/findByCompany')
  async jobsByCompany(@Res() res, @Body() companyObjectIdDTO: CompanyObjectIdDTO) {
    const result = await this.jobService.jobsByCompany(companyObjectIdDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Job list successfully found',
      result,
    });
  }
}
