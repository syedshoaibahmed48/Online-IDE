import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const ProjectDetails = ({ id, name, language, isCollaborative }) => {

    const navigate = useNavigate();

    const openProject = () => {
        isCollaborative ? navigate(`/collabproject/${id}`) : navigate(`/project/${id}`);
    }

    return (
        <div className="flex flex-row p-2 m-2 bg-gray-600 hover:bg-gray-400 text-white rounded-md cursor-pointer"
          onClick={openProject} >
            <img src={ new URL (`../assets/${language}.png`, import.meta.url)} alt="python" className="w-6 h-6 self-center mr-2" />
            <p className="text-lg font-bold">{name}</p>
        </div>
    )
}

export default ProjectDetails;