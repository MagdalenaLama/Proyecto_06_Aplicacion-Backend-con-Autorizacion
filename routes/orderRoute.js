const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/authorization");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           format: uuid
 *           description: ID del usuario que realiza la orden
 *         items:
 *           type: array
 *           description: Lista de productos en la orden
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 format: uuid
 *                 description: ID del producto en la orden
 *               quantity:
 *                 type: integer
 *                 description: Cantidad solicitada de este producto
 *                 example: 2
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - completed
 *             - canceled
 *           description: Estado de la orden
 *           example: "completed"
 *       required:
 *         - user
 *         - items
 *       example:
 *         user: "6418c7b3e4b0f9a72e55d810"
 *         items:
 *           - product: "673604ad07ccb5fbb8702468"
 *             quantity: 3
 *           - product: "6737b35fdcda3bed1cf52950"
 *             quantity: 1
 *         status: "completed"
 *
 *     OrderCreationRequest:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           description: Lista de productos y cantidades para la orden
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 format: uuid
 *                 description: ID del producto (puede ser un objeto o solo el ID)
 *               quantity:
 *                 type: integer
 *                 description: Cantidad solicitada de este producto
 *                 example: 3
 *       required:
 *         - items
 *       example:
 *         items:
 *           - product: "6418c7b3e4b0f9a72e55d811"
 *             quantity: 2
 *           - product: "6418c7b3e4b0f9a72e55d812"
 *             quantity: 1
 *
 *     OrderCreationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de éxito
 *           example: "Venta exitosa"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Mensaje de error
 *           example: "Usuario no encontrado"
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Crear una nueva orden para el usuario autenticado
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreationRequest'
 *     responses:
 *       200:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderCreationResponse'
 *       400:
 *         description: Solicitud inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Recurso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.post("/", auth.verifyUserToken, orderController.createOrder);

module.exports = router;
