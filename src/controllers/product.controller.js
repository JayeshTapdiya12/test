import HttpStatus from 'http-status-codes';
import * as productService from '../services/product.service';


// get all the items/product

export const getAllProduct = async (req, res, next) => {
    try {
        const data = await productService.getAllProduct();
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All the product fetched'
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        })
    }
};

export const getById = async (req, res, next) => {
    try {
        const data = await productService.getById(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'product by id'
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: 'product not fetched by id'
        })
    }
}


export const addProduct = async (req, res, next) => {
    try {
        const data = await productService.addProduct(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'succesfullt add the product'
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `product is not addede : ${error}`
        })
    }
}