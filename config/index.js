import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000; // Default port
const mongo = {
  url: process.env.MONGO_URI || 'mongodb://localhost:27017/itc-overflow', // Default connection stirng
};

export { port, mongo };
