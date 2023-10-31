import { Conversation } from "../models/Conversation.js";
import { GroupMember } from "../models/GroupMember.js";
import { Message } from "../models/Message.js";

//Start of Helper Functions
function isUUID(str) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
}
// End of Helper Functions
// Basic CRUD
export async function createMessage(req, res) {
    try {
        const { message, senderEmail, receiverEmail, senderUID, receiverUID } = req.body;
        const groupMembers = await GroupMember.find({
            groupMemberId: {$in:[senderUID, receiverUID]},
        })

        console.log(groupMembers)
        
        
        console.log(groupMembers)
        return res.status(200)
        await Message.create({ 
            message,
            conversationId,
            senderEmail,
            receiverEmail,
        });
        return res.status(201).json({
            success: true,
            message: "Message Sent"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export async function getMessagesOfUser(req, res) {
    try {
        const { email } = req.body
        const messages = await Message.find({
            senderEmail: email
        });
        return res.status(201).json(messages);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false, 
            message:"Message not viewed"
        });
    }
}

export async function sendMessage(req, res) {
    try {
        const email = req.body
        const messages = await Message.find({
            senderEmail: email
        });


        return res.status(201).json(messages);
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false, 
            message:"Message not viewed"
        });
    }
}


// export async function getMessagesOfUser(req, res) {
//     try {
//         const userId = req.params.userId
//         if(!isUUID(userId)){
//             console.log("userId is not a valid UUID")
//             return res.status(400).json({
//                 success:false, 
//                 message:"userId is not a valid UUID"
//             });
//         }
//         const messages = await Message.find({
//             senderId: userId
//         });
//         console.log("Getting Messages...")
//         return res.status(201).json({ messages });
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({
//             success:false, 
//             message:"Message not viewed"
//         });
//     }
// }