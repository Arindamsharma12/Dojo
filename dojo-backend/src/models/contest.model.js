// models/Contest.js
import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: String,
  startTime:   { type: Date, required: true },
  endTime:     { type: Date, required: true },
  problems:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  participants:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Contest', contestSchema);
