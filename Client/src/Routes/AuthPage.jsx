import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast, showToast } from "../Components/Toast";

const AuthPage = () => {

    const navigate = useNavigate();

    const [formType, setFormType] = useState("signin"); // signin or signup
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const changeFormType = () => {
        formType === "signin" ? setFormType("signup") : setFormType("signin");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    const isFormValid = () => {
        if (formType === "signin") {
            if( username === "" ) {
                showToast("error", "Please enter a username");
                return false;
            }
            if( password === "" ) {
                showToast("error", "Please enter a password");
                return false;
            }
        } else {
            const nameRegex = /^[a-zA-Z0-9]{3,}$/;
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

            if( username === "" ) {
                showToast("error", "Please enter a username");
                return false;
            }
            if( email === "" ) {
                showToast("error", "Please enter an email");
                return false;
            }
            if( password === "" ) {
                showToast("error", "Please enter a password");
                return false;
            }
            if( confirmPassword === "" ) {
                showToast("error", "Please confirm your password");
                return false;
            }

            if( !nameRegex.test(String(username)) ) {
                showToast("error", "Username should be atleast 3 characters long and should not contain any special characters");
                return false;
            }
            if( !emailRegex.test(String(email).toLowerCase()) ) {
                showToast("error", "Please enter a valid email");
                return false;
            }
            if( !passwordRegex.test(String(password)) ) {
                alert("Password should be atleast 8 characters long and should contain atleast one uppercase letter, one lowercase letter and one number");
                return false;
            }
            if( password !== confirmPassword ) {
                showToast("error", "Passwords do not match");
                return false;
            }
        }
        return true;
    }

    const handleSubmit = async () => {
        if(!isFormValid()) return;

        const payload = formType === "signin" ? { username, password } : { username, email, password };
        try {
            const response = await axios.post( 
                formType === "signin" ? import.meta.env.VITE_SIGNIN_API : import.meta.env.VITE_SIGNUP_API, 
                payload);
            if(response.data.success === true) {
                localStorage.setItem("token", response.data.token);
                showToast("success", "Successfully " + (formType === "signin" ? "signed-in" : "signed-up") );// remove if not required
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            } else {
                showToast("error", response.data.error);
            }
        } catch (error) {
            showToast("error","Error connecting to server");
        }
    }

    
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
        <Toast />
        <div className="flex flex-col items-center justify-center border-t-2 border-cyan-400 w-80 px-8 py-16 bg-gray-900 rounded-md">
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl font-black text-white">{
                formType === "signin" ? "Signin" : "Signup"
            }</h1>
            <div className="flex flex-col items-center justify-center w-full my-6">
                <input type="text" className="bg-gray-800 text-white rounded-md w-full p-2 mb-4" 
                value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Username"/>
                
                {formType === "signup" && 
                <input type="email" className="bg-gray-800 text-white rounded-md w-full p-2 mb-4" 
                value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" />}
                
                <input type={showPassword ? "text" : "password"}
                className="bg-gray-800 text-white rounded-md w-full p-2 mb-4" 
                value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/>

                { formType === "signup" && 
                <input type="password" className="bg-gray-800 text-white rounded-md w-full p-2 mb-4" 
                value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Confirm Password" />}

                <div className="flex flex-row items-center justify-start w-full">
                    <p className="text-white text-sm mr-2">Show Password</p>
                    <input type="checkbox" className="cursor-pointer"
                    checked={showPassword} onChange={() => {setShowPassword(!showPassword)}} />
                </div>
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-black rounded-md w-full px-4 py-2 m-2"
              onClick={ handleSubmit } >
                {formType === "signin" ? "Signin" : "Signup"}
            </button>
        </div>

        <div className="mt-2">
            <p className="text-white text-sm">
                {formType === "signin" ? "Don't have an account?" : "Already have an account?"}
                <span className="text-cyan-500 cursor-pointer ml-1" onClick={changeFormType}>
                    {formType === "signin" ? "Signup" : "Signin"}
                </span>
            </p>
        </div>
        </div>
    </div>
    ); 
}

export default AuthPage;