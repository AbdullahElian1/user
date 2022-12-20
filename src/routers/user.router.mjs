import expressRouter from 'express-async-router';

import { tokenValidator } from '../middlewares/tokenValidator.middleware.mjs';

import { UserRouteSchema } from './_schemas/index.mjs';
import { UserRepo } from '../dataAccess/index.mjs';
import { StatusCode } from '../constants/index.mjs';

export const UserRouter = new expressRouter.AsyncRouter({ mergeParams: true });

UserRouter.post('/register', UserRouteSchema.create, async (req, res) => {
  const user = await UserRepo.create(req.body);

  if (user === StatusCode.CONFLICT) return res.status(StatusCode.CONFLICT).send();
  res.status(StatusCode.CREATED).json(user);
});

UserRouter.put('/', [tokenValidator, UserRouteSchema.update], async (req, res) => {
  const updated = await UserRepo.update(req.body, req.user.id);
  if (updated === StatusCode.CONFLICT) return res.status(StatusCode.CONFLICT).send();
  if (updated === StatusCode.NOT_FOUND) return res.status(StatusCode.NOT_FOUND).send();
  res.status(StatusCode.OK).json();
});

UserRouter.post('/login', UserRouteSchema.login, async (req, res) => {
  const user = await UserRepo.login(req.body);
  if (user === undefined) return res.status(StatusCode.UNAUTHORIZED).send();
  res.json(user);
});

UserRouter.delete('/', tokenValidator, async (req, res) => {
  res.status(StatusCode.DELETED).json(await UserRepo.delete(req.user.id));
});

UserRouter.get('/', tokenValidator, async (req, res) => {
  res.status(StatusCode.OK).json(await UserRepo.get(req.user.id));
});
