import { User } from "../models/User.js";


export async function createUser(req, res) {
    try {
        const { name, email, uid } = req.body
        await User.create({ 
            uid,
            name,
            email,
        });
        console.log("A new user has been created.")
        return res.status(201).json({
            success:true, 
            message:"User has been created"
        });

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            success:false, 
            message:"User Creation Failed"
        });
    }
}

export async function getUserByEmail(req, res) {
    try {
        const { email } = req.body
        const user = await User.findOne({ 
            email: email
        });
        console.log(user)
        return res.status(201).json(user);

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            success:false, 
            message:"User Viewing Failed"
        });
    }
}
