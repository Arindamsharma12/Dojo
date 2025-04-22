// models/Problem.js
import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input:  String,
  output: String
});

const problemSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  difficulty:  { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  tags:        [String],
  testCases:   [testCaseSchema],
  constraints: String,
  boilerplate: { type: Map, of: String }, // e.g. { 'cpp': '#include <iostream>' }
}, { timestamps: true });

export default mongoose.model('Problem', problemSchema);
