import Address from "../models/Address.js"

//ADD ADRESS : /api/address/add
export const add = async (req, res) => {
    try {
        const {userid, address} = req.body;
        await Address.create({...address, userid})

        return res.status(201).json({
            success: true,
            message: "Address created successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//GET ADDRESS: /api/address/get
export const getAddress = async(req, res) => {
    try {
        const {userId} = req.body;
        const address = await Address.findById(userId);

        return res.status(200).json({
            success: true,
            message: "Getting address successfully",
            address
        })
    } catch (error) {
        
    }
}