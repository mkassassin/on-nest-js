import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import * as moment from 'moment';

export class LanguagesDTO {
  @ApiPropertyOptional()
  @IsOptional()
  readonly language: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly level: string;
}

export class WorkExperienceDTO {
  @ApiPropertyOptional()
  @IsOptional()
  readonly Category: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly Role: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly Experience: number;
}

// ------------------------------------------------------------------------------------------------
export class CreateJobDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  readonly company: string;

  @ApiPropertyOptional()
  @IsOptional()
  public jobTitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  public jobUrl: string;

  @IsOptional()
  public jobCodeUnique: number;

  @IsOptional()
  public jobCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  public requirements: string;

  @ApiPropertyOptional()
  @IsOptional()
  public description: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly careerLevel: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value: string) => (value !== '' ? moment(value, 'DD-MM-YYYY').toDate() ?? null : null), {
    toClassOnly: true,
  })
  readonly Date: Date | string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly Industries: [string];

  @ApiPropertyOptional()
  @IsOptional()
  readonly Languages: LanguagesDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  readonly Skills: [string];

  @ApiPropertyOptional()
  @IsOptional()
  readonly workExperience: WorkExperienceDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  public city: string;

  @ApiPropertyOptional()
  @IsOptional()
  public country: string;

  @ApiPropertyOptional()
  @IsOptional()
  public currency: string;

  @ApiPropertyOptional()
  @IsOptional()
  public from: number;

  @ApiPropertyOptional()
  @IsOptional()
  public to: number;

  @ApiPropertyOptional()
  @IsOptional()
  public otherCountries: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public ifDeleted: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  readonly timestamp: Date;
}

// ------------------------------------------------------------------------------------------------
export class UpdateJobDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  readonly _id: string;

  @ApiPropertyOptional()
  @IsOptional()
  public jobTitle: string;

  @ApiPropertyOptional()
  @IsOptional()
  public jobUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  public requirements: string;

  @ApiPropertyOptional()
  @IsOptional()
  public description: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly careerLevel: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value: string) => (value !== '' ? moment(value, 'DD-MM-YYYY').toDate() ?? null : null), {
    toClassOnly: true,
  })
  readonly Date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  readonly Industries: [string];

  @ApiPropertyOptional()
  @IsOptional()
  readonly Languages: LanguagesDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  readonly Skills: [string];

  @ApiPropertyOptional()
  @IsOptional()
  readonly workExperience: WorkExperienceDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  public city: string;

  @ApiPropertyOptional()
  @IsOptional()
  public country: string;

  @ApiPropertyOptional()
  @IsOptional()
  public currency: string;

  @ApiPropertyOptional()
  @IsOptional()
  public from: number;

  @ApiPropertyOptional()
  @IsOptional()
  public to: number;

  @ApiPropertyOptional()
  @IsOptional()
  public otherCountries: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  public ifDeleted: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  readonly timestamp: Date;
}

// ------------------------------------------------------------------------------------------------
export class ObjectIdDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  public _id: string;
}

// ------------------------------------------------------------------------------------------------
export class CompanyObjectIdDTO {
  @ApiProperty()
  @IsMongoId({ message: 'Unique id is invalid!' })
  @IsNotEmpty({ message: 'Company unique id is mandatory!' })
  public company: string;
}
