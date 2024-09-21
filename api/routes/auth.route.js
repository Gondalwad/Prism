import express from "express";
import {signup,signin,googlesignin} from '../controllers/auth.controller.js';
const router = express.Router();


router.post('/signup',signup);
router.post('/signin',signin);
router.post('/googlesignin',googlesignin);

export default router;