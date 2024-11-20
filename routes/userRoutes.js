const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authorization");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        orders:
 *          type: array
 *          items:
 *            type: string
 *        role:
 *          type: string
 *      example:
 *        name: "Mike"
 *        email: "mike@gmail.com"
 *        password: "password"
 *        orders: []
 *        role: "admin"
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se creó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

router.post("/register", userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "mike@email.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *             example:
 *               token: "token"
 */
router.post("/login", userController.login);
router.put("/update", auth.varifyUserToken, userController.updateUser);
router.get("/verifytoken", auth.varifyUserToken, userController.verifyToken);

// no incluidas en pauta
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports = router;
