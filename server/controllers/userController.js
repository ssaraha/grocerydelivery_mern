import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import userRouter from "../routes/userRoutes.js";

const generateToken = (req, res, userId) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'})

    res.cookie('token', token, {
        httpOnly: true, //PREVENT JAVASCRIPT TO ACCESS COOKIE
        secure: process.env.NODE_ENV === 'production',//USE SECURE COOKIE PRODUCTION
        samesite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF PROTECTION
        maxAge: 7 * 24 * 60 * 60 * 1000, //COOKIE EXPIRATION TIME
    });
    req.body.userId = token.id;

    return token;
}

//REGISTER USER /api/user/register
export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({
                success:false,
                message: 'Missing details'
            })
        }
        const existingUser = await User.findOne({email});
         if (existingUser) {
            return res.json({
                success:false,
                message: 'User already exist'
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashPassword});

        generateToken(user._id);

        return res.status(201).json({
            success: true, 
            message: 'User created successfully',
            user: {
                name: user.name,
                email:user.email,
                
            }
        })
    } catch (error) {
        console.error(error.message)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//LOGIN USER /api/user/login
export const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.json({
                success:false,
                message: 'Email and password are required'
            })
        }

        const user = await User.findOne({email});
        if (!userRouter) {
            return res.json({
                success:false,
                message: 'Invali email or password'
            })
        }
        const isMatch  = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             return res.json({
                success:false,
                message: 'Invali email or password'
            })
        }

        const token = generateToken(req, res, user._id);

        return res.status(201).json({
            success: true, 
            message: 'User logged in successfully',
            user: {
                name: user.name,
                email:user.email,
                
            },
            token
        })

    } catch (error) {
        console.error(error.message);
        res.json({
            success: false,
            message: error.message
        })
    }
} 

//CHECK AUTH /api/user/is-auth
export const isAuth = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        return res.status(200).json({
            success: true, 
            user
        })

    } catch (error) {
        return res.status(400).json({
            success: false, 
            message: error.message
        })
    }
}
//LOGOUT USER /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(200).json({
            success: false, 
            message: error.message
        })
    }
}