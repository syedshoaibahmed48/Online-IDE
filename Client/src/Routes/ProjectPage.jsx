import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../Components/Toast";
import CodeEditor from "../Components/CodeEditor";
import OutputField from "../Components/OutputField";
import InputField from "../Components/InputField";

const ProjectPage = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { projectId } = useParams();
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({});
    const [code, setCode] = useState("");
    const [inputs, setInputs] = useState("");
    const [output, setOutput] = useState("");

    const getProject = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_PROJECT_API, {
                headers: { Authorization: `Bearer ${token}` },
                query: { projectId },
            });
            if (response.data.success === true) {
                setProject(response.data.project);
                console.log(response.data.project);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } else {
                showToast("error", "Error fetching project");
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

    useEffect(() => {
        getProject();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white">
            <nav className="flex flex-row items-center justify-between w-full h-16 bg-gray-800">
                <div className="flex flex-shrink-0 ml-2">
                  <h1 className="text-4xl font-bold text-white">Online IDE</h1>
                </div>

                <div className="flex flex-row">
                    <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                    <span className="text-3xl font-bold text-white ml-1">{`.${project.language}`}</span>
                </div>

                <div className="flex flex-row">
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
                <div className="flex flex-grow w-full h-full">
                    <div className="w-full">
                      <CodeEditor setCode={setCode} language={project.language} />
                    </div>
                 </div>
            )}
        </div>
    )
}

export default ProjectPage;