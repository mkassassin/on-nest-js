import * as mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({
  company: { type: mongoose.Types.ObjectId, ref: 'Company' },
  jobTitle: String,
  jobUrl: String,
  jobCodeUnique: Number,
  jobCode: String,
  requirements: String,
  description: String,
  careerLevel: String,
  Date: Date,
  Industries: [String],
  Languages: [
    {
      language: String,
      level: String,
    },
  ],
  Skills: [String],
  workExperience: [
    {
      Category: String,
      Role: String,
      Experience: Number,
    },
  ],
  city: String,
  country: String,
  currency: String,
  from: Number,
  to: Number,
  otherCountries: Boolean,
  ifDeleted: Boolean,
  timestamp: Date,
});
