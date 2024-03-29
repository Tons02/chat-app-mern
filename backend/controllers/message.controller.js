import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        
        //Socket IO functionality will go here

        //await conversation.save
        //await newMessage.save

        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json({
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
       }).populate('messages'); // NOT REFERENCE BUT ACTUAL MESSAGE

        if(!conversation) {
            res.status(200).json({
                message: "Message Successfully Get",
                data: []
            });
        }
        const message = conversation.messages;
        res.status(200).json({
            message: "Message Successfully Get",
            data: message
        });

    } catch (error) {
        console.error("Error get message:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

