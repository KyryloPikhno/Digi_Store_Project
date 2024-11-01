const { ApiError } = require("../errors")
const { User } = require("../models")
const { userService } = require("../services")
const { newUserValidator, editUserValidator } = require("../validators/user.validator")

module.exports = {
  isNewUserValid: async (req, res, next) => {
    try {
      let validate = newUserValidator.validate(req.body)

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      req.body = validate.value

      next()
    } catch (e) {
      next(e)
    }
  },

  isEditUserValid: async (req, res, next) => {
    try {
      let validate = editUserValidator.validate(req.body)

      if (validate.error) {
        throw new ApiError(validate.error.message, 400)
      }

      req.body = validate.value

      next()
    } catch (e) {
      next(e)
    }
  },

  getUserDynamically:
    (fieldName, from = "body", dbField = fieldName) =>
    async (req, res, next) => {
      try {
        const fieldToSearch = req[from][fieldName]

        const user = await User.findOne({ [dbField]: fieldToSearch })

        if (!user) {
          throw new ApiError("Wrong email or password.", 404)
        }

        req.user = user

        next()
      } catch (e) {
        next(e)
      }
    },

  checkForUniqueness:
    (fieldName, from = "body", dbField = fieldName) =>
    async (req, res, next) => {
      try {
        const fieldToSearch = req[from][fieldName]

        const user = await User.findOne({ [dbField]: fieldToSearch })

        if (user) {
          throw new ApiError("User already exists...", 400)
        }

        next()
      } catch (e) {
        next(e)
      }
    },

  isAdmin: async (req, res, next) => {
    try {
      const user = await userService.findOneByParams({ _id: req.userInfo.id })

      if (!user.isAdmin) {
        throw new ApiError("User is not admin", 400)
      }

      next()
    } catch (e) {
      next(e)
    }
  },

  checkIsEmailUnique: async (req, res, next) => {
    try {
      const { email } = req.body

      if (!email) {
        throw new ApiError("Email not present", 400)
      }

      const user = await User.findOne({ email })

      if (user) {
        throw new ApiError("User with this email already exists", 409)
      }

      next()
    } catch (e) {
      next(e)
    }
  },
}
