import express from 'express';
import apiRouter from './api/api-router.js';
import cors from 'cors';

const app = express();

app.get('/', (_req, res) => {
  res.json({ hello: 'World' });
});

app.use(cors());

app.use(express.json());
app.use('/api/v1', apiRouter);

export default app;
