import { Request, Response } from 'express';
import { RobotModel } from './robots-schema';
import {
  createRobotController,
  deleteRobotByIdController,
  getRobotByIdController,
  getRobotsController,
} from './robots-controllers';

describe('Given a getRobotsController function', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robot = [
    {
      id: 'robot id',
      name: 'robot test',
      img: 'fake-url.com',
      speed: 8,
      resistence: 10,
      creationDate: 'December 17, 1995 03:24:00',
    },
  ];

  test('When the database response is succesfull, then it should return a robots list', async () => {
    RobotModel.find = jest.fn().mockResolvedValue(robot);
    await getRobotsController(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalledWith(robot);
  });
  test('When the database response is rejected, then it should return a state of 500', async () => {
    RobotModel.find = jest
      .fn()
      .mockRejectedValue(new Error('somethign was wrong'));
    await getRobotsController(request, response as Response, jest.fn());
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a getRobottByIdController function', () => {
  const request = {
    params: { id: 'mockId' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robot = {
    id: 'robot id',
    name: 'robot test',
    img: 'fake-url.com',
    speed: 8,
    resistence: 10,
    creationDate: '1995-12-08',
  };

  test('When the robot exists, it should return the robot data', async () => {
    RobotModel.findById = jest.fn().mockResolvedValue(robot);
    await getRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalledWith(robot);
  });

  test('When the robot do not exist, then it should return with an error', async () => {
    RobotModel.findById = jest.fn().mockResolvedValue(null);
    await getRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });

  test('When receveing a new robot, then it should be created', async () => {
    RobotModel.create = jest.fn().mockResolvedValue(robot);
    await createRobotController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalledWith(robot);
  });

  test('When receveing wrong data for a robot, then it should return an error', async () => {
    RobotModel.create = jest
      .fn()
      .mockRejectedValue(new Error('somethign was wrong'));
    await createRobotController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a delete method of the controller', () => {
  const request = { params: { id: 'mockId' } } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  test('when the database response is successfull, then it should resolve with robot id deleted', async () => {
    RobotModel.deleteOne = jest.fn().mockReturnValue(0);
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalledWith(request.params?.id);
  });

  test('when the database response with status 404, then it should not resolve with robot id deleted', async () => {
    RobotModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(404);
  });

  test('when the database response with status 500, then it should not resolve with robot id deleted', async () => {
    RobotModel.deleteOne = jest
      .fn()
      .mockRejectedValue(new Error('Something went wrong'));
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});
