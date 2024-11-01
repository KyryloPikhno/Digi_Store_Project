import Joi from "joi"

import { regexp } from "../configs"

const passwordForgotValidator = Joi.object({
  name: Joi.string().regex(regexp.NAME).required().messages({
    "string.pattern.base": "Invalid characters or less than one letter entered",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "any.required": "Email is required.",
    }),
})

export { passwordForgotValidator }
