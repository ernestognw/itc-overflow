import { Schema, model } from 'mongoose';

const QuestionSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer', default: [] }],
  },
  { timestamps: true }
);

export default model('Question', QuestionSchema);
