const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/authorization");

router.post("/", auth.verifyUserToken, orderController.createOrder);

module.exports = router;
