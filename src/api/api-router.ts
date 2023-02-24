import express from 'express';
import robotsRouter from './robots/robots-router.js';

const router = express.Router();

router.use('/robots', robotsRouter);

export default router;
