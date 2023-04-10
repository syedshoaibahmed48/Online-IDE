import React from "react";
import { useNavigate } from "react-router-dom";
import EnterRoomForm from "../Components/EnterRoomForm";

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-gray-700">
            <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-3">
                <div className="flex flex-shrink-0  mr-6">
                  <h1 className="text-4xl font-bold text-white">Online IDE</h1>
                </div>
            </nav>

            <div className="flex flex-row w-full">
                <div className="flex flex-col items-center justify-center w-1/2">
                    <h1 className="text-4xl font-bold text-white">CodeLab</h1>
                    <p className="text-2xl font-bold text-white">Write and test your code</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => { navigate("/codelab") }}>
                        CodeLab
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center w-1/2 mt-24">
                    <h1 className="text-4xl font-bold text-white">Collaborate</h1>
                    <p className="text-2xl font-bold text-white">Collaborate with your friends</p>
                    <EnterRoomForm />
                </div>
            </div>
            
        </div>
    );
};

export default LandingPage;