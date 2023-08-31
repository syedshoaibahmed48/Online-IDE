import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast, showToast } from "../Components/Toast";
import LogoNameLink from "../Components/LogoNameLink";
import "../App.css";

const AuthPage = () => {
  const navigate = useNavigate();

  const [formType, setFormType] = useState("signin"); // signin or signup
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeFormType = (type) => {
    setFormType(type);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const isFormValid = () => {
    if (formType === "signin") {
      if (username === "") {
        showToast("error", "Please enter a username");
        return false;
      }
      if (password === "") {
        showToast("error", "Please enter a password");
        return false;
      }
    } else {
      const nameRegex = /^[a-zA-Z0-9]{3,}$/;
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      if (username === "") {
        showToast("error", "Please enter a username");
        return false;
      }
      if (email === "") {
        showToast("error", "Please enter an email");
        return false;
      }
      if (password === "") {
        showToast("error", "Please enter a password");
        return false;
      }
      if (confirmPassword === "") {
        showToast("error", "Please confirm your password");
        return false;
      }

      if (!nameRegex.test(String(username))) {
        showToast(
          "error",
          "Username should be atleast 3 characters long and should not contain any special characters"
        );
        return false;
      }
      if (!emailRegex.test(String(email).toLowerCase())) {
        showToast("error", "Please enter a valid email");
        return false;
      }
      if (!passwordRegex.test(String(password))) {
        alert(
          "Password should be atleast 8 characters long and should contain atleast one uppercase letter, one lowercase letter and one number"
        );
        return false;
      }
      if (password !== confirmPassword) {
        showToast("error", "Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    const payload =
      formType === "signin"
        ? { username, password }
        : { username, email, password };
    try {
      const response = await axios.post(
        formType === "signin"
          ? import.meta.env.VITE_SIGNIN_API
          : import.meta.env.VITE_SIGNUP_API,
        payload
      );
      if (response.data.success === true) {
        if (localStorage.getItem("token")) localStorage.removeItem("token");
        localStorage.setItem("token", response.data.token);
        showToast(
          "success",
          "Successfully " + (formType === "signin" ? "signed-in" : "signed-up")
        );
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        showToast("error", response.data.error);
      }
    } catch (error) {
      showToast("error", "Error connecting to server");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen gradientBackground text-white">
      <nav className="flex items-center justify-between w-full px-6 py-4 mb-10">
        <LogoNameLink />
        <div className="flex items-center space-x-4">
          <button className={formType === "signin" ? "selectedButton": "unSelectedButton"} onClick={() => changeFormType("signin")}>
            Sign In
          </button>
          <button className={formType === "signup" ? "selectedButton" : "unSelectedButton"} onClick={() => changeFormType("signup")}>
            Sign Up
          </button>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center h-full px-4 mb-10">
        <div className="flex flex-col px-10 py-16 items-center justify-center w-full border-t-2 border-cyan-400 bg-[#111827] rounded-lg">
          <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight max-w-2xl">
            {formType === "signin" ? "Sign In" : "Sign Up"}
          </h1>
          <div className="flex flex-col items-center justify-center w-full mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-10 px-4 mb-4 text-lg text-white placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-cyan-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {formType === "signup" && (
              <input
                type="email"
                placeholder="Email"
                className="w-full h-10 px-4 mb-4 text-lg text-white placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-cyan-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-10 px-4 mb-4 text-lg text-white placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-cyan-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="absolute right-2 -top-2 h-full text-center text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"> 
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>  
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> 
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16"> <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/> </svg>
                  )
                }
              </button>
            </div>
            {formType === "signup" && (
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full h-10 px-4 mb-4 text-lg text-white placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-cyan-600"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="absolute right-2 -top-2 h-full text-center text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/> </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"> <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/> </svg>
                  )
                }
                </button>
              </div>
            )}
          </div>
          <button className="gradientButton" onClick={handleSubmit}>
            {formType === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default AuthPage;
