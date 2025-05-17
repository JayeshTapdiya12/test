import HttpStatus from 'http-status-codes';
import *  as cartService from '../services/cart.service';



export const getCart = async (req, res, next) => {
    try {
        const data = await cartService.getCart(req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Successfullt acceptted'
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `Cannot fetch the cart: ${error}`
        })
    }
}


export const getProduct = async (req, res, next) => {
    try {
        const data = await cartService.getProduct(req.params._id, req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Successfullt got the product'
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `Not getting the product: ${error}`
        })
    }
}


export const addProduct = async (req, res, next) => {
    try {
        const data = await cartService.addProduct(req.params, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: "Product is Added in the cart"
        })

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `Not adding the product the product: ${error}`
        })
    }
}

export const removeProduct = async (req, res, next) => {
    try {
        const data = await cartService.removeProduct(req.params, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: "Product is Delete in the cart"
        })

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `Not deleting the product the product: ${error}`
        })
    }
}