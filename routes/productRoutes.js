const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/authorization");

router.post("/", auth.verifyAdminToken, productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", auth.verifyAdminToken, productController.updateProduct);
router.delete("/:id", auth.verifyAdminToken, productController.deleteProduct);

module.exports = router;
