import { Schema, model } from 'mongoose';

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer', default: [] }],
});

export default model('Question', QuestionSchema);
