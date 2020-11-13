import Mongoose from 'mongoose';
import { mongo } from '../../config';

let isConnected;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  try {
    const db = await Mongoose.connect(mongo.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    return;
  } catch (err) {
    throw new Error(err);
  }
};

export default connectToDatabase;
