const express = require("express");
const { create_user, login_user } = require("../controllers/UserController");
const router = express.Router();

router.post("/auth/register", create_user);
router.post("/auth/login", login_user);

module.exports = router;
