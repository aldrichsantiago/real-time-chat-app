import { Conversation } from "../models/Conversation.js";
import { GroupMember } from "../models/GroupMember.js";
import { User } from "../models/User.js";
import { randomUUID } from 'crypto';

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

export async function createUserByEmail(req, res) {
    try {
        const { uid, name, email, photoURL } = req.body

        const user = await User.findOne({ 
            email: email
        });
        if(user === null){
            await User.create({ 
                uid,
                name,
                email,
                photoURL,
            });
            console.log("another user created")
        return res.status(201).json(user);

        }
        return res.status(201).json(user);

    } catch (error) {
        console.log(error)

        return res.status(400).json({
            success:false, 
            message:"User Viewing Failed"
        });
    }
}

export async function createConversation(req, res) {
    try {
        const { senderEmail, receiverEmail } = req.body
        const sender = await User.findOne({ 
            email: senderEmail
        });
        const receiver = await User.findOne({ 
            email: receiverEmail
        });
        if(receiver === null){
            return res.status(201).json({
                success: false,
                message: "There is no user with that email"
            });
        }
        const newUuid = randomUUID()
        const receiverMember = await GroupMember.create({
            groupMemberId: receiver.uid,
            conversationId: newUuid
        })
        const senderMember = await GroupMember.create({
            groupMemberId: sender.uid,
            conversationId: newUuid
        })
        const newConversation = await Conversation.create({
            conversationId: newUuid,
            conversationName: newUuid,
        })

        return res.status(201).json(receiver);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false, 
            message:"User Viewing Failed"
        });
    }
}
