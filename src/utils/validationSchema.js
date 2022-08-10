const Joi = require("joi");

// auth schema
const authSchema = Joi.object({
  username: Joi.string().min(3).required(),
  phone_number: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});