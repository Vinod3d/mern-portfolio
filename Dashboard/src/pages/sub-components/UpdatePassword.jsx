
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { updatePassword } from "../../store/slices/userSlice";
import { useState } from "react";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { loading,  } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  }
  

  
  return (
    <>
       <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Dashboard Password
              </p>
            </div>
            <div className="grid gap-4">
             
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input 
                  type="text" 
                  value={currentPassword}
                  onChange={(e)=> setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input 
                  type="text" 
                  value={newPassword}
                  onChange={(e)=> setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <Input 
                  type="text" 
                  value={confirmNewPassword}
                  onChange={(e)=> setConfirmNewPassword(e.target.value)}
                />
              </div>

              {!loading ? (
                <Button  
                className="w-full"
                onClick={() => handleUpdatePassword()}
                >
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword