import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

import { JobService } from './job.service';
import { CreateJobDTO, UpdateJobDTO } from './dto/job.dto';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/create')
  async addJob(@Res() res, @Body() createJobDTO: CreateJobDTO) {
    const result = await this.jobService.create(createJobDTO);
    if (!result) throw new NotFoundException('unable to create the job!');
    return res.status(HttpStatus.OK).json({
      message: 'The job has been successfully created',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/update')
  async updateJob(@Res() res, @Body() updateJobDTO: UpdateJobDTO) {
    const result = await this.jobService.update(updateJobDTO);
    if (!result) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Job has been successfully updated',
      result,
    });
  }
}
