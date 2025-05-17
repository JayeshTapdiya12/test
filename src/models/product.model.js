
import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    review: {
        type: String,

    }
},
    {
        timestamps: true
    });


export default model('Product', productSchema);