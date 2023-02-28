import express from 'express';
import apiRouter from './api/api-router.js';
import cors from 'cors';
import authRouter from './api/auth/auth-router.js';

const app = express();

app.get('/', (_req, res) => {
  res.json('Server ON');
});

app.use(cors());
app.use(express.json());
app.use('/api/v1', apiRouter);
app.use('/auth', authRouter);
app.disable('x-powered-by');

export default app;
