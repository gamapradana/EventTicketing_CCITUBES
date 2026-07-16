const express = require('express');
const { register, login } = require('../controllers/authController');

const validate = require('../middlewares/validateMiddleware');
const { registerSchema } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validate(registerSchema), register);

router.post('/register', register);
router.post('/login', login);

module.exports = router;