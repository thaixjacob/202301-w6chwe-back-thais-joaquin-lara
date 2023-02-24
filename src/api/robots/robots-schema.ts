import mongoose, { Schema } from 'mongoose';

const robotSchema = new Schema({
  id: String,
  name: String,
  img: String,
  speed: Number,
  resistence: Number,
  creationDate: Date,
});

export const RobotModel = mongoose.model('Robot', robotSchema, 'robots');
