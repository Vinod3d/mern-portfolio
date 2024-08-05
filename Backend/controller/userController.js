import { User } from "../models/userSchema.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { JwtService } from "../services/JwtService.js";
import { DASHBOARD_URL } from "../config/index.js";
import { sendEmail } from "../services/sendEmail.js";
import crypto from 'crypto'

// USER REGISTER

export const register = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      CustomErrorHandler.badRequest("Avatar and Resume Are Required")
    );
  }

  const { avatar, resume } = req.files;

  try {
    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "AVATARS" }
    );

    if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
      return next(
        CustomErrorHandler.badRequest(
          "Cloudinary Error:",
          cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error"
        )
      );
    }

    const cloudinaryResponseForResume = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "MY_RESUME" }
    );

    if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
      return next(
        CustomErrorHandler.badRequest(
          "Cloudinary Error:",
          cloudinaryResponseForResume.error || "Unknown Cloudinary Error"
        )
      );
    }

    const {
      fullName,
      email,
      phone,
      aboutMe,
      password,
      portfolio,
      githubURL,
      linkedinURL,
      twitterURL,
      instagramURL,
      facebookURL,
    } = req.body;

    const user = await User.create({
      fullName,
      email,
      phone,
      aboutMe,
      password,
      portfolio,
      githubURL,
      linkedinURL,
      twitterURL,
      instagramURL,
      facebookURL,
      avatar: {
        public_id: cloudinaryResponseForAvatar.public_id,
        url: cloudinaryResponseForAvatar.secure_url,
      },
      resume: {
        public_id: cloudinaryResponseForResume.public_id,
        url: cloudinaryResponseForResume.secure_url,
      },
    });

    JwtService(user, "User Registered", 201, res);
  } catch (error) {
    return next(error);
  }
};

// USER LOGIN

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      CustomErrorHandler.badRequest("Email And Password Are Required!")
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        CustomErrorHandler.unAuthorized("Invalid Email Or Password!")
      );
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(
        CustomErrorHandler.unAuthorized("Invalid Email Or Password!")
      );
    }

    JwtService(user, "User Logged In", 200, res);
  } catch (error) {
    return next(error);
  }
};

// USER LOGOUT

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    return next(error);
  }
};

// GET USER

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
};



// USER UPDATE

export const updateProfile = async (req, res, next) => {
  const {
    fullName,
    email,
    phone,
    aboutMe,
    portfolio,
    githubURL,
    linkedinURL,
    twitterURL,
    instagramURL,
    facebookURL,
  } = req.body;

  try {
    const newUserdata = {
      fullName,
      email,
      phone,
      aboutMe,
      portfolio,
      githubURL,
      linkedinURL,
      twitterURL,
      instagramURL,
      facebookURL,
    };

    if (req.files && req.files.avatar) {
      const avatar = req.files.avatar;
      const user = await User.findById(req.user.id);
      const profileImageId = user.avatar.public_id;
      console.log(profileImageId)
      await cloudinary.uploader.destroy(profileImageId);
      const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        { folder: "AVATARS" }
      );

      newUserdata.avatar = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }

    if (req.files && req.files.resume) {
      const resume = req.files.resume;
      const user = await User.findById(req.user.id);
      const resumeId = user.resume.public_id;
      await cloudinary.uploader.destroy(resumeId);
      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "MY_RESUME" }
      );

      newUserdata.resume = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }


    const user = await User.findByIdAndUpdate(req.user.id, newUserdata, {
      new : true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    return next(error);
  }
};


// UPDATE PASSWORD

export const updatePassword = async (req, res, next)=>{
  const {currentPassword, newPassword, confirmNewPassword} = req.body;
  if(!currentPassword || !newPassword || !confirmNewPassword){
    return next(CustomErrorHandler.badRequest("Please Fill All Fields"));
  }

  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(currentPassword);
    if(!isPasswordMatched){
      return next(CustomErrorHandler.unAuthorized("Current Password is Incorrect"));
    }
  
    if(newPassword !== confirmNewPassword){
      return next(CustomErrorHandler.badRequest("New Password and Confirm New Password must be same"));
    }
  
    user.password = newPassword;
    await user.save();
  
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })
    
  } catch (error) {
    return next(error);
  }
}


// GET USER FOR PORTFOLIO FRONTEND

export const getUserPortfolio = async (req, res, next)=>{
  const id = "66aa0c8e51ec037afe460846"
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
}


// FORGOT PASSWORD

export const forgotPassword = async (req, res, next)=>{
  const user = await User.findOne({email: req.body.email});
  if(!user){
    return next(CustomErrorHandler.badRequest("User Not Found"))
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({validateBeforeSave: false});
  const resetPasswordUrl = `${DASHBOARD_URL}/password/reset/${resetToken}`;
  const message = `Your password reset token is - \n\n ${resetPasswordUrl} \n\n If you've not request for this please ignore it.` ;
  try {
    await sendEmail({
      email: user.email,
      subject: "Personal Portfolio Recovery Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    })
  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.getResetPasswordToken = undefined;
    await user.save();
    return next(error);
  }
}


// RESET PASSWORD

export const resetPassword = async (req, res, next)=>{
  const {token} = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires : {$gt: Date.now()},
    });
    if(!user){
      return next(CustomErrorHandler.badRequest("Invalid Token or has been expired"))
    }

    if(req.body.password !== req.body.confirmPassword){
      return next(CustomErrorHandler.badRequest("Password does not match"));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    JwtService(user, "Reset Password Successfully", 200, res);
    res.status(200).json("password updated successfully");
  } catch (error) {
    return next(error);
  }
}