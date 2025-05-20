import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';

export const getWishlist = async (req, res) => {
    try {
        // const userId = req.user._id;
        const data = await wishlistService.getWishlist(req.user.id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Successfully fetched the wishlist',
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `Can't access the wishlist: ${error.message}`,
        });
    }
};

export const addWishProduct = async (req, res) => {
    try {
        // const userId = req.user._id;
        // const productId = req.params._id;
        const data = await wishlistService.addWishProduct(req.params._id, req.user.id);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Successfully added to wishlist',
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `Can't add the product to wishlist: ${error.message}`,
        });
    }
};

export const removeWishProduct = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params._id;
        const data = await wishlistService.removeWishProduct(productId, userId);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Product removed from wishlist successfully',
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `Can't remove the product from wishlist: ${error.message}`,
        });
    }
};
