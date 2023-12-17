const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main-controller')

let url = '/api'

router.get("/", mainController.home);
router.get("/:name", mainController.productos)
router.get("/panaderia", mainController.panaderia);
router.get("/pasteleria", mainController.pasteleria);
router.get("/confiteria", mainController.confiteria);

router.get(url+'/', mainController.apiHome);

module.exports = router;