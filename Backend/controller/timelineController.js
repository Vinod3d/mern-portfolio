import Timeline from "../models/timelineSchema.js"
import CustomErrorHandler from "../services/CustomErrorHandler.js";


// Timeline Create

export const postTimeline = async (req, res, next)=>{
    const {title, description, from, to} = req.body;

    try {
        const newTimeline = await Timeline.create({
            title,
            description,
            timeline: {from, to},
        })
        res.status(201).json({
            success: true,
            message: "Timeline Added",
            newTimeline
        })
    } catch (error) {
        return next(error)
    }
}

// Timeline Delete

export const deleteTimeline = async (req, res, next)=>{
    const {id} = req.params; 
    try {
        const timeline = await Timeline.findById(id);
        if(!timeline) {
            return next(CustomErrorHandler.badRequest("Timeline not found"));
        }

        await timeline.deleteOne();
        res.status(200).json({
            success: true,
            message: "Timeline Deleted",
        })
    } catch (error) {
        return next(error)
    }
}


// Get All Timeline

export const getAllTimeline = async (req, res, next)=>{
    const timeline = await Timeline.find();
    res.status(200).json({
        success:true,
        timeline,
    })
}