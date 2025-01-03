const router = require("express").Router()

const { authController } = require("../controllers")
const { userMiddleware, authMiddleware } = require("../middlewares")

router.post(
  "/registration",
  userMiddleware.isNewUserValid,
  userMiddleware.checkIsEmailUnique,
  authController.registration,
)

router.post("/refresh", authMiddleware.checkRefreshToken, authController.refresh)

router.post("/login", userMiddleware.getUserDynamically("email"), authController.login)

router.get("/account", authMiddleware.decryptionAccessToken, authController.account)

router.post("/logoutAll", authMiddleware.checkAssessToken, authController.logoutAll)

router.post(
  "/password/forgot",
  userMiddleware.getUserDynamically("email"),
  authController.forgotPassword,
)

router.put(
  "/password/forgot",
  authMiddleware.checkActionToken,
  authController.forgotPasswordAfterForgot,
)

module.exports = router
