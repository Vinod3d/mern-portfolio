import Skill from "../models/SkillSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { v2 as cloudinary } from "cloudinary";

// ADD SKILL

export const addSkill = async(req, res, next)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(
          CustomErrorHandler.badRequest("Skill image required")
        );
    }
    
    const { image } = req.files;
    const { title, proficiency } = req.body;
    
    if(!title || !proficiency){
        return next(CustomErrorHandler.badRequest("Please Fill Full Form"));
    }

    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
            image.tempFilePath,
            {folder : "portfoli_skill"}
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              CustomErrorHandler.badRequest(
                "Cloudinary Error:",
                cloudinaryResponse.error || "Unknown Cloudinary Error"
              )
            );
        }

        const skill = await Skill.create({
            title,
            proficiency,
            image:{
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        })

        res.status(200).json({
            success : true,
            message: "New Skill Added",
            skill,
        })
        
    } catch (error) {
        return next(error)
    }
}


// DELETE SKILL

export const deleteSkill = async(req, res, next)=>{
    const {id} = req.params;
    try {
      const skill = await Skill.findById(id);
      if(!skill){
        return next(CustomErrorHandler.notFound("Skill not found or Deleted"))
      }
  
      const skillImageId = skill.image.public_id;
      await cloudinary.uploader.destroy(skillImageId);
      await skill.deleteOne();
      res.status(200).json({
        success: true,
        message: "skill Deleted"
      })
    } catch (error) {
      return next(error)
    }
}

// UPDATE SKILL

export const updateSkill = async(req, res, next)=>{
    const {id} = req.params;
    try {
      const skill = await Skill.findById(id);
      if(!skill){
        return next(CustomErrorHandler.notFound("Skill not found or Deleted"))
      }
  
      const { proficiency } = req.body;
      if(!proficiency){
        return next(CustomErrorHandler.badRequest("Please add your proficiency"));
    }

      const updatedSkill = await Skill.findByIdAndUpdate(
        id,
        { proficiency },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
  
      if (!updatedSkill) {
        return next(CustomErrorHandler.notFound("Failed to update skill"));
      }

      res.status(200).json({
        success: true,
        message: "updated",
        updatedSkill
      })
    } catch (error) {
      return next(error)
    }
}

// GET ALL

export const getAllSkill = async(req, res, next)=>{
    try {
        const skill = await Skill.find();
        res.status(200).json({
          success: true,
          skill
        })
    } catch (error) {
        return next(error)
    }
}