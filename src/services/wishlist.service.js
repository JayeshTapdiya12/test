import Wishlist from '../models/wishliast.model';
import Product from '../models/product.model';


export const getWishlist = async (createdby) => {
    try {
        const data = await Wishlist.findOne({ wishBy: createdby });
        return data;
    } catch (error) {
        return 'does not have the wishlist'
    }
}
export const addWishProduct = async (productId, createdby) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product does not exist in the database");
    }

    let wish = await Wishlist.findOne({ wishBy: createdby });

    if (!wish) {
        wish = new wish({

            wishBy: createdby,
            product: []
        })
    }

    const existProduct = wish.product.find(b => b.name = product.name);

    if (existProduct) {
        return { message: "product already in the wishlist" };
    }
    wish.product.push({
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand
    })
    await wish.save();
    return { message: "Product added to wishlist", wishlist: wish };

};


export const removeWishProduct = async (productId, createdBy) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("product is not in the database ");
    }
    let wish = await Wishlist.findOne({ wishBy: createdBy });

    if (!wish) {
        return { messgae: "there is no wishlist" };
    }
    const existProduct = wish.product.find(b => b.name = product.name);
    if (existProduct) {
        return { message: "product already in the wishlist" };
    }

    wish.product = wish.product.filter(b => b.name = product.name);

    if (wish.product.length === 0) {
        await wish.deleteOne({ _id: wish._id });
        return { message: "Wishlist is now empty and has been removed." };
    }
    await wish.save();
    return { message: "Book removed from wishlist", wishlist: wish };

}