import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    cartBy: {
        type: String,
        required: true
    },
    product: [{
        description: {
            type: String,
        },
        discountPrice: {
            type: Number,
            min: 0
        },
        productName: {
            type: String,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        image: {
            type: String
        }

    }],
    isPurchased: {
        type: Boolean,
        default: false
    }, cartTotal: {
        type: Number
    }
}, {
    timestamps: true
}
)
export default model('Cart', cartSchema);