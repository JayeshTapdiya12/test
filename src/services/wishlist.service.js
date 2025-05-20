import Wishlist from '../models/wishliast.model';
import Product from '../models/product.model';

export const getWishlist = async (userId) => {
    try {
        const res = await Wishlist.findOne({ wishBy: userId });
        return res;
    } catch (error) {
        throw new Error('Unable to retrieve wishlist');
    }
};

export const addWishProduct = async (productId, userId) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product does not exist in the database');

    let res = await Wishlist.findOne({ wishBy: userId });

    if (!res) {
        res = new Wishlist({
            wishBy: createdBy,
            product: []
        });
    }

    const existProduct = res.product.find(b => b.name === product.name);
    if (existProduct) {
        return { message: "Product already in the wishlist" };
    }

    res.product.push({
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand
    });

    await res.save();
    return res;
    // return { message: "Product added to wishlist",  res };
};

export const removeWishProduct = async (productId, userId) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error('Product does not exist in the database');

    const wishlist = await Wishlist.findOne({ wishBy: userId });
    if (!wishlist) return { message: 'Wishlist does not exist' };

    const initialLength = wishlist.product.length;
    wishlist.product = wishlist.product.filter(
        (item) => item.name !== product.name
    );

    if (wishlist.product.length === initialLength) {
        return { message: 'Product not found in wishlist' };
    }

    if (wishlist.product.length === 0) {
        await Wishlist.deleteOne({ _id: wishlist._id });
        return { message: 'Wishlist is now empty and has been removed.' };
    }

    await wishlist.save();
    return { message: 'Product removed from wishlist', wishlist };
};
