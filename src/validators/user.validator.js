import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fname: Joi.string().min(3).required(),
    lname: Joi.string().min(3).required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),
    address: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
