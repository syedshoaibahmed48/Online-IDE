import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Toast, showToast } from "../Components/Toast";

const AuthPage = () => {

    const navigate = useNavigate();

    const [formType, setFormType] = useState("login"); // login or signup
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const changeFormType = () => {
        formType === "login" ? setFormType("signup") : setFormType("login");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    const isEmailValid = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const isPasswordValid = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(String(password));
    }

    const handleLogin = () => {
        if(!name || !password) {
            showToast("Please enter the name and password", "error");
            return;
        }
        
        navigate("/projects");
    }

    const handleSignup = () => {
        if(!name || !email || !password || !confirmPassword) {
            showToast("Please enter all the fields", "error");
            return;
        }

        if(password !== confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }

        if(!isEmailValid(email)) {
            showToast("Please enter a valid email", "error");
            return;
        }

        if(!isPasswordValid(password)) {
            alert("Password must be 8 characters long and must contain at least one uppercase letter, one lowercase letter and one number", "error");
            return;
        }

        navigate("/projects");
    }
    
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
        <Toast />
        <div className="flex flex-col items-center justify-center border-t-2 border-cyan-400 w-80 px-8 py-16 bg-gray-900 rounded-md">
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl font-black text-white">{
                formType === "login" ? "Login" : "Signup"
            }</h1>
            <div className="flex flex-col items-center justify-center w-full my-6">
                <input type="text" className="bg-gray-800 text-white rounded-md w-full p-2 mb-4" 
                value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Username"/>
                {formType === "signup" && 
                <input type="email" className="bg-gray-800 text-white rounded-md w-full p-2 mb-4" 
                value={email} onChange={(e) => {setEmail(e.target.value)}}placeholder="Email" />}
                <input type="password" className="bg-gray-800 text-white rounded-md w-full p-2 mb-4" 
                value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" />
                { formType === "signup" && 
                <input type="password" className="bg-gray-800 text-white rounded-md w-full p-2" 
                value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Confirm Password" />}
            </div>
            <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-black rounded-md w-full px-4 py-2 m-2"
              onClick={()=>{ formType === "login" ? handleLogin() : handleSignup() }} >
                {formType === "login" ? "Login" : "Signup"}
            </button>
        </div>

        <div className="m-4">
            <p className="text-white text-sm">
                {formType === "login" ? "Don't have an account?" : "Already have an account?"}
                <span className="text-cyan-500 cursor-pointer ml-1" onClick={changeFormType}>
                    {formType === "login" ? "Signup" : "Login"}
                </span>
            </p>
        </div>
        </div>
    </div>
    );
        
}

export default AuthPage;