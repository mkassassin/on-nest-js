import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

import { CompanyService } from './company.service';
import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
  PasswordResetDTO,
  NotificationStatusDTO,
  ObjectIdDTO,
  CompanyLoginDTO,
  DeleteCompanyDTO,
} from './dto/company.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly CompanyService: CompanyService) {}
  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/create')
  async addCompany(@Res() res, @Body() createAboutDTO: CreateCompanyDTO) {
    const result = await this.CompanyService.create(createAboutDTO);
    if (!result) throw new NotFoundException('unable to create the company!');
    return res.status(HttpStatus.OK).json({
      message: 'The company has been successfully created',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/update')
  async company_update(@Res() res, @Body() updateCompanyDTO: UpdateCompanyDTO) {
    const result = await this.CompanyService.update(updateCompanyDTO);
    if (!result) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Company has been successfully updated',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/find')
  async findById(@Res() res, @Body() objectIdDTO: ObjectIdDTO) {
    const result = await this.CompanyService.findById(objectIdDTO);
    if (!result) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(result);
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/delete')
  async delete(@Res() res, @Body() deleteCompanyDTO: DeleteCompanyDTO) {
    const result = await this.CompanyService.delete(deleteCompanyDTO);
    if (!result) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Account successfully removed',
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/login')
  async loginValidate(@Res() res, @Body() companyLoginDTO: CompanyLoginDTO) {
    const result = await this.CompanyService.loginValidate(companyLoginDTO);
    if (!result) throw new NotFoundException('Email or password is invalid!');
    delete result.password;
    return res.status(HttpStatus.OK).json(result);
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/updatePassword')
  async updatePassword(@Res() res, @Body() passwordResetDTO: PasswordResetDTO) {
    const result = await this.CompanyService.updatePassword(passwordResetDTO);
    if (!result) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Password has been successfully updated',
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/updateNotification')
  async updateNotification(
    @Res() res,
    @Body() notificationStatusDTO: NotificationStatusDTO,
  ) {
    const result = await this.CompanyService.updateNotification(
      notificationStatusDTO,
    );
    if (!result) throw new NotFoundException('Id does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Notification status has been updated',
    });
  }
}
