import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast, Toast } from "../Components/Toast";
import CodeEditor from "../Components/CodeEditor";
import IOTerminal from "../Components/IOTerminal";

const ProjectPage = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { projectId } = useParams();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({});
    const [code, setCode] = useState("");

    const getProject = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_PROJECT_API,{
                headers: { Authorization: `Bearer ${token}` },
                params: { projectId: projectId }
            });
            if (response.data.success === true) {
                setProject(response.data.project);
                console.log(response.data.project);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } else {
                showToast("error", response.data.error);
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            }
        } catch (error) {
            showToast("error", "Error connecting to server");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        }
    }

    const saveProject = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_PROJECT_SAVE_API, 
                {projectId, code});
            if (response.data.success === true) {
                showToast("success", "Code saved successfully");
            } else {
                showToast("error", "Error saving code");
            }
        } catch (error) {
            showToast("error", "Error connecting to server");
        }
    }

    const deleteProject = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_PROJECT_DELETE_API,{projectId},
                {headers: { Authorization: `Bearer ${token}` }});
            if (response.data.success === true) {
                showToast("success", "Project deleted successfully");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } else {
                showToast("error", "Error deleting project");
            }
        } catch (error) {
            showToast("error", "Error connecting to server");
        }
    }

    useEffect(() => {
        getProject();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
        <Toast />
            <nav className="flex flex-row items-center justify-between w-full h-16 bg-gray-800">
                <div className="flex flex-shrink-0 ml-2">
                  <h1 className="text-4xl font-bold text-white">Online IDE</h1>
                </div>

                <div className="flex flex-row">
                    <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                    <span className="text-2xl font-bold text-white ml-1">{`.${project.language}`}</span>
                </div>



                <div className="flex flex-row">
                    <button className="bg-gray-700 hover:bg-gray-600 border-2 text-white font-bold py-1 px-2 mr-4 rounded"
                     onClick={ saveProject } >
                        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/save.png" className="h-8 w-8" alt="save" />
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 border-2 text-white font-bold py-1 px-2 mr-4 rounded"
                        onClick={ deleteProject } >
                        <img src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-forever.png" className="h-8 w-8" alt="delete" />
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 border-2 text-white font-bold py-2 px-4 mr-4 rounded"
                    onClick={()=>{ navigate('/dashboard') }} >
                        Dashboard
                    </button>
                </div>
            </nav>
            
            {loading ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-white mb-6"></div>
                    <p className="text-2xl font-bold">Loading...</p>
                </div>
            ) : (
                <div className="flex flex-col flex-grow w-full h-full overflow-auto">
                    <div className="ProjectPage h-full w-full">
                      <CodeEditor code={project.code} setCode={setCode} language={project.language}/>
                    </div>
                    <IOTerminal code={code} language={project.language}/>
                </div>
            )}
        </div>
    )
}

export default ProjectPage;