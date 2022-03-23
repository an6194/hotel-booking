import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string().required(),
});
