import { Document } from 'mongoose';

export interface Company extends Document {
  _id?: string;
  company: string;
  name: string;
  website: string;
  location: string;
  email: string;
  phone: string;
  password?: string;
  notification?: boolean;
  category?: string;
  status?: string;
  ifDeleted?: boolean;
  timestamp: Date;
}
