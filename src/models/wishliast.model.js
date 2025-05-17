import { Schema, model } from "mongoose";


const wishlistSchema = new Schema({
    wishBy: {
        type: String,
        required: true
    },
    product: [{
        name: String,
        price: Number,
        category: String,
        brand: String
    }]
}, {
    timestamps: true
});

export default model('Wishlist', wishlistSchema);