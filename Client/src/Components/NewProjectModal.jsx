import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const NewProjectModal = ({ showModal, setShowModal, createProject }) => {

    const navigate = useNavigate();

    const [language, setLanguage] = useState("c"); 
    const [projectName, setProjectName] = useState("");
    const [projectID, setProjectID] = useState(""); 
    const [isCollaborative, setIsCollaborative] = useState(false);
    const [formType, setFormType] = useState("create"); // ["create", "join"]

    const handleSubmit = () => {
        if(formType === "create") handleCreateProject();
        else handleJoinProject();
    }

    const handleCreateProject = () => {
        if( projectName === ""  ) return;
        createProject(projectName, language, isCollaborative);
        setProjectName("");
        setLanguage("c");
        setIsCollaborative(false);
    }

    const handleJoinProject = () => {
        if( projectID === ""  ) return;
        navigate(`/collabproject/${projectID}`);
    }

    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${showModal ? "block" : "hidden"}`}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                
                <div className="inline-block align-bottom bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-gray-700 text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    
                    <div className="flex flex-row h-10 rounded bg-gray-600">
                        <div className={"flex h-full w-1/2 py-2 cursor-pointer justify-center items-center "+ (formType === "create" && "bg-gray-800") }>
                        <h1 className={"text-2xl leading-6 font-medium " + (formType === "create" ? "text-white" : "text-gray-400")} 
                        id="modal-headline" onClick={()=>{ setFormType("create") }}>
                            New Project
                        </h1>
                        </div>

                        <div className={"flex h-full w-1/2 py-2 cursor-pointer justify-center items-center " + (formType === "join" && "bg-gray-800")}>
                        <h1 className={"text-2xl leading-6 font-medium " + (formType === "join" ? "text-white" : "text-gray-400")} 
                        id="modal-headline" onClick={()=>{ setFormType("join") }}>
                            Join Project
                        </h1>
                        </div>
                    </div>

                        <div className="mt-4">
                        {formType === "create" ? (
                            <><input type="text" placeholder="Project Name" className="bg-gray-800 text-white rounded-md w-full p-2 mb-4"
                                value={projectName} onChange={(e) => setProjectName(e.target.value)}
                            />
                            <select className="bg-gray-800 text-white rounded-md w-full p-2 mb-4"
                                value={language} onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="c">C</option>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                                <option value="js">JavaScript</option>
                                <option value="py">Python</option>
                            </select>
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" checked={isCollaborative} onChange={(e) => setIsCollaborative(e.target.checked)} />
                                <label>Collaborative</label>
                            </div>
                            </>
                                ) : (
                                    <input type="text" placeholder="Project ID" className="bg-gray-800 text-white rounded-md w-full p-2 mb-4"
                                        value={projectID} onChange={(e) => setProjectID(e.target.value)}
                                    />
                                )
                            }
                            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-500 text-base font-bold text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={ handleSubmit } >
                                    {formType === "create" ? "Create" : "Join"}
                                </button>
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-600 text-base font-bold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowModal(false)} >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default NewProjectModal;