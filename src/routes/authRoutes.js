const express = require("express");
const { register, login, logout, getUser } = require("../controllers/authController.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", getUser); // Giriş yapan kullanıcıyı getir

module.exports = router;