import { Message } from "../models/Message.js";

//Start of Helper Functions
function isUUID(str) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
}


// End of Helper Functions

// Basic CRUD
export async function createMessage(req, res) {
    await Message.create({ name: 'aldrich' });
    return res.send('<h1>Message Created</h1>')
}

export async function getMessagesOfUser(req, res) {
    try {
        const userId = req.params.userId
        if(!isUUID(userId)){
            console.log("userId is not a valid UUID")
            return res.status(400).json({
                success:false, 
                message:"userId is not a valid UUID"
            });
        }
        const messages = await Message.find({
            senderId: userId
        });
        console.log("Getting Messages...")
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