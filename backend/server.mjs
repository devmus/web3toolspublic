import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import { connectDb } from './config/mongo.mjs';
import { errorHandler } from './middleware/errorHandler.mjs';
import rewardRouter from './routes/reward-routes.mjs';
import runlogRouter from './routes/runlog-routes.mjs';

dotenv.config({ path: './config/config.env' });

connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/api/v1/assetdash/reward', rewardRouter);
app.use('/api/v1/stepn/runlog', runlogRouter);

const PORT = 5001;

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.green.underline);
});
asd