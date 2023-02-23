import { Joi } from "express-validation";

const registerSchema = {
  body: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
    email: Joi.string().min(8).required(),
    avatar: Joi.string(),
  }),
};

export default registerSchema;
