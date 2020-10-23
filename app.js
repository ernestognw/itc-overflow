import express from 'express';
import api from './routes';

const app = express();

// Static
app.use(express.static('public'));

// Middlewares
app.use(express.json());

// Routes
app.use(api);

export default app;
