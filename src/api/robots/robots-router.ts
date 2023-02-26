import express from 'express';
import {
  getRobotsController,
  createRobotController,
  getRobotByIdController,
  deleteRobotByIdController,
} from './robots-controllers.js';

const router = express.Router();

router.route('/').get(getRobotsController).post(createRobotController);

router
  .route('/:id')
  .get(getRobotByIdController)
  .delete(deleteRobotByIdController);

export default router;
