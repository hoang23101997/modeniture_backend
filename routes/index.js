/** @format */

import express from 'express';
import authRouter from './auth.route.js';
import postRouter from './post.route.js';
import 'dotenv/config';
import profileRouter from './profile.route.js';
import paymentRouter from './payments.route.js';
const router = express.Router();
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/profile', profileRouter);
router.use('/payments', paymentRouter);

export default router;
