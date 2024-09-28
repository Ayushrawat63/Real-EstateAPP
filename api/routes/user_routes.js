const express = require("express");
const {
  allUsers,
  uniqueUser,
  updateUser,
  deleteUser,
} = require("../controller/user_controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get('/all', allUsers);

router.get("/unique/:id", verifyToken, uniqueUser);

router.put("/update/:id",verifyToken, updateUser);

router.delete("/delete/:id",verifyToken, deleteUser);

module.exports = router;
