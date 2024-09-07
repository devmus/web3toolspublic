import { asyncHandler } from '../middleware/asyncHandler.mjs';
import RunLog from '../models/RunLogSchema.mjs';
import axios from 'axios';

export const createRun = asyncHandler(async (req, res, next) => {

    const { index, date, time, token, gains, energy } = req.body;
  
    const runLog = await RunLog.create({
      index,
      date, 
      time,
      token,
      gains, 
      energy
    });
  
    await runLog.save();
  
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: runLog,
    });
  });

export const getRuns = asyncHandler(async (req, res, next) => {
  const runs = await RunLog.find();

  res.status(200).json({ success: true, statusCode: 200, data: runs });
});


export const updateRun = asyncHandler(async (req, res, next) => {
  
  const run = await getRun(req.params.id);
 
  if (run) {
    run.index = req.body.index ?? run.index;
    run.date = req.body.date ?? run.date;
    run.time = req.body.time ?? run.time;
    run.token = req.body.token ?? run.token;
    run.gains = req.body.gains ?? run.gains;
    run.energy = req.body.energy ?? run.energy;

    await run.save();
  }

  res.status(204).end();
});

const getRun = async (id) => {
  
  try {
    const run = await RunLog.findById(id);
    if (!run) {
      console.log('Could not find the run');
      return null;
    }
    return run;
  } catch (error) {
    console.log('Error fetching run:', error);
    return null;
  }
};

export const getTokenPrice = asyncHandler(async (req, res, next) => {

  const ca = req.params.id;
  
  try {
    const response = await axios.get(
      `https://public-api.birdeye.so/defi/price?address=${ca}`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY },
      }
    );

    res.status(200).json({ success: true, statusCode: 200, data: response.data});
    
  } catch (error) {
    console.log(error);
  }
});