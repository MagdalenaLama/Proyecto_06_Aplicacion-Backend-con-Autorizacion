const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/authorization");

router.post("/", auth.varifyAdminToken, productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", auth.varifyAdminToken, productController.updateProduct);
router.delete("/:id", auth.varifyAdminToken, productController.deleteProduct);

module.exports = router;
