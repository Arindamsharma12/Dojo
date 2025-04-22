// models/Submission.js
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contest:    { type: mongoose.Schema.Types.ObjectId, ref: 'Contest' },
  problem:    { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  language:   String,
  code:       String,
  status:     { type: String, enum: ['Pending', 'Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded'], default: 'Pending' },
  score:      { type: Number, default: 0 },
  submittedAt:{ type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);
