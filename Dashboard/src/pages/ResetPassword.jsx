import { toast } from "react-toastify";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearAllForgotPasswordErrors, resetPassword } from "../store/slices/forgotResetPasswordSlice";

const ResetPassword = () => {
  const {token} = useParams();
  
  const {loading, error, message} = useSelector((state)=>state.forgotResetPassword)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated } = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ResetPassword = ()=>{
    dispatch(resetPassword(token, password, confirmPassword))
  }
  console.log(token, password, confirmPassword);
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }

    if(message !== null){
      toast.success(message)
    }

    if(isAuthenticated){
      navigate("/");
    }

    setPassword("")
    setConfirmPassword("")
    navigate("/login")

  }, [dispatch, isAuthenticated, error, loading, message, navigate]);
  
  return (
    <>
      <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
        <div className="min-h-[100vh] flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your new password for reset password
              </p>
            </div>
            {/* <form onSubmit={(e) => {
              e.preventDefault();
              ResetPassword();
            }}> */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
              
              {loading ? (
                <Button>
                  <SpecialLoadingButton content={"Resetting..,"} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full"
                  onClick={ResetPassword}
                >
                  Reset Password
                </Button>
              )}
            </div>
            {/* </form> */}
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
