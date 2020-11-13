import express from 'express';
import cors from 'cors';
import api from './routes';

const app = express();

// Static

// Middlewares
app.use(express.json(), cors());

// Routes
app.use('/api', api);

export default app;
