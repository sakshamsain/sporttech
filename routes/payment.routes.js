 
import express from 'express';
const router = express.Router();


import {verifyPayement, createOrder} from '../controller/payment.controller.js';

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayement);

export default router;