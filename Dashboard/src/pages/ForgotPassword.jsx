import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllForgotPasswordErrors, forgotPassword } from "../store/slices/forgotResetPasswordSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import resetImg from '../images/forgot-password.jpg'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const {loading, error, message} = useSelector((state)=> state.forgotResetPassword);
  const {isAuthenticated} = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = () =>{
    dispatch(forgotPassword(email));
  }

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }

    if(isAuthenticated){
      navigate("/");
    }

    if(message !== null){
      toast.success(message)
    }
  }, [dispatch, isAuthenticated, error, loading, message, navigate]);
  
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
    <div className="min-h-[100vh] flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email to request for reset password
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Link
                to={"/login"}
                className="ml-auto inline-block text-sm underline"
              >
                Remember your password?
              </Link>
            </div>
          </div>
          {
            loading ? 
            <Button>
              <SpecialLoadingButton content={"Requesting..,"}/>
            </Button> : 
            <Button 
            type="submit"  
            className="w-full"
            onClick={handleResetPassword}
          >
            Forget Password
          </Button>
          }
         
         
        </div>
      </div>
    </div>
    <div className="hidden lg:flex items-center p-6">
      <img
        src={resetImg}
        alt="Image"
        className="w-4/5 object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
  )
}

export default ForgotPassword