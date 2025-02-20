const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/auth');

router.post('/register',userControllers.register)
router.post('/login',userControllers.login)
router.get('/me',userControllers.authMiddleware,userControllers.me)
// router.get('/users',userControllers.users)

module.exports = router;