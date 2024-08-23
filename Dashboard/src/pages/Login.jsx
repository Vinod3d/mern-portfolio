import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAllErrors, login, resetProfile } from "../store/slices/userSlice"
import { toast } from "react-toastify"
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton"
import loginImg from '../images/login.jpg'


const Login = ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading, isAuthenticated, error, message} = useSelector(
    (state)=> state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [attemptedLogin, setAttemptedLogin] = useState(false);

  const handleLogin = ()=>{
    dispatch(login(email, password));
    setAttemptedLogin(true);

  }

  useEffect(()=>{
    if(error && attemptedLogin){
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetProfile());
    }
    if(isAuthenticated){
      navigate("/");
    }
  }, [dispatch, isAuthenticated, error, loading, message, navigate, attemptedLogin]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
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
                <Label htmlFor="password">Password</Label>
                <Link
                  to={"/password/forgot"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
            {
              loading ? 
              <Button>
                <SpecialLoadingButton content={"logging in"}/>
              </Button> : 
              <Button 
              type="submit"  
              className="w-full"
              onClick={handleLogin}
            >
              Login
            </Button>
            }
           
           
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center p-6">
        <img
          src={loginImg}
          alt="Image"
          className=" w-4/5 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}


export default Login;