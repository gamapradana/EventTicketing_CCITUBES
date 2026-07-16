const express = require('express');
const { bookTicket } = require('../controllers/bookingController'); 
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateSchema'); 
const { bookingSchema } = require('../schemas/bookingSchema'); 

const router = express.Router();


router.post('/', 
    verifyToken, 
    checkRole(['CUSTOMER']), 
    validate(bookingSchema), 
    bookTicket
);

module.exports = router;