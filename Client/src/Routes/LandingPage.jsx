import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnterRoomForm from "../Components/EnterRoomForm";
import LogoNameLink from "../Components/LogoNameLink";
import '../App.css'


const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="rounded-lg bg-[#111827] border border-cyan-500 p-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500 text-white mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

const LanguageCard = ({ title, icon }) => {
  return (
    <div className="flex flex-row p-4 items-center justify-around rounded-lg bg-[#111827] border border-cyan-400 cursor-pointer">
      <div className="flex items-center justify-center rounded-full text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
};


const LandingPage = () => {
  const features = [
    {
      title: "Realtime Collaboration",
      description: "Collaborate in real-time, allowing multiple users to work on the same code simultaneously.",
      icon: <img src={new URL("../assets/collaboration.png", import.meta.url)} alt="collaboration" className="w-10 h-10"/>
    },
    {
      title: "Syntax Highlighting",
      description: "Enjoy syntax highlighting to make your code more readable and visually appealing.",
      icon: <img src={new URL("../assets/syntaxHighlighting.png", import.meta.url)} alt="syntax" className="w-10 h-10"/>
    },
    {
      title: "Code Execution",
      description: "Execute your code, supporting multiple programming languages and providing instant feedback on the output.",
      icon: <img src={new URL("../assets/codeExecution.png", import.meta.url)} alt="run" className="w-10 h-10"/>
    },
    {
      title: "Create & Manage Projects",
      description: "Sign in to manage your projects with ease, creating, updating, and deleting projects as needed.",
      icon: <img src={new URL("../assets/manageProjects.png", import.meta.url)} alt="manage" className="w-10 h-10"/>
    },
    {
      title: "Ready To Use",
      description: "No need to install anything. Just open the website and start coding.",
      icon: <img src={new URL("../assets/readyToUse.png", import.meta.url)} alt="ready" className="w-10 h-10"/>
    },
    {
      title: "Multiple Languages Support",
      description: "Code in your favorite language. The IDE support C, C++, Java, Python, and JavaScript.",
      icon: <img src={new URL("../assets/multipleLanguages.png", import.meta.url)} alt="languages" className="w-10 h-10"/>
    },
  ];

  const supportedLanguages = [
    {
      title: "C Lang",
      icon: <img src={new URL("../assets/c.png", import.meta.url)} alt="c" className="w-16 h-16"/>
    },
    {
      title: "C++",
      icon: <img src={new URL("../assets/cpp.png", import.meta.url)} alt="cpp" className="w-16 h-16"/>
    },
    {
      title: "Java",
      icon: <img src={new URL("../assets/java.png", import.meta.url)} alt="java" className="w-16 h-16"/>
    },
    {
      title: "Python",
      icon: <img src={new URL("../assets/py.png", import.meta.url)} alt="python" className="w-16 h-16"/>
    },
    {
      title: "JavaScript",
      icon: <img src={new URL("../assets/js.png", import.meta.url)} alt="javascript" className="w-16 h-16"/>
    },
  ];

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [openModal, setopenModal] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen gradientBackground text-white">
      <nav className="flex items-center justify-between w-full px-6 py-4 mb-24">
        <LogoNameLink />
        <div className="flex items-center space-x-4">
          <button className="outlineButton" onClick={()=>{token ? navigate("/dashboard") : navigate("/auth")}}>
            { token ? "Dashboard" : "Sign In / Sign Up"}
          </button>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center h-full px-4 mb-10">
        <div className="text-center mb-10">
          <h1 className="mb-4 text-6xl font-extrabold leading-none tracking-tight max-w-2xl">
            <span className="gradientText"> Collaborate </span>
            Seamlessly using CodeFusion
          </h1>
          <p className="mt-8 text-xl font-semibold text-gray-400">
            The Online IDE to
            <span className="gradientText"> Write, Run, and Collaborate </span>
            Effortlessly.
          </p>
        </div>
        <div className="flex flex-row w-2/3 justify-around">
          <button className="gradientButton" onClick={() => setopenModal(true)}>
              Get Started
          </button>
          {
            !token &&
            <button className="inline-flex px-6 py-4 font-semibold whitespace-nowrap text-gray-500 hover:text-white" onClick={()=>{navigate("/auth")}}>
              Sign-in to save your code
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
          }
        </div>
      </div>
      <div className="mt-12 mb-8">
          <h2 className="mb-4 text-3xl font-extrabold text-center">Features</h2>
          <p className="text-xl font-semibold text-gray-400 text-center">
            CodeFusion provides a wide range of features to make your coding experience seamless.
          </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-11/12">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
      <div className="mt-12 mb-8">
          <h2 className="mb-4 text-3xl font-extrabold text-center">Supported Languages</h2>
          <p className="text-xl font-semibold text-gray-400 text-center">
            CodeFusion currently supports 5 programming languages.
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12 w-11/12">
        {supportedLanguages.map((language, index) => (
          <LanguageCard key={index} {...language} />
        ))}
      </div>
      {openModal && (
            <div className="fixed inset-0 -top-40 flex justify-center items-center bg-black/80 bg-opacity-30" onClick={() => setopenModal(false)}>
              <div onClick={(e) => e.stopPropagation()}>
                <EnterRoomForm closemodal={setopenModal} />
              </div>
            </div>
          )}
      <footer className="mt-12 mb-2 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} CodeFusion. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;