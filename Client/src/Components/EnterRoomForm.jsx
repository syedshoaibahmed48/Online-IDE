import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidV4} from "uuid";
import Dropdown from "./Dropdown";
import { Toast, showToast } from "./Toast";


const EnterRoomForm = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [formType, setFormType] = useState("join"); // create or join
    const [language, setLanguage] = useState("c"); // c, cpp, java, py, js
    const [roomID, setRoomID] = useState("");
    const [uuid, setUUID] = useState("");

    const navigateToRoom = () => {
        if(!roomID || !name) {
            showToast("Please enter the room ID and name", "error");
            return;
        }
        navigate(`/coderoom/${roomID}`, {state: {language, userName: name, action: formType}});
    }

    const changeFormType = (type) => {
        if(type === "create") setRoomID(uuid);
        else setRoomID("");
        setFormType(type);
    }

    useEffect(() => {
        setUUID(uuidV4());
    }, []);

    return (
        <div className="flex flex-col items-center justify-center px-8 py-10 mt-4 bg-gray-800 rounded-lg border-t-2 border-cyan-400">
            <Toast />
            <div className="inline-flex mb-8">
                <button className={"font-bold py-2 px-4" + 
                (formType === "create" ? " text-cyan-400 bg-gray-500": " text-gray-400 bg-gray-900" ) }
                onClick={()=>{ changeFormType('create')}}>
                    Create a Room
                </button>
                <button className={"font-bold py-2 px-4" +
                (formType === "join" ? " text-cyan-400 bg-gray-500" : " text-gray-400 bg-gray-900" ) }
                onClick={()=> { changeFormType('join') }}>
                    Join a Room
                </button>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
            <input type="text" placeholder="Enter Room ID" className="font-semibold w-full border-2 border-black rounded-md p-2 m-4"
                value={roomID} onChange={(e) => {setRoomID(e.target.value)}} readOnly = {formType === "create"}/>
                <input type="text" placeholder="Enter Name" className="font-semibold w-full border-2 border-black rounded-md p-2 m-4"
                value={name} onChange={(e) => {setName(e.target.value)}}
                />
                <div className={"flex flex-row items-center w-full mt-8" + (formType === "create" ? " justify-between": " justify-center")}>
                    <button className="font-semibold rounded-md p-2 bg-gray-600 hover:bg-gray-500 text-white " 
                    onClick={navigateToRoom}>
                        {formType === "create" ? "Create Room" : "Join Room"}
                    </button>
                    { formType === "create" && <Dropdown language={language} setLanguage={setLanguage}/> }
                </div>
            </div>

        </div>
        
    )
    
};

export default EnterRoomForm;