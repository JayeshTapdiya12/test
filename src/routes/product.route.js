import express from 'express';
import * as productController from '../controllers/product.controller';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.get('', productController.getAllProduct);

router.get('/:_id', productController.getById);


// adding the product

router.post('/productadd', productController.addProduct)


// this is for the delete one
// router.delete

export default router;
