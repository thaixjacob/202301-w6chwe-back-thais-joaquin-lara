import { RequestHandler } from 'express';
import crypto from 'node:crypto';
import { RobotModel } from './robots-schema.js';

export const getRobotsController: RequestHandler = async (_req, res) => {
  try {
    const foundRobots = await RobotModel.find({});
    res.json(foundRobots);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createRobotController: RequestHandler = async (req, res) => {
  const id = crypto.randomUUID();
  const robot: typeof RobotModel = {
    id,
    ...req.body,
  };
  try {
    await RobotModel.create(robot);
    res.status(201).json(robot);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRobotByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const robot = await RobotModel.findById(id);
    if (robot === null) {
      res.sendStatus(404);
    } else {
      res.json(robot);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteRobotByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dbRes = await RobotModel.deleteOne({ id });
    if (dbRes.deletedCount === 0) {
      res.sendStatus(404);
    } else {
      res.json(id);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
