const express = require('express');
const { createEvent, getAllEvents } = require('../controllers/eventController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); 

const router = express.Router();

router.get('/', getAllEvents); 

router.post('/', verifyToken, checkRole(['ORGANIZER', 'ADMIN']), upload.single('poster'), createEvent); 

module.exports = router;