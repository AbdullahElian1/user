import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { UserRouter } from '../routers/index.mjs';
import { StatusCode } from '../constants/index.mjs';

console.log('app::initExpress', 'express app init');
export const app = express();

console.log('app::initExpress', 'express app init middleware');
app.use(express.json());
app.use(cors({ origin: AppConfigs.cors.origin }));
app.use(helmet());

console.log('app::initExpress', 'express app init routes');

app.use('/api/v1/users', UserRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message, stack: err.stack });
});
