import React from "react";
import { useNavigate } from "react-router-dom";
import EnterRoomForm from "../Components/EnterRoomForm";
import { useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [openModal, setopenModal] = useState(false);

  const navigateToAuthPage = (action) => {
    navigate("/auth", {state: {action}});
    console.log(action)
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
                src={ new URL (`../assets/logo.png`, import.meta.url)}
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
              <button className=" h-12 w-52  hover:bg-[#120013ff] flex flex-wrap items-center text-lg text-white justify-left"
               onClick={()=>{navigate("/aboutus")}} >
                <p className="ml-8">About Us</p>
              </button>
              <button className="mt h-12 w-52 hover:bg-[#120013ff] flex flex-wrap items-center text-lg font-normal text-white justify-left"
              onClick={()=>{navigate("/contactus")}} >
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
              {
                token ? (
                  <button className="mt-6 h-10 w-36 bg-[#120013ff] hover:bg-gray-900 flex flex-wrap items-center text-lg font-normal border-2 border-[#e0195bff] text-white justify-center"
                  onClick={()=>{navigate("/dashboard")}} >
                    <p className="">Dashboard</p>
                  </button>
                ) : (
                  <>
                  <button className=" h-10 w-36 bg-[#e0195bff] hover:bg-green-600 flex flex-wrap items-center text-lg text-white justify-center" onClick={ ()=>{ navigateToAuthPage("signup") } }>
                    SignUp
                  </button>
                  <button className="mt-6 h-10 w-36 bg-[#120013ff] hover:bg-gray-900 flex flex-wrap items-center text-lg font-normal border-2 border-[#e0195bff] text-white justify-center" onClick={ ()=>{ navigateToAuthPage("signin") } }>
                    Login
                  </button>
                  </>
                )
              }
            </div>
          </div>
        </header>
        <header className="text-gray-600 body-font ">
          <div className="absolute top-0 right-0 container w-64 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            {
              token ? (
                <button className="mt-6 h-10 w-36 bg-[#120013ff] hover:bg-gray-900 flex flex-wrap items-center text-lg font-normal border-2 border-[#e0195bff] text-white justify-center"
                onClick={()=>{navigate("/dashboard")}} >
                  <p className="">Dashboard</p>
                </button>
              ) : (
                <>
                <button className=" md:ml-auto inline-flex items-center bg-[#e0195bff] border-0 py-2 px-4 focus:outline-none hover:bg-green-600 text-white rounded text-base text-center mt-4 md:mt-0" onClick={ ()=>{ navigateToAuthPage("signup") } }>
                  SignUp
                </button>
                <button className="  inline-flex items-center bg-gray-700 border-0 py-2 px-5 ml-3 focus:outline-none hover:bg-gray-800 text-white rounded text-base text-center mt-4 md:mt-0" onClick={ ()=>{ navigateToAuthPage("signin") } }>
                  Login
                </button>
              </>
              )
            }
          </div>
        </header>
        <div className="flex flex-col">
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="ml-20 title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Before they sold out
                  <br className="hidden lg:inline-block" />
                  readymade gluten
                </h1>
                <p className="ml-14 mb-8 leading-relaxed">
                  Copper mug try-hard pitchfork pour-over freegan heirloom
                  neutra air plant cold-pressed tacos poke beard tote bag.
                  Heirloom echo park mlkshk tote bag selvage hot chicken
                  authentic tumeric truffaut hexagon try-hard chambray.
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
                  src={ new URL (`../assets/landingpagegif.gif`, import.meta.url)}
                />
              </div>
            </div>
          </section>
          {openModal && (
            <div
              onClick={() => setopenModal(false)}
              className="fixed inset-0 flex justify-center items-center bg-black/40 "
            >
              <div onClick={(e) => e.stopPropagation()}>
                <EnterRoomForm closemodal={setopenModal} />
              </div>
            </div>
          )}
          <section className="mb-24 text-gray-600 body-font overflow-hidden">
            <div>
              <div className="flex flex-wrap m-">
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                  <div className="h-full p-6 border-2 border-pink-700 flex flex-col relative overflow-hidden">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                      START
                    </h2>
                    <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                      Free
                    </h1>
                    <p className="flex items-center text-gray-600 mb-2">
                      Vexillologist pitchfork
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      Tumeric plaid portland
                    </p>
                    <p className="flex items-center text-gray-600 mb-6">
                      Mixtape chillwave tumeric
                    </p>

                    <p className="text-xs text-gray-500 mt-3">
                      Literally you probably haven't heard of them jean shorts.
                    </p>
                  </div>
                </div>
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                  <div className="h-full p-6 border-2 border-pink-700 flex flex-col relative overflow-hidden">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                      PRO
                    </h2>

                    <p className="flex items-center text-gray-600 mb-2">
                      Vexillologist pitchfork
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      Tumeric plaid portland
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      Hexagon neutra unicorn
                    </p>
                    <p className="flex items-center text-gray-600 mb-6">
                      Mixtape chillwave tumeric
                    </p>

                    <p className="text-xs text-gray-500 mt-3">
                      Literally you probably haven't heard of them jean shorts.
                    </p>
                  </div>
                </div>
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                  <div className="h-full p-6  border-2 border-pink-700 flex flex-col relative overflow-hidden">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                      BUSINESS
                    </h2>

                    <p className="flex items-center text-gray-600 mb-2">
                      Vexillologist pitchfork
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      Tumeric plaid portland
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      Hexagon neutra unicorn
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      Vexillologist pitchfork
                    </p>
                    <p className="flex items-center text-gray-600 mb-6">
                      Mixtape chillwave tumeric
                    </p>

                    <p className="text-xs text-gray-500 mt-3">
                      Literally you probably haven't heard of them jean shorts.
                    </p>
                  </div>
                </div>
                <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                  <div className="h-full p-6 border-2 border-pink-700 flex flex-col relative overflow-hidden">
                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                      SPECIAL
                    </h2>

                    <p className="flex items-center text-gray-600 mb-2">
                      Tumeric plaid portland
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      Hexagon neutra unicorn
                    </p>
                    <p className="flex items-center text-gray-600 mb-2">
                      Vexillologist pitchfork
                    </p>
                    <p className="flex items-center text-gray-600 mb-6">
                      Mixtape chillwave tumeric
                    </p>

                    <p className="text-xs text-gray-500 mt-3">
                      Literally you probably haven't heard of them jean shorts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-gray-900 text-gray-600 body-font grid justify-items-center">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="w-3/5 h-5/6 mb-10 md:mb-0">
                <img
                  className="object-cover object-center rounded  "
                  alt="hero"
                  src={ new URL (`../assets/codelab.png`, import.meta.url)}
                />
              </div>

              <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl  font-medium text-white">
                  Before they sold out
                  <br className="hidden lg:inline-block" />
                  readymade gluten
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
                    className="ml-28 inline-flex text-black bg-emerald-500 border-0 h-12 w-52 focus:outline-none hover:bg-green-600 items-center justify-center rounded text-lg"
                  >
                    CodeLab
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className=" text-gray-600 body-font bg-[#120013ff]">
            <div className="container px-5 py-24 mx-auto">
              <p className="text-3xl font-bold mb-8">
                Languages supported by CodeWare
              </p>
              <div className="flex flex-wrap ">
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="flex flex-row bg-gray-900 p-6 h-36 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24  "
                      alt="hero"
                      src={ new URL (`../assets/c.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-gray-600 ml-8">
                      C programming
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="flex flex-row bg-gray-900 p-6 h-36 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24  "
                      alt="hero"
                      src={ new URL (`../assets/cpp.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-gray-600 ml-8">
                      C++ programming
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="flex flex-row bg-gray-900 p-6 h-36 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24  "
                      alt="hero"
                      src={ new URL (`../assets/py.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-gray-600 ml-8">
                      Python
                    </p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="flex flex-row bg-gray-900 p-6 h-36 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24 "
                      alt="hero"
                      src={ new URL (`../assets/java.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-gray-600 ml-8">Java</p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="flex flex-row bg-gray-900 p-6 h-36 rounded-lg">
                    <img
                      className="object-cover object-center rounded w-24 h-24 "
                      alt="hero"
                      src={ new URL (`../assets/js.png`, import.meta.url)}
                    />
                    <p className="flex items-center text-gray-600 ml-8">
                      Java Script
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
