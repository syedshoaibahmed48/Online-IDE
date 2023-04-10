import React from "react";
import Avatar from "react-avatar";

const ConnectedUser = ({name}) => {
    return (
        <div className="flex flex-row my-4 bg-gray-500 rounded-lg p-1 self-center overflow-x-hidden">
            <Avatar name={name} size="40" round="10px" className="self-center" />
            <h3 className="font-extralight text-white self-center ml-2">{name}</h3>
        </div>
    );
}

export default ConnectedUser;