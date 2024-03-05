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
        console.log(newMessage)
        if (newMessage) {
            conversation.message.push(newMessage._id);
        }
        
        //Socket IO functionality will go here

        //await conversation.save
        //await newMessage.save

        //this will run in parallel
        await Promise.all(conversation.save(), newMessage.save());

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


export default sendMessage;