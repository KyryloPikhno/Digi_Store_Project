const router = require("express").Router()

const { deviceController } = require("../controllers")
const { authMiddleware, userMiddleware, fileMiddleware } = require("../middlewares")

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     description: Retrieve all devices from the database
 *     responses:
 *       200:
 *         description: A list of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */
router.get("/", deviceController.getAll)

/**
 * @swagger
 * /devices/similarDevices/{deviceId}/{categoryId}:
 *   get:
 *     summary: Get similar devices
 *     description: Retrieve devices that are similar to the specified device based on the category.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         required: true
 *         description: ID of the device to find similar devices for
 *         schema:
 *           type: string
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to filter similar devices
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of similar devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 *       401:
 *         description: Unauthorized - Invalid token
 *       404:
 *         description: Device not found
 */
router.get("/similarDevices/:deviceId/:categoryId", deviceController.getSimilarDevices)

/**
 * @swagger
 * /devices/{deviceId}:
 *   get:
 *     summary: Get device by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         required: true
 *         description: ID of the device to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single device
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       401:
 *         description: Unauthorized - Invalid token
 *       404:
 *         description: Device not found
 */
router.get("/:deviceId", deviceController.getById)

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     description: Create a new device in the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: Device created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 *       500:
 *         description: Failed to create device
 */
router.post(
  "/",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  deviceController.create,
)

/**
 * @swagger
 * /devices/{deviceId}:
 *   put:
 *     summary: Update device information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         required: true
 *         description: ID of the device to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Device updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'
 */
router.put("/:deviceId", authMiddleware.checkAssessToken, deviceController.update)

/**
 * @swagger
 * /devices/{deviceId}:
 *   delete:
 *     summary: Delete a device
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         required: true
 *         description: ID of the device to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Device removed
 *       500:
 *         description: Failed to delete device
 */
router.delete(
  "/:deviceId",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  deviceController.delete,
)

router.put(
  "/uploadImage/:deviceId",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  fileMiddleware.array("image", 3),
  deviceController.uploadImages,
)

router.put(
  "/removeImage/:deviceId",
  authMiddleware.checkAssessToken,
  authMiddleware.decryptionAccessToken,
  userMiddleware.isAdmin,
  deviceController.removeImage,
)

module.exports = router
