import React from "react";

const AboutUsPage = () => {
    return (
        <div className="flex flex-col items-center justify-center px-8 py-10 mt-4 bg-gray-800 rounded-lg border-t-2 border-cyan-400">
            <h1 className="text-3xl font-bold text-white">About Us</h1>
            <div className="flex flex-col items-center justify-center w-full">
                <p className="text-white text-xl font-semibold mt-4">This is a collaborative code editor where you can code with your friends in real time.</p>
                <p className="text-white text-xl font-semibold mt-4">You can create a room and share the room ID with your friends to join the room.</p>
                <p className="text-white text-xl font-semibold mt-4">You can also join a room by entering the room ID.</p>
                <p className="text-white text-xl font-semibold mt-4">You can also create a room and share the link with your friends.</p>
            </div>
        </div>
    );
}


export default AboutUsPage;