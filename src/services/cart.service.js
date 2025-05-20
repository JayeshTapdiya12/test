import Cart from '../models/cart.model';
import Product from '../models/product.model';

export const getCart = async (user) => {
    try {
        const data = await Cart.findOne({ cartBy: user.id });
        return data;
    } catch (error) {
        return "cart not found";
    }
};

export const getProduct = async (productId, user) => {
    try {
        const userCart = await Cart.findOne({ cartBy: user.id });
        const product = await Product.findById(productId);

        if (!product) {
            return { message: "Product not found" };
        }

        if (userCart) {
            const productInCart = userCart.product.find(
                (cartProduct) => cartProduct.productName === product.name
            );
            if (productInCart) {
                return productInCart;
            } else {
                return { message: "Product not in the cart" };
            }
        } else {
            return { message: "Cart not found for the user" };
        }
    } catch (error) {
        console.error("Error finding product in cart:", error);
        throw new Error("Error retrieving the product from the cart");
    }
};

export const addProduct = async (productId, user) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    let userCart = await Cart.findOne({ cartBy: user.id });

    if (userCart) {
        const productInCart = userCart.product.find(
            (cartProduct) => cartProduct.productName === product.name
        );
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            userCart.product.push({
                description: product.description,
                discountPrice: product.discountPrice,
                productName: product.name,
                quantity: 1,
                price: product.price,
                image: product.img
            });
        }
    } else {
        userCart = new Cart({
            cartBy: user.id,
            product: [
                {
                    description: product.description,
                    discountPrice: product.discountPrice,
                    productName: product.productName,
                    quantity: 1,
                    price: product.price,
                    image: product.img
                }
            ]
        });
    }

    userCart.cartTotal = userCart.product.reduce((total, p) => {
        const priceToUse = p.discountPrice != null ? p.discountPrice : p.price;
        return total + priceToUse * p.quantity;
    }, 0);

    await userCart.save();
    return userCart;
};

export const removeProduct = async (productId, user) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    const userCart = await Cart.findOne({ cartBy: user.id });
    if (!userCart) {
        throw new Error("Cart not found");
    }

    const productIndex = userCart.product.findIndex(
        (cartProduct) => cartProduct.productName === product.productName
    );

    if (productIndex !== -1) {
        const cartProduct = userCart.product[productIndex];
        if (cartProduct.quantity > 1) {
            cartProduct.quantity -= 1;
        } else {
            userCart.product.splice(productIndex, 1);
        }

        userCart.cartTotal = userCart.product.reduce((total, p) => {
            const priceToUse = p.discountPrice != null ? p.discountPrice : p.price;
            return total + priceToUse * p.quantity;
        }, 0);

        if (userCart.product.length === 0) {
            await userCart.deleteOne();
            return { message: "Cart is empty and has been deleted." };
        } else {
            await userCart.save();
            return userCart;
        }
    } else {
        throw new Error("Product not found in cart");
    }
};
