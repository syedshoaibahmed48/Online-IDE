import React from "react";
import LogoNameLink from "../Components/LogoNameLink";
import "../App.css"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gradientBackground">
      <LogoNameLink />
      <h1 className="text-9xl font-bold text-white mt-10">404</h1>
      <h1 className="text-4xl font-bold text-white">Page Not Found</h1>
      <button className="gradientButton mt-10" onClick={()=>{window.location.href = "/"}}>Go to Home Page</button>
    </div>
  );
};

export default NotFoundPage;
