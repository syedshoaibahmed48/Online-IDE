import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectDetails from "../Components/ProjectDetails";
import NewProjectModal from "../Components/NewProjectModal";
import { Toast, showToast } from "../Components/Toast";


const DashboardPage = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userProjects, setUserProjects] = useState([]);
    const [collabProjects, setCollabProjects] = useState([]);

    const getUserDetails = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try{
                const response = await axios.get(import.meta.env.VITE_USER_API, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if(response.data.success === true) {
                    setUsername(response.data.user.username);
                    setEmail(response.data.user.email);
                    setUserProjects(response.data.user.userProjects);
                    setCollabProjects(response.data.user.collabProjects);
                    setLoading(false);
                } else {
                    showToast("error", "Please login to continue");
                    setTimeout(() => {
                        navigate("/auth");
                    }, 2000);
                }
            } catch (error) {
                showToast("error", "Error connecting to server");
                setTimeout(() => {
                    navigate("/auth");
                }, 2000);
            }
        } else {
            showToast("error", "Please login to continue");
            setTimeout(() => {
                navigate("/auth");
            }, 2000);
        }
    }

    const signout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const createProject = async (name, language, isCollaborative) => {

        if(name==="") return;

        let project = {
            name: name,
            language: language,
            isCollaborative: isCollaborative
        }

        try{
            const response = await axios.post(import.meta.env.VITE_NEW_PROJECT_API, project, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if(response.data.success === true) {
                project.id = response.data.projectId;
                isCollaborative ? setCollabProjects([...collabProjects, project]):setUserProjects([...userProjects, project]);
                setShowModal(false);
            } else {
                showToast("error", "Error creating project");
            }
        } catch (error) {
            showToast("error", "Error connecting to server");
        }
    }


    useEffect(() => {
        getUserDetails();
    }, []);


    return (
        <div className="flex flex-col h-screen bg-gray-700 overflow-hidden">
            <nav className="flex justify-between flex-wrap bg-gray-900 px-4 py-2">
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-white mr-4">{username}</h1>
                    <p className="text-white">{email}</p>
                </div>

                <div className="flex flex-row justify-center">
                    <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold rounded-md px-4 py-2 m-2"
                        onClick={() => setShowModal(true)}>
                        New Project
                    </button>
                    <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold rounded-md px-4 py-2 m-2"
                        onClick={signout}>
                        Signout
                    </button>
                </div>
            </nav>

            <NewProjectModal showModal={showModal} setShowModal={setShowModal} createProject={ createProject } />
            <Toast />

            <div className="flex flex-col h-full">

                <div className="flex flex-col h-1/2 w-full border-b-2 border-gray-300 mr-4">
                    <div className="flex flex-row items-center justify-between w-full px-4 py-1 bg-gray-800">
                    <h1 className="text-lg font-bold text-white">My Projects</h1>
                    </div>
                    <div className="flex flex-row flex-wrap items-center w-full overflow-x-auto overflow-y-auto">
                    { loading ? ( <h1 className="text-2xl m-2 text-white">Loading...</h1>) : (
                        <>
                        {userProjects.map((project) => {
                            return ( 
                                <ProjectDetails 
                                key={project.id}
                                id={project.id}
                                name={project.name} 
                                language= {project.language}
                                isCollaborative={project.isCollaborative}
                                /> 
                            );
                        })}
                        </>
                    )}
                    </div>
                    
                </div>

                <div className="flex flex-col h-2/5 w-full">
                    <div className="flex flex-row items-center justify-between w-full px-4 py-1 bg-gray-800">
                        <h1 className="text-lg font-bold text-white">Collaboration Projects</h1>
                    </div>
                    <div className="flex flex-row flex-wrap items-center w-full overflow-x-auto overflow-y-auto">
                    { loading ? ( <h1 className="text-2xl m-2 text-white">Loading...</h1> ) : (
                        <>
                        {collabProjects.map((project) => {
                            return (
                                <ProjectDetails
                                key={project.id}
                                id={project.id}
                                name={project.name} 
                                language= {project.language}
                                isCollaborative={project.isCollaborative}
                                />
                            );
                        })}
                        </>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;