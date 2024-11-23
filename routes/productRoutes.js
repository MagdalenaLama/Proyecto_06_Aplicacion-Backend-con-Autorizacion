const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
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
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: number
 *       example:
 *         name: "Palta Hass"
 *         price: 3000
 *         stock: 20
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto si es que se envía un token con rol de admin
 *     tags: [Products]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: El producto se creó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

router.post("/", auth.verifyAdminToken, productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Todos los usuarios pueden ver la lista de productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *       500:
 *         description: Error en el servidor al enviar la repsuesta
 */
router.get("/", productController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Producto no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje del error
 *               example:
 *                 message: "Error en el servidor"
 */

router.get("/:id", productController.getProductById);
router.put("/:id", auth.verifyAdminToken, productController.updateProduct);
router.delete("/:id", auth.verifyAdminToken, productController.deleteProduct);

module.exports = router;
