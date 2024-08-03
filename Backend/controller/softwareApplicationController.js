import softwareApplication from "../models/softwareApplicationSchema.js"
import CustomErrorHandler from "../services/CustomErrorHandler";

export const addApplication = async (req, res, next)=>{
    if (!req.files || Object.keys(req.files) === 0) {
        return next(
          CustomErrorHandler.badRequest("Avatar and Resume Are Required")
        );
      }
}
export const deleteApplication = async (req, res, next)=>{}
export const getAllApplication = async (req, res, next)=>{}