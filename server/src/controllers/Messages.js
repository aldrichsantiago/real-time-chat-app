import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";
import { User } from "../models/User.js";

//Start of Helper Functions
// checks if a string is uuid => boolean
function isUUID(str) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
}

// find duplicates in certain fields => array of obj
const findDuplicates = (arr, field) => {
    const counts = arr.reduce((acc, obj) => {
      const key = obj[field];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  
    const duplicates = [];
    for (const key in counts) {
      if (counts[key] > 1) {
        const duplicateItems = arr.filter(obj => obj[field] === key);
        duplicates.push(...duplicateItems);
      }
    }
    return duplicates;
  };

// End of Helper Functions


export async function createMessage(req, res) {
    try {
        const { message, senderEmail, conversationName } = req.body;

        const contact = await User.findOne({email: {$in:[senderEmail]}})
        const conversation = await Conversation.findOne({conversationName: {$in:[conversationName]}})

        await Message.create({
            message,
            sender: contact._id,
            conversation: conversation._id,
        })

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

export async function getConversationMessages(req, res) {
    try {
        const { conversationName, senderEmail } = req.body
        const conversation = await Conversation.findOne({
            conversationName
        });

        if (conversationName == '1'){
            return res.status(200)
        }
        if (conversation === null){
            return res.status(400)
        }
        const sender = await User.findOne({
            email: senderEmail
        });
        // Conversation.find({
        //     conversationName: { $all: [conversationName] }
        // })
        // .populate('members') // Populate the members' details if needed
        // .exec((err, conversations) => {
        //     if (err) {
        //     // Handle error
        //     console.log(err)
        //     return res.status(400).json({success: false, message: 'Error finding conversations'});

        //     } else {
        //     // `conversations` will contain conversations where both users are members
        //     console.log('conversations', conversations);
        //     return res.status(201).json(conversations);
        //     }
        // });

        // Find all messages in the given room between the two users
        Message.find({
            conversation: conversation._id
        })
        .populate('sender') // Populate sender details if needed
        .exec((err, messages) => {
            if (err) {
            // Handle error
            } else {
            // `messages` will contain all messages exchanged between the specified users in the room
            return res.status(201).json(messages);
            }
        });
        return res.status(200)

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false, 
            message:"Error on Getting Conversations"
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
