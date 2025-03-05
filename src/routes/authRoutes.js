const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/req-reset',authController.requestResetPassword)
router.post('/reset',authController.resetPassword)

module.exports = router;