import Order from "../models/Order.js"
import Product from "../models/Product.js"

//PLACE ORDER COD : /api/order/cod
export const placeOrderCOD = async(req, res) => {

    try {
        const {userId, items, address} = req.body;
        if (!address || items.length === 0) {
            return json.status(404).json({success: false, message: 'Invalid data'})
        }

        //CALCULATE AMOUNT USING ITEMS
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);

            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        //ADD AX CHARGE 2%
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            address,
            paymentType: 'COD'
        })

        return res.status(201).json({
            success: true,
            message: "Order placed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: flase,
            message: error.message
        })
    }
}

//GET ORDERS BY USER ID: /api/order/user
export const getUserOrders = async(req, res) => {
    try {
        const {userId} = req.body;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            message: "Getting orderd of user successffully",
            orders
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.false,
        })
    }
}

//GET ALL ORDERS (for seller/admin): /api/order/seller
export const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {isPaid: true}]
        }).populate("items.product address");

        return res.status(200).json({
            success: true,
            message: "Getting orderd of seller successffully",
            orders
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.false,
        })
    }
}