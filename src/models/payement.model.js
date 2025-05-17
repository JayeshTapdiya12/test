import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    payBY: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    payemntStatues: {
        type: String,

    },
    amount: {
        type: Number
    },


}, {
    timestamps: true
});

export default model('Payement', paymentSchema);