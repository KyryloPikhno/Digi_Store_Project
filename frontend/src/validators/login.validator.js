import Joi from "joi"

import { regexp } from "../configs"

const loginValidator = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),
  password: Joi.string().min(8).max(20).regex(regexp.PASSWORD).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password must be at most 20 characters long.",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    "any.required": "Password is required.",
  }),
})

export { loginValidator }
