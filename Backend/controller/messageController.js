import Message from "../models/messageSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

export const sendMessage = async (req, res, next)=>{
    try {
        const {senderName, email, message} = req.body;

        console.log(req.body)
        console.log(senderName, email, message)
        if(!senderName || !email || !message){
            return next(CustomErrorHandler.badRequest("Please fill all the fields"));
        }
        const data = await Message.create({senderName, email, message});
        res.status(200).json({
            success: true,
            message: "Message Sent",
            data
        })
    } catch (error) {
        return next(error);
    }
}


export const getAllMessage = async(req, res, next)=>{
    try {
        const messages = await Message.find();
        res.status(200).json({
            success: true,
            messages
        })
    } catch (error) {
        return next(error);
    }
}

export const deleteMessage = async (req, res, next)=>{
    try {
        const id = req.params.id;

        const message = await Message.findById(id);
        if(!message){
            return next(CustomErrorHandler.badRequest("Message Already Deleted"));
        }

        await message.deleteOne();
        res.status(200).json({
            success: true,
            message: "Message Deleted"
        })
    } catch (error) {
        return next(error);
    }
}