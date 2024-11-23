const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authorization");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth: # arbitrary name for the security scheme
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         orders:
 *           type: array
 *           items:
 *             type: string
 *         role:
 *           type: string
 *       example:
 *         name: "Mike"
 *         email: "mike@gmail.com"
 *         password: "password"
 *         role: "admin"
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
 *               email: "mike@gmail.com"
 *               password: "password"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Inicio de sesión exitoso."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZmNiMGU5MTcxM2QyZjJiNWI4Mzk2Iiwicm9sZSI6ImNvbXByYWRvciJ9LCJpYXQiOjE3MzIyNzYwOTIsImV4cCI6MTczMjYzNjA5Mn0.TSRb5mkd9TZeUgtwJjusi_BO6KNIWdmyVFjTyXXQSGM"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                      type: string
 *                      example: "673fcb0e91713d2f2b5b8396"
 *                     email:
 *                      type: string
 *                      example: "usuario@gmail.com"
 *                     role:
 *                      type: string
 *                      example: "comprador"
 *
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /users/update:
 *   put:
 *     summary: Actualizar información del usuario
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []  # Indica que se requiere un token JWT en el encabezado de autorización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario se actualizó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado, token inválido o no proporcionado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */

router.put("/update", auth.verifyUserToken, userController.updateUser);

/**
 * @swagger
 * /users/verifytoken:
 *   get:
 *     summary: Verificar token de usuario
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido
 */
router.get("/verifytoken", auth.verifyUserToken, userController.verifyToken);

// no incluidas en pauta
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports = router;
