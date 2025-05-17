import HttpsStatus from 'http-status-codes';

import *  as wishlistService from '../services/wishlist.service';

export const getWishlist = async (req, res, next) => {
    try {
        const data = await wishlistService.getWishlist(req.body.createdBy);
        res.status(HttpsStatus.ACCEPTED).json({
            code: HttpsStatus.ACCEPTED,
            data: data,
            message: 'succesfully fetched the wiishlist'
        })
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `can't access the wishlist : ${error}`
        })
    }
}

export const addWishProduct = async (req, res, next) => {
    try {
        const data = await wishlistService.addWishProduct(req.params, req.body.createdBy);
        res.status(HttpsStatus.ACCEPTED).json({
            code: HttpsStatus.ACCEPTED,
            data: data,
            message: 'succesfully fetched the wiishlist'
        })
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `can't add the product the wishlist : ${error}`
        })
    }
}

export const removeWishProduct = async (req, res, next) => {
    try {
        const data = await wishlistService.removeWishProduct(req.params, req.body.createdBy);
        res.status(HttpsStatus.ACCEPTED).json({
            code: HttpsStatus.ACCEPTED,
            data: data,
            message: 'succesfully remove the product  the wiishlist'
        })
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `can't remove the product the wishlist : ${error}`
        })
    }
}