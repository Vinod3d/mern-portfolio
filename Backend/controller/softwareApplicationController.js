import SoftwareApplication from "../models/softwareApplicationSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { v2 as cloudinary } from "cloudinary";

// ADD

export const addApplication = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      CustomErrorHandler.badRequest("Software Application icon/image required")
    );
  }

  const { svg } = req.files;
  const { name } = req.body;

  if(!name){
    return next(CustomErrorHandler.badRequest("Software Application name is required"))
  }

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      svg.tempFilePath,
      {folder : "PORTFOLIO_SOFTWARE"}
    );
  
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(
        CustomErrorHandler.badRequest(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary Error"
        )
      );
    }

    const softwareApplication = await SoftwareApplication.create({
      name,
      image:{
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
      }
    })

    res.status(200).json({
      success: true,
      message: "New Software Application Added",
      softwareApplication
    });

  } catch (error) {
    return next(error)
  }
};

// DELETE

export const deleteApplication = async (req, res, next) => {
  const {id} = req.params;
  try {
    const softwareApplication = await SoftwareApplication.findById(id);
    if(!softwareApplication){
      return next(CustomErrorHandler.notFound("Software Application not found"))
    }

    const softwareApplicationImageId = softwareApplication.image.public_id;
    await cloudinary.uploader.destroy(softwareApplicationImageId);
    await softwareApplication.deleteOne();
    res.status(200).json({
      success: true,
      message: "Software Application Deleted"
    })
  } catch (error) {
    return next(error)
  }
};


// UPDATE


export const getAllApplication = async (req, res, next) => {
  try {
    const softwareApplication = await SoftwareApplication.find();
    res.status(200).json({
      success: true,
      softwareApplication
    })
  } catch (error) {
    return next(error)
  }
};
