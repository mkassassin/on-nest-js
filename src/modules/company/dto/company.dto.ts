import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsEnum, IsOptional, IsPhoneNumber, Length, IsMongoId } from 'class-validator';

import { IsCompanyEmailAlreadyExist } from './../helpers/IsCompanyEmailAlreadyExist';

export enum CompanyCategory {
  PPH = 'PPH',
  Subscription = 'Subscription',
  Free = 'Free',
}

export enum CompanyStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  InActive = 'In-Active',
}

// ------------------------------------------------------------------------------------------------
export class CreateCompanyDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter company name' })
  public company: string;

  @ApiPropertyOptional()
  @IsOptional()
  public name: string;

  @ApiPropertyOptional()
  @IsOptional()
  public website: string;

  @ApiPropertyOptional()
  @IsOptional()
  public location: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter your email' })
  @IsEmail(
    {},
    {
      message: 'Please enter your email address in format:yourname@example.com',
    },
  )
  @IsCompanyEmailAlreadyExist({ message: 'Email $value is already exists.' })
  @Transform((value) => value.toLowerCase(), { toClassOnly: true })
  public email: string;

  @ApiPropertyOptional({
    description: 'Note: enter valid German phone/mobile number',
  })
  @IsOptional()
  @IsPhoneNumber('DE', {
    message: 'Please enter your valid mobile/phone number',
  })
  public phone: string;

  @ApiProperty({
    description: 'Note: password length has restricted to 5 to 15  characters',
  })
  @IsNotEmpty({ message: 'Please enter your Password' })
  @Length(5, 15, {
    message: 'Password must be longer than or equal to 5 and less than or equal to 15 characters',
  })
  public password: string;

  @IsOptional()
  public notification?: boolean;

  @IsOptional()
  @IsEnum(CompanyCategory, { message: 'Please select company category' })
  public category?: string;

  @IsOptional()
  @IsEnum(CompanyStatus, { message: 'Please select company status' })
  public status?: string;

  @IsOptional()
  public ifDeleted: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public timestamp: Date;
}

// ------------------------------------------------------------------------------------------------
export class UpdateCompanyDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  public _id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter company name' })
  public company: string;

  @ApiPropertyOptional()
  @IsOptional()
  public name: string;

  @ApiPropertyOptional()
  @IsOptional()
  public website: string;

  @ApiPropertyOptional()
  @IsOptional()
  public location: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter your email' })
  @IsEmail(
    {},
    {
      message: 'Please enter your email address in format:yourname@example.com',
    },
  )
  @IsCompanyEmailAlreadyExist({ message: 'Email $value is already exists.' })
  @Transform((value) => value.toLowerCase(), { toClassOnly: true })
  public email: string;

  @ApiPropertyOptional({
    description: 'Note: enter valid German phone/mobile number',
  })
  @IsOptional()
  @IsPhoneNumber('DE', {
    message: 'Please enter your valid mobile/phone number',
  })
  public phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  public timestamp: Date;
}

// ------------------------------------------------------------------------------------------------
export class CompanyLoginDTO {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'Please enter your email address in format:yourname@example.com',
    },
  )
  @IsNotEmpty({ message: 'Please enter your Email' })
  @Transform((value) => value.toLowerCase(), { toClassOnly: true })
  public email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter your Password' })
  public password: string;

  @ApiPropertyOptional()
  @IsOptional()
  public timestamp: Date;
}

// ------------------------------------------------------------------------------------------------
export class PasswordResetDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  public _id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Please enter your old Password' })
  public old_password: string;

  @ApiProperty({
    description: 'Note: password length has restricted to 5 to 15  characters',
  })
  @IsNotEmpty({ message: 'Please enter your new Password' })
  @Length(5, 15, {
    message: 'Password must be longer than or equal to 5 and less than or equal to 15 characters',
  })
  public new_password: string;

  @ApiPropertyOptional()
  @IsOptional()
  public timestamp: Date;
}

// ------------------------------------------------------------------------------------------------
export class NotificationStatusDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  public _id: string;

  @ApiPropertyOptional()
  @IsOptional()
  public notification: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public timestamp: Date;
}

// ------------------------------------------------------------------------------------------------
export class DeleteCompanyDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  public _id: string;

  @ApiPropertyOptional()
  @IsOptional()
  public timestamp: Date;
}

// ------------------------------------------------------------------------------------------------
export class ObjectIdDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  public _id: string;
}
