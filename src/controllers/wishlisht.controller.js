import HttpsStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';

export const getWishlist = async (req, res) => {
    try {
        const createdBy = req.user._id;
        const data = await wishlistService.getWishlist(createdBy);
        res.status(HttpsStatus.OK).json({
            code: HttpsStatus.OK,
            data,
            message: 'Successfully fetched the wishlist'
        });
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `Can't access the wishlist: ${error.message}`
        });
    }
};

export const addWishProduct = async (req, res, next) => {
    try {
        const data = await wishlistService.addWishProduct(req.params._id, req.user.id);
        res.status(HttpsStatus.ACCEPTED).json({
            code: HttpsStatus.ACCEPTED,
            data: data,
            message: 'Successfully added to wishlist'
        });
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `Can't add the product to wishlist: ${error.message}`
        });
    }
};



export const removeWishProduct = async (req, res) => {
    try {
        const createdBy = req.user._id;
        const data = await wishlistService.removeWishProduct(req.params, createdBy);
        res.status(HttpsStatus.OK).json({
            code: HttpsStatus.OK,
            data,
            message: 'Product removed from wishlist successfully'
        });
    } catch (error) {
        res.status(HttpsStatus.BAD_REQUEST).json({
            code: HttpsStatus.BAD_REQUEST,
            message: `Can't remove the product from wishlist: ${error.message}`
        });
    }
};
