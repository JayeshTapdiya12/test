import express from 'express';

import * as wishlistController from '../controllers/wishlisht.controller';

import { userAuth } from '../middlewares/auth.middleware'

import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.post('/get/:_id', userAuth(process.env.hidden_key), wishlistController.getWishlist);
router.post('/add/:_id', userAuth(process.env.hidden_key), wishlistController.addWishProduct);
router.post('/remove/:_id', userAuth(process.env.hidden_key), wishlistController.removeWishProduct);

export default router;