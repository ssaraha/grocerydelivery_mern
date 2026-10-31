import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String, required: true, 
        ref: 'User'
    },
    items: [{
        product: {
            type: String, 
            required: true, 
            ref: 'Product'
        },
        quentity: {
            type: Number,
            required: true
        }
    }],
    amonut: {
        type: Number, 
        required: true
    },
    address: {
        type: String,
        required: true, 
        ref: 'Address'
    },
    status: {
        type: String,
        default: 'Order Placed'
    },
    paymentType: {
        type: String,
        required: true
    },
    iPaid: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Order = mongoose.overwriteMiddlewareResult.order || mongoose.model('Order', orderSchema);

export default Order;