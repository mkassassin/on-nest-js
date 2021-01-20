import { Document, Types } from 'mongoose';

export interface Languages {
  language: string;
  level: string;
}

export interface WorkExperience {
  Category: string;
  Role: string;
  Experience: number;
}

export interface Job extends Document {
  _id?: string;
  company: string;
  jobTitle: string;
  jobUrl: string;
  requirements: string;
  description: string;
  careerLevel: string;
  Date: Date;
  Industries: [string];
  Languages: Languages[];
  Skills: [string];
  workExperience: WorkExperience[];
  city: string;
  country: string;
  currency: string;
  from: number;
  to: number;
  otherCountries: boolean;
  timestamp: Date;
}
