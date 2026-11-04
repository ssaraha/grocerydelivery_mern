import User from "../models/User.js"

//UPDATE USER CARTDATA/ /api/cart/update
export const updateCart = async(req, res) => {
    console.log("ETO >>> ")
    try {
        const {userId, cartItems} =  req.body;
        // const user = await User.findById(userId)
        console.log(userId, cartItems)

        // await User.findByIdAndUpdate(userId, {cartItems});

        // res.status(200).json({
        //     success: true, 
        //     message: 'Cart Updated Successfully'
        // })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}