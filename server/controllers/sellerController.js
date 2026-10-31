import jwt from "jsonwebtoken";
import User from "../models/User.js";


//LOGIN SELLER : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })

            return res.json({success: true, message: "Logged In"});
        }else {
            return res.json({success: false, message: 'Invalid credentials'});
        }
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//CHECK ISAUTH /api/sellerSeller
export const isSellerAuth = async(req, res) => {
    try {

        return res.json({success: true});

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false, 
            message: error.message
        })
    }
}

//LOGOUT SELLER /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.status(200).json({
            success: true,
            message: "Seller logged out successfully"
        })
    } catch (error) {
        return res.status(200).json({
            success: false, 
            message: error.message
        })
    }
}
