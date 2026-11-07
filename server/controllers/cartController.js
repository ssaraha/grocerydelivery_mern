import User from "../models/User.js"

//UPDATE USER CARTDATA/ /api/cart/update
export const updateCart = async(req, res) => {
    
    try {
        const {cartItems} =  req.body;

        await User.findByIdAndUpdate(req.userId, {cartItems});

        res.status(200).json({
            success: true,
            message: 'Cart Updated Successfully'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}