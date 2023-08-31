import React from "react";
import Avatar from "react-avatar";

const ConnectedUser = ({name, isOffline}) => {
    return (
        <div className="flex flex-row my-4 bg-gray-600 rounded-md px-1 py-1 justify-between items-center overflow-x-hidden">
            <div className="flex flex-row items-center">
                <Avatar name={name} size="40" round="10px" className="self-center" />
                <h3 className="font-extralight text-white ml-3">{name}</h3>
            </div>
            <div className={"w-2 h-2 rounded-full mr-2 "+(isOffline? "bg-red-500" : "bg-green-500")}></div>
        </div>
    );
}

export default ConnectedUser;