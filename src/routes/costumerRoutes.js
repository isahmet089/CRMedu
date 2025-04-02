const express = require('express');
const router = express.Router();
const {custumerGetAll,costumerAdd} = require('../controllers/costumerController');

router.get("/costumer-list",custumerGetAll);
router.post("/costumer-add",costumerAdd);

module.exports = router; 