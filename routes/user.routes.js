import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { registerUser,updateUser,getUser,getBillAmount,uploadPaymentProof } from '../controller/user.controller.js';
import {upload}  from "../middleware/multer.middelware.js"
import {uploadImageMiddleware} from '../middleware/Image.middleware.js';

const router = express.Router();


router.post("/register",registerUser)

router.post("/update",userAuth,updateUser)

router.get("/getUser",userAuth,getUser)

router.get("/getBill",userAuth,getBillAmount)

router.post("/uploadReciept",userAuth,
    upload.single("image"),uploadImageMiddleware('paymentReciept'),
    uploadPaymentProof
)

export default router;
