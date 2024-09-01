import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        minLength: [2, "Name must contain at least 2 characters"]
    },

    email : {
        type: String,
        required: true
    },

    message: {
        type: String,
        minLength: [2, "Message must contain at least 2 characters"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Message = mongoose.model("Message", messageSchema);
export default Message;