const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authorization");

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", auth.varifyAdminToken, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
