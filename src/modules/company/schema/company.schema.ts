import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
  company: String,
  name: String,
  website: String,
  location: String,
  email: String,
  phone: String,
  password: String,
  notification: Boolean,
  category: String,
  status: String,
  ifDeleted: Boolean,
  timestamp: Date,
});
