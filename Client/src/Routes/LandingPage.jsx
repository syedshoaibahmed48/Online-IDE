import React from "react";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import EnterRoomForm from "../Components/EnterRoomForm";
import { useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [openModal, setopenModal] = useState(false);

  const navigateToAuthPage = (action) => {
    navigate("/auth", { state: { action } });
    console.log(action);
  };
  const signout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="flex flex-col bg-[#120013ff]">
      <div className="flex flex-row w-full h-full ">
        <header className="flex flex-col w-52 bg-gray-800 text-center ">
          <div className="body-font sticky top-0">
            <a
              href="/"
              className="flex title-font font-normal items-center text-gray-900 mb-4 md:mb-0"
            >
              <img
                src={new URL(`../assets/logo.png`, import.meta.url)}
                className="w-44 mt-4 ml-4"
                alt="unavailable"
              />
            </a>
            <button
              onClick={() => setopenModal(true)}
              className="text-white text-lg border-2 bg-[#120013ff] border-cyan-400 hover:text-emerald-400 mt-10 ml-2 h-14 w-40 rounded"
            >
              Start Coding
            </button>
            <div className="mt-5">
              <button
                className=" h-12 w-52  hover:bg-[#120013ff] flex flex-wrap items-center text-lg text-white justify-left"
                onClick={() => {
                  navigate("/aboutus");
                }}
              >
                <p className="ml-8">About Us</p>
              </button>
              <button
                className="mt h-12 w-52 hover:bg-[#120013ff] flex flex-wrap items-center text-lg font-normal text-white justify-left"
                onClick={() => {
                  navigate("/contactus");
                }}
              >
                <p className="ml-8">Contact Us</p>
              </button>
              <button
                onClick={() => {
                  navigate("/codelab");
                }}
                className="mt-8 h-12 w-52 hover:bg-[#120013ff] hover:border-t-cyan-400 hover:border-b-cyan-400 hover:border-t-2 hover:border-b-2 flex flex-wrap items-center text-lg  font-medium text-emerald-400 justify-left"
              >
                <p className="ml-8">CodeLab</p>
              </button>
            </div>
            <div className="ml-8 mt-44">
              {token ? (
                <div>
                  <button
                    className="mt-6 h-10 w-36 bg-[#120013ff] hover:border-bg-[#e0195bff] hover:bg-green-600 flex flex-wrap items-center text-lg font-normal border-2 border-[#e0195bff] text-white justify-center"
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    <p className="">Dashboard</p>
                  </button>
                  <button
                    className="mt-6 h-10 w-36 bg-[#e0195bff] hover:bg-green-600 flex flex-wrap items-center text-lg font-normal text-white justify-center"
                    onClick={signout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    className=" h-10 w-36 bg-[#e0195bff] hover:bg-green-600 flex flex-wrap items-center text-lg text-white justify-center"
                    onClick={() => {
                      navigateToAuthPage("signup");
                    }}
                  >
                    SignUp
                  </button>
                  <button
                    className="mt-6 h-10 w-36 bg-[#120013ff] hover:bg-gray-900 flex flex-wrap items-center text-lg font-normal border-2 border-[#e0195bff] text-white justify-center"
                    onClick={() => {
                      navigateToAuthPage("signin");
                    }}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
        <header className="text-gray-600 body-font ">
          <div className="absolute top-0 right-0 container w-64 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            {token ? (
              <button
                className="mt-6 h-10 w-36 bg-[#e0195bff] hover:bg-green-600 flex flex-wrap items-center text-lg font-normal text-white justify-center"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <p className="">Dashboard</p>
              </button>
            ) : (
              <>
                <button
                  className=" md:ml-auto inline-flex items-center bg-[#e0195bff] border-0 py-2 px-4 focus:outline-none hover:bg-green-600 text-white rounded text-base text-center mt-4 md:mt-0"
                  onClick={() => {
                    navigateToAuthPage("signup");
                  }}
                >
                  SignUp
                </button>
                <button
                  className="  inline-flex items-center bg-gray-700 border-0 py-2 px-5 ml-3 focus:outline-none hover:bg-gray-800 text-white rounded text-base text-center mt-4 md:mt-0"
                  onClick={() => {
                    navigateToAuthPage("signin");
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </header>
        <div className="flex flex-col">
          <section className="text-white body-font">
            <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <div className="mb-6 w-full font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  <Typewriter 
                    options={{
                      strings: ["Welcome to CodeWare"],
                      autoStart: true,
                      loop: true,
                      pauseFor: 4000,
                    }}
                  />
                </div>
                <p className="ml-5 mb-8 pr-28 text-xl leading-relaxed">
                  CodeWare is an Online Real-Time Collaborative IDE which helps
                  programmers code and execute scripts on the browser and allows
                  a team of programmers to edit the same code file
                  simultaneously
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setopenModal(true)}
                    className=" ml-14 inline-flex text-black bg-emerald-500 border-0 py-2 px-20 focus:outline-none hover:bg-emerald-700 rounded text-lg"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src={new URL(`../assets/landingpagegif.gif`, import.meta.url)}
                />
              </div>
            </div>
          </section>

          <section className="mb-24 text-white body-font overflow-hidden">
            <div>
              <div className="flex flex-wrap m-">
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                  <div className="h-full p-6 border-2 border-pink-700 flex flex-col relative overflow-hidden">
                    <h2 className="text-2xl font-semibold tracking-widest title-font mb-1">
                      No need to download the SDK of any compiler
                    </h2>

                    <p className="text-l text-white/60 mt-3">
                      When we want to execute any program we required a software
                      development kit of that particular program for example if
                      user want to compile JAVA program then they require JDK.
                    </p>
                  </div>
                </div>
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                  <div className="h-full p-6 border-2 border-pink-700 flex flex-col relative overflow-hidden">
                    <h2 className="text-2xl font-semibold tracking-widest title-font mb-1">
                      No issues of setting path variables
                    </h2>

                    <p className="text-l text-white/60 mt-3">
                      Sometimes there is requirement of setting path variable
                      i.e. where the program is saved.
                    </p>
                  </div>
                </div>
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                  <div className="h-full p-6  border-2 border-pink-700 flex flex-col relative overflow-hidden">
                    <h2 className="text-2xl font-semibold tracking-widest title-font mb-1">
                      Simple to use GUI for better coding
                    </h2>

                    <p className="text-l text-white/60 mt-3">
                      It provide better graphic user interface for coding i.e.
                      code editor.
                    </p>
                  </div>
                </div>
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                  <div className="h-full p-6 border-2 border-pink-700 flex flex-col relative overflow-hidden">
                    <h2 className="text-2xl font-semibold tracking-widest title-font mb-1">
                      No need of storage space on your system
                    </h2>

                    <p className="text-l text-white/60 mt-3">
                      Everything is stored on the server's database so there is no
                      need of storage space of user system.
                    </p>
                  </div>
                </div>
              </div>
              <h2 class="title-font text-2xl font-medium text-white text-center mt-6 mb-3">
                Features of CodeWare
              </h2>
            </div>
          </section>
          <section className="bg-gray-900 text-white body-font grid justify-items-center">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="w-3/5 h-5/6 mb-10 md:mb-0">
                <img
                  className="object-cover object-center rounded  "
                  alt="hero"
                  src={new URL(`../assets/codelab.png`, import.meta.url)}
                />
              </div>

              <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-6 font-medium text-white">
                  An Online IDE
                  <br className="hidden lg:inline-block" />
                  made for coding.
                </h1>
                <p className="mb-8 text-xl text-white/60 leading-relaxed">
                  Use CodeLab to learn, build, run, test your program with a
                  support of multiple languages.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      navigate("/codelab");
                    }}
                    className="ml-28 inline-flex text-black bg-emerald-500 border-0 h-12 w-52 focus:outline-none hover:bg-emerald-700 items-center justify-center rounded text-lg"
                  >
                    CodeLab
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className=" text-white body-font bg-[#120013ff]">
            <div className="container px-5 py-24 mx-auto">
              <p className="text-3xl  font-bold mb-8">
                Languages supported by CodeWare
              </p>
              <div className="flex flex-wrap ">
                <button className="m-4" onClick={()=>{ navigate("/codelab", {state:{initialLanguage: 'c'}}) }}>
                  <div className="flex flex-row bg-gray-900 p-6 h-36 w-80 hover:border-2 hover:border-cyan-400 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24  "
                      alt="hero"
                      src={new URL(`../assets/c.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-white ml-8">
                      C programming
                    </p>
                  </div>
                </button>

                <button className="m-4" onClick={()=>{ navigate("/codelab", {state:{initialLanguage: 'cpp'}}) }}>
                  <div className="flex flex-row bg-gray-900 p-6 h-36 w-80 hover:border-2 hover:border-cyan-400 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24  "
                      alt="hero"
                      src={new URL(`../assets/cpp.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-white ml-8">
                      C++ programming
                    </p>
                  </div>
                </button>
                <button className="m-4" onClick={()=>{ navigate("/codelab", {state:{initialLanguage: 'py'}}) }}>
                  <div className="flex flex-row bg-gray-900 p-6 h-36 w-80 hover:border-2 hover:border-cyan-400 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24  "
                      alt="hero"
                      src={new URL(`../assets/py.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-white ml-8">Python</p>
                  </div>
                </button>
                <button className="m-4" onClick={()=>{ navigate("/codelab", {state:{initialLanguage: 'java'}}) }}>
                  <div className="flex flex-row bg-gray-900 p-6 h-36 w-80 hover:border-2 hover:border-cyan-400 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24 "
                      alt="hero"
                      src={new URL(`../assets/java.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-white ml-8">Java</p>
                  </div>
                </button>
                <button className="m-4" onClick={()=>{ navigate("/codelab", {state:{initialLanguage: 'js'}}) }}>
                  <div className="flex flex-row bg-gray-900 p-6 h-36 w-80 hover:border-2 hover:border-cyan-400 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24 "
                      alt="hero"
                      src={new URL(`../assets/js.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-white ml-8">
                      Java Script
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </section>
          {openModal && (
            <div
              onClick={() => setopenModal(false)}
              className="fixed inset-0 flex justify-center items-center bg-black/40 bg-opacity-30  "
            >
              <div onClick={(e) => e.stopPropagation()}>
                <EnterRoomForm closemodal={setopenModal} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;