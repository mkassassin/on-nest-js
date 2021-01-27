import { Controller, Res, HttpStatus, Post, Body, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';
import {
  CreateCompanyDTO,
  UpdateCompanyDTO,
  PasswordResetDTO,
  NotificationStatusDTO,
  ObjectIdDTO,
  CompanyLoginDTO,
  DeleteCompanyDTO,
  EmailDTO,
} from './dto/company.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly CompanyService: CompanyService) {}
  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/validateEmail')
  async validateEmail(@Res() res, @Body() emailDTO: EmailDTO) {
    const result = await this.CompanyService.validateEmail(emailDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'unable to validate the email!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'The email status has successfully validated',
      result,
    });
  }
  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/create')
  async addCompany(@Res() res, @Body() createAboutDTO: CreateCompanyDTO) {
    const result = await this.CompanyService.create(createAboutDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'unable to create the company!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'The company has been successfully created',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/update')
  async company_update(@Res() res, @Body() updateCompanyDTO: UpdateCompanyDTO) {
    const result = await this.CompanyService.update(updateCompanyDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Company has been successfully updated',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/find')
  async findById(@Res() res, @Body() objectIdDTO: ObjectIdDTO) {
    const result = await this.CompanyService.findById(objectIdDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Company details successfully found',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/delete')
  async delete(@Res() res, @Body() deleteCompanyDTO: DeleteCompanyDTO) {
    const result = await this.CompanyService.delete(deleteCompanyDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Company successfully removed',
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/login')
  async loginValidate(@Res() res, @Body() companyLoginDTO: CompanyLoginDTO) {
    const result = await this.CompanyService.loginValidate(companyLoginDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Email or password is invalid!',
      });
    delete result.password;
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login details successfully verified',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/updatePassword')
  async updatePassword(@Res() res, @Body() passwordResetDTO: PasswordResetDTO) {
    const result = await this.CompanyService.updatePassword(passwordResetDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Password has been successfully updated',
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/checkNotification')
  async checkNotification(@Res() res, @Body() objectIdDTO: ObjectIdDTO) {
    const result = await this.CompanyService.checkNotification(objectIdDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Company notification status successfully found',
      result,
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------
  @Post('/updateNotification')
  async updateNotification(@Res() res, @Body() notificationStatusDTO: NotificationStatusDTO) {
    const result = await this.CompanyService.updateNotification(notificationStatusDTO);
    if (!result)
      throw new NotFoundException({
        success: false,
        message: 'Id does not exist!',
      });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Notification status has been updated',
    });
  }
}
