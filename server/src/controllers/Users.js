import mongoose from "mongoose";
import { Conversation } from "../models/Conversation.js";
import { User } from "../models/User.js";
import { randomUUID } from 'crypto'

// Helpers

const checkIfEmailExists = async (email) => {
    try {
      const existingUser = await User.findOne({ email: email });
  
      if (existingUser) {
        console.log('Email already exists in the database');
        // You might return a boolean, throw an error, or perform another action based on your requirement
        return true;
      } else {
        console.log("Email doesn't exist in the database");
        return false;
      }
    } catch (error) {
      console.error('Error occurred while checking for the email:', error);
      // Handle the error as required
      throw error;
    }
  };
//

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

        checkIfEmailExists(email)
        .then(nameExists => {
            if (!nameExists) {
                User.create({ 
                    uid,
                    name,
                    email,
                    photoURL,
                });
                return res.status(201).json({success: true, message: "Another User Created"});
            } else {
                return res.status(200).json({success:false, message: "User already exists"});
            }
          })
          .catch(err => {
            // Handle any errors that might occur during the check
            console.error(err);
          });
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
        const { senderEmail, receiverEmail } = req.body;

        const contact = await User.find({email: {$in:[senderEmail, receiverEmail]}},'_id')
        const members = contact.map(contactObj => contactObj._id);

        const conversationExists = Conversation.find({ members: { $all: members }})
        .populate('members') // Populate the members' details if needed
        .exec(async(err, conversations) => {
            if (err) {
                // Handle error
                console.log(err)
                return res.status(400).json({success: false, message: 'Error finding conversations'});
            } else {
                // `conversations` will contain conversations where both users are members
                if(conversations.length == 0){
                    const conversationName = randomUUID();
                    const newConversation = new Conversation({
                        conversationName,
                        members
                    });
                    console.log(conversationName)
                    try {
                        const savedConversation = await newConversation.save(); 
                        console.log(savedConversation)
                        res.status(201).json(savedConversation); 
                    } catch (error) {
                        return res.status(400).json({
                            success:false, 
                            message:"Creating a conversation failed"
                        });
                    }
                } else {
                    return res.status(201).json(conversations);
                }
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false, 
            message:"Creating a conversation failed"
        });
    }
}


export async function getConversations(req, res) {
    try {
        const { uid } = req.body
        const user = await User.findOne({
            uid: uid
        },'_id');
        
        let userId1 = user._id
        // Conversation.find({
        //     members: { $all: [userId1] }
        // })
        // .populate('members') // Populate the members' details if needed
        // .exec((err, conversations) => {
        //     if (err) {
        //     // Handle error
        //     console.log(err)
        //     return res.status(400).json({success: false, message: 'Error finding conversations'});

        //     } else {
        //     // `conversations` will contain conversations where both users are members
        //     console.log('Conversations involving the users:', conversations);
        //     return res.status(201).json(conversations);
        //     }
        // });

        Conversation.aggregate([
            {
                $match: { members: mongoose.Types.ObjectId(userId1) }
            },
            {
              $lookup: {
                from: 'messages',
                localField: '_id',
                foreignField: 'conversation',
                as: 'messages',
              },
            },
            {
              $project: {
                _id: 1,
                conversationName: 1,
                latestMessage: { $arrayElemAt: ['$messages', -1] },
                members: 1
              },
            },
            {
              $lookup: {
                from: 'users', // Assuming your user collection is named 'users'
                localField: 'members',
                foreignField: '_id',
                as: 'memberDetails',
              },
            },
            {
              $addFields: {
                members: '$memberDetails',
              },
            },
            { $sort: { 'latestMessage.createdAt': -1 } },
          ])
            .exec((err, conversations) => {
              if (err) {
                console.error(err);
                return res.status(400).json({success: false, message: 'Error finding conversations'});
                // Handle error
              } else {
                console.log(conversations);
                // Conversations sorted by the latest messages with members populated
                return res.status(201).json(conversations);
                }
            });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false, 
            message:"Error on Getting Conversations"
        });
    }
}

export async function getContact(req, res) {
    try {
        const { uid, conversationName } = req.body
        const user = await User.findOne({
            uid: uid
        },'_id');
        
        Conversation.findOne({ conversationName: conversationName })
        .select('members') // Select the 'members' field only
        .populate('members', 'uid name email photoURL') // Populate user details for the members
        .exec((err, conversation) => {
            if (err) {
            console.error(err);
            // Handle error
            return res.status(400).json({
                success:false, 
                message:"Error on Getting Conversations"
            });
            } else {
            if (conversation) {
                const contact = conversation.members.find(contact => contact.uid !== uid)
                return res.status(201).json(contact);
                // Users who are members of the specified conversation
            } else {
                console.log('Conversation not found');
                return res.status(400).json({
                    success:false, 
                    message:"Error on Getting Conversations"
                });
            }
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false, 
            message:"Error on Getting Conversations"
        });
    }
}


