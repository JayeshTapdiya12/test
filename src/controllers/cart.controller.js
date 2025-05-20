import HttpsStatus from 'http-status-codes';
import *as cartService from '../services/cart.service'


export const getCart = async (req, res) => {
    try {
        const data = await cartService.getCart(req.user);
        res.status(HttpsStatus.OK).json({
            code: HttpsStatus.OK,
            data,
            message: "Successfully fetched cart"
        });
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `Cannot fetch the cart: ${error.message}`
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const data = await cartService.getProduct(req.params._id, req.user);
        res.status(HttpsStatus.OK).json({
            code: HttpsStatus.OK,
            data,
            message: "Successfully fetched product in cart"
        });
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `Not getting the product: ${error.message}`
        });
    }
};

export const addProduct = async (req, res) => {
    try {
        const data = await cartService.addProduct(req.params._id, req.user);
        res.status(HttpsStatus.OK).json({
            code: HttpsStatus.OK,
            data,
            message: "Product added to cart"
        });
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `Not adding the product: ${error.message}`
        });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const data = await cartService.removeProduct(req.params._id, req.user);
        res.status(HttpsStatus.OK).json({
            code: HttpsStatus.OK,
            data,
            message: "Product removed from cart"
        });
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `Not deleting the product: ${error.message}`
        });
    }
};
