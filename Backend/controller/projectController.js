import Project from "../models/projectSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { v2 as cloudinary } from "cloudinary";


// PROJECT ADD

export const addProject = async (req, res, next)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(
          CustomErrorHandler.badRequest("Project Banner Image Required")
        );
    }

    const { projectBanner } = req.files;
    const {
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
    } = req.body;

    if(
        !title ||
        !description ||
        !gitRepoLink ||
        !projectLink ||
        !technologies ||
        !stack ||
        !deployed
    ){
        return next(CustomErrorHandler.badRequest("Please Provide All Details"));
    }

    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(
            projectBanner.tempFilePath,
            { folder: "projects_banner" }
        );
      
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return next(
              CustomErrorHandler.badRequest(
                "Cloudinary Error:",
                cloudinaryResponse.error || "Unknown Cloudinary Error"
              )
            );
        }

        const project = await Project.create({
            title,
            description,
            gitRepoLink,
            projectLink,
            technologies,
            stack,
            deployed,
            projectBanner : {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            }
        });


        res.status(201).json({
            success: true,
            message: "New Project Added",
            project,
        });
        
    } catch (error) {
        return next(error);
    }
}


// UPDATE PROJECT

export const updateProject = async (req, res, next)=>{
    const { id } = req.params;

    const {
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
    } = req.body;
    const { projectBanner } = req.files || {};
   

    const newProjectData = {
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
    };

    try {
        const project = await Project.findById(id);
        if (!project) {
            return next(CustomErrorHandler.notFound("Project Not Found"));
        }
        if(projectBanner === null){

            const bannerImageId = project.projectBanner.public_id;
            await cloudinary.uploader.destroy(bannerImageId);
            const cloudinaryResponse = await cloudinary.uploader.upload(
                projectBanner.tempFilePath,
                { folder: "projects_banner" }
            );
          
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return next(
                  CustomErrorHandler.badRequest(
                    "Cloudinary Error:",
                    cloudinaryResponse.error || "Unknown Cloudinary Error"
                  )
                );
            }
    
            newProjectData.projectBanner = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            }
        }

        const updatedProjectData = await Project.findByIdAndUpdate(
            id,
            newProjectData,
            {
                new : true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        res.status(200).json({
            success: true,
            message: "Project Updated Successfully",
            updatedProjectData
        })

        
    } catch (error) {
        return next(error);
    }
}


// PROJECT DELETE

export const deleteProject = async (req, res, next)=>{
    const {id} = req.params;
    try {
        const project = await Project.findById(id);
        if(!project){
            return next(CustomErrorHandler.notFound("Project Not Found"))
        }
        await project.deleteOne();
        res.status(200).json({
            success: true,
            message: "Project Deleted Successfully",
        });
    } catch (error) {
        return next(error);
    }
}


// GET APP PROJECTS

export const getAllProject = async (req, res, next)=>{
    try {
        const projects = await Project.find();
        res.status(200).json({
            success: true,
            projects,
        });
    } catch (error) {
        return next(error);
    }
}


// GET APP PROJECTS


export const getSingleProject = async (req, res, next)=>{
    const {id} = req.params;
    try {
        const project = await Project.findById(id);
        if(!project){
            return next(CustomErrorHandler.notFound("Project Not Found"))
        }

        res.status(200).json({
            success: true,
            project
        })
    } catch (error) {
        
    }
}