import Joi from 'joi';
import { schemaValidator } from '../../middlewares/schemaValidator.middleware.mjs';

export const UserRouteSchema = {
  create: schemaValidator.body(
    Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required().min(8),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
    })
  ),
  update: schemaValidator.body(
    Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }),
      firstName: Joi.string(),
      lastName: Joi.string(),
      username: Joi.string(),
      oldPassword: Joi.string(),
      newPassword: Joi.string(),
    }).and('oldPassword', 'newPassword')
  ),

  login: schemaValidator.body(
    Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required(),
    })
  ),
};
