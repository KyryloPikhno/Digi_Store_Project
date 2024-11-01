import Joi from "joi"

import { regexp } from "../configs"

const registerValidator = Joi.object({
  name: Joi.string().regex(regexp.NAME).required().messages({
    "string.pattern.base": "Invalid characters or less than one letter entered",
  }),
  email: Joi.string().regex(regexp.EMAIL).required().messages({
    "string.pattern.base": "Invalid email",
  }),
  password: Joi.string().regex(regexp.PASSWORD).required().messages({
    "string.pattern.base": "Only english letters. Min 1, max 20",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required",
  }),
})

export { registerValidator }
