import { Message } from "../models/Message.js";

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

export async function getMessagesOfUsers(req, res) {
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
