import { Schema, model } from 'mongoose';

const AnswerSchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model('Answer', AnswerSchema);
