import express from 'express';
import { adminSignup,getAdmin } from '../controller/admin.controller.js';


const router = express.Router();


router.post('/signup', adminSignup);
router.get('/get-admin', getAdmin);

export default router;

