import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title Required"],
    },
    description: {
        type: String,
        required: true,
    },
    timeline: {
        from: {
            type: String,
            required: [true, "Timeline Starting Date is Required"]
        },
        to: String,
    },
})

const timeline = mongoose.model("timeline", timelineSchema);
export default timeline;