import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({
                success: false,
                message: "Not Authirozed"
            })
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.userId = tokenDecode.id;
        }else{
            return res.status(400).json({
                success: false,
                message: "Not Authirozed"
            })
        }
        console.log("USER >>> ", req.userId)
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export default authUser;