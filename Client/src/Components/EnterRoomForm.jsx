import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Dropdown from "./Dropdown";
import { Toast, showToast } from "./Toast";
import '../App.css'

const EnterRoomForm = ({ closemodal }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [formType, setFormType] = useState("join"); // create or join
  const [language, setLanguage] = useState("c"); // c, cpp, java, py, js
  const [roomID, setRoomID] = useState("");
  const [uuid, setUUID] = useState("");

  const navigateToRoom = () => {
    if (!roomID || !name) {
      showToast("error", "Please enter the room ID and name");
      return;
    }
    navigate(`/coderoom/${roomID}`, {
      state: { language, userName: name, action: formType },
    });
  };

  const changeFormType = (type) => {
    if (type === "create") setRoomID(uuid);
    else setRoomID("");
    setFormType(type);
  };

  useEffect(() => {
    setUUID(uuidV4());
  }, []);


  return (
    <div className="relative flex flex-col items-center justify-center  px-14  py-16 mt-4 bg-[#111827] border-t-2 border-cyan-500 rounded-lg">
      <Toast />
      <button className="absolute top-0 right-0 m-3 hover:m-2.5 " onClick={() => closemodal(false)}>
        <img
          src={new URL(`../assets/cross.png`, import.meta.url)}
          className="w-5 hover:w-6"
          alt="unavailable"
        />
      </button>
      <div className="inline-flex w-full mt-6 mb-8">
        <button className= {formType === "create" ? "selectedButton" : "unSelectedButton"}
          onClick={() => {changeFormType("create");}}>
          Create a Room
        </button>
        <button className= {formType === "join" ? "selectedButton" : "unSelectedButton"}
          onClick={() => {changeFormType("join");}}>
          Join a Room
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full text-black">
        <input
          type="text"
          placeholder="Enter Room ID"
          className="w-full h-12 px-4 m-4 text-lg text-white placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-cyan-600"
          value={roomID}
          onChange={(e) => {
            setRoomID(e.target.value);
          }}
          readOnly={formType === "create"}
        />
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-12 px-4 m-4 text-lg text-white placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-cyan-600"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div className={"flex flex-row items-center w-full mt-8 " +
            (formType === "create" ? " justify-around" : " justify-center")
          }
        >
          <button className="gradientButton px-2" onClick={navigateToRoom}>
            {formType === "create" ? "Create Room" : "Join Room"}
          </button>
          {formType === "create" && (
            <Dropdown language={language} setLanguage={setLanguage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnterRoomForm;
