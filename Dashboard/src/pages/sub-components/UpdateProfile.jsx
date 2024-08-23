import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllErrors,
  // getUser,
  updateProfile,
} from "@/store/slices/userSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";
import PDFViewer from "./PDFViewer";
import imgPlacholder from '../../images/image.png'
import pdfPlacholder from '../../images/pdf.jpg'


const UpdateProfile = () => {
  const { user, loading, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    aboutMe: user?.aboutMe || "",
    portfolioURL: user?.portfolioURL || "",
    linkedInURL: user?.linkedInURL === "undefined" ? "" : user?.linkedInURL,
    githubURL: user?.githubURL === "undefined" ? "" : user?.githubURL,
    instagramURL: user?.instagramURL === "undefined" ? "" : user?.instagramURL,
    twitterURL: user?.twitterURL === "undefined" ? "" : user?.twitterURL,
    facebookURL: user?.facebookURL === "undefined" ? "" : user?.facebookURL,
    avatar: null,
    resume: null,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prevData) => ({
        ...prevData,
        [type]: file,
      }));
    };
  };

  const handleUpdateProfile = () => {
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
  
  }, [dispatch, error]);
  

  return (
    <div className="w-full h-full">
      <div className="grid w-[100%] gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Update Profile</h1>
          <p className="text-balance text-muted-foreground">
            Update Your Profile Here
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="grid gap-2">
            <Label>Profile Image</Label>
            <img
              src={formData.avatar ? URL.createObjectURL(formData.avatar) : imgPlacholder}
              alt="avatar"
              className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
            />
         
            <div className="relative">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "avatar")}
                className="avatar-update-btn"
              />  
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Resume</Label>
            <PDFViewer  fileUrl={formData.resume ? URL.createObjectURL(formData.resume) : pdfPlacholder} /> 
            <div className="relative">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "resume")}
                className="avatar-update-btn"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            name="fullName"
          />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <div className="grid gap-2">
          <Label>Phone</Label>
          <Input
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
          />
        </div>
        <div className="grid gap-2">
          <Label>About Me</Label>
          <Textarea
            value={formData.aboutMe}
            onChange={handleInputChange}
            name="aboutMe"
          />
        </div>
        <div className="grid gap-2">
          <Label>Portfolio URL</Label>
          <Input
            type="text"
            value={formData.portfolioURL}
            onChange={handleInputChange}
            name="portfolioURL"
          />
        </div>
        <div className="grid gap-2">
          <Label>LinkedIn URL</Label>
          <Input
            type="text"
            value={formData.linkedInURL}
            onChange={handleInputChange}
            name="linkedInURL"
          />
        </div>
        <div className="grid gap-2">
          <Label>Github URL</Label>
          <Input
            type="text"
            value={formData.githubURL}
            onChange={handleInputChange}
            name="githubURL"
          />
        </div>
        <div className="grid gap-2">
          <Label>Instagram URL</Label>
          <Input
            type="text"
            value={formData.instagramURL}
            onChange={handleInputChange}
            name="instagramURL"
          />
        </div>
        <div className="grid gap-2">
          <Label>Twitter(X) URL</Label>
          <Input
            type="text"
            value={formData.twitterURL}
            onChange={handleInputChange}
            name="twitterURL"
          />
        </div>
        <div className="grid gap-2">
          <Label>Facebook URL</Label>
          <Input
            type="text"
            value={formData.facebookURL}
            onChange={handleInputChange}
            name="facebookURL"
          />
        </div>
        {!loading ? (
          <Button onClick={handleUpdateProfile} className="w-full">
            Update Profile
          </Button>
        ) : (
          <SpecialLoadingButton content={"Updating"} />
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
