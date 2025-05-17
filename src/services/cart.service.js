import Cart from '../models/cart.model';
import Product from '../models/product.model'


export const getCart = async (body) => {
    try {
        const data = await Cart.findOne({ cartBy: body.createdBy });
        return data;
    } catch (error) {
        return "cart not found";
    }
}

export const getProduct = async (productId, body) => {
    try {


        const userCart = await Cart.findOne({ cartBy: body.createdBy });
        // ye apn ne find kiya hai konsa product hai from front end
        const product = await Product.findOne({ _id: productId });

        if (userCart) {

            const productInCart = userCart.product.find(cartProduct => cartProduct.description === product.description);
            if (productInCart) {
                return productInCart;
            } else {
                return { message: 'product not in the cart' }
            }
        } else {
            return { message: "Cart not found for the user" };
        }
    } catch (error) {
        console.error("Error finding book in cart:", error);
        throw new Error("Error retrieving the book from the cart");
    }
}


export const addProduct = async (productId, body) => {
    const productis = await Product.findById({ _id: productId });
    if (!productis) {
        throw new Error("Product not found");
    }
    const isCartExist = await Cart.findOne({ cartBy: body.createdBy });
    try {
        if (isCartExist) {

            const isProductExist = isCartExist.product.find(cartProduct => cartProduct.productName === productis.name);
            if (isProductExist) {
                isProductExist.quantity += 1;
            } else {
                isCartExist.book.push({
                    description: productis.description,
                    discountPrice: productis.discountPrice,
                    productName: productis.productisName,
                    quantity: 1,
                    price: productis.price,
                    image: productis.img
                })
            }
        } else {

            isCartExist = new Cart({
                cartBy: body.createdBy,
                product: [{
                    description: productis.description,
                    discountPrice: productis.discountPrice,
                    productName: productis.productName,
                    quantity: 1,
                    price: productis.price,
                    image: productis.img
                }]
            });
        }
        isCartExist.cartTotal = isCartExist.product.reduce((total, p) => {
            const priceToUse = p.discountPrice != null ? p.discountPrice : p.price;
            return total + (priceToUse * p.quantity);
        }, 0);

        await isCartExist.save();
        return isCartExist;
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw new Error("Failed to add product to cart");
    }
}


export const removeProduct = async (productId, body) => {
    const isProduct = await Product.findById({ _id: productId });;
    const isExistCart = await Cart.findOne({ cartBy: body.createdBy });

    if (isExistCart) {
        const productIndex = isExistCart.product.findIndex(cartProduct => cartProduct.productName === isProduct.name);
        if (productIndex !== -1) {
            const cartProduct = isExistCart.product[productIndex];
            if (cartProduct > 1) {
                cartProduct -= 1;
            } else {
                isExistCart.product.splice(productIndex, 1)
            }
            await isExistCart.save();
        }
    }
}