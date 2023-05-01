import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Toast, showToast } from "../Components/Toast";
import CodeEditor from "../Components/CodeEditor";
import ConnectedUser from "../Components/ConnectedUser";
import IOTerminal from "../Components/IOTerminal";


const CollabProjectPage = () => {

    const navigate = useNavigate();

    const { projectId } = useParams();

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState({});
    const [connectedUsers, setConnectedUsers] = useState({});
    const [project, setProject] = useState({}); 
    const [code, setCode] = useState("");
    const socket = useRef(null);

    const initSocket = () => {
        socket.current = io(import.meta.env.VITE_SOCKET_SERVER, {
            transports: ['websocket'],
        });
    }

    const openProject =  () => {
        socket.current.emit('open-project', { projectId, token }, ({ success, error, project, connectedUsers, collaborators, code }) => {
            if(success) {
                setProject(project);
                setCode(code);
                setConnectedUsers(connectedUsers);
                setUsers(collaborators);
                setLoading(false);
            } else {
                showToast("error", error);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            }
        });
    }

    const handleUserConnect = (name, connectedUsers) => {
        setConnectedUsers(connectedUsers);
        if(!document.hidden) showToast('user-connected', `👋 ${name} joined the room`);
    }

    const handleUserDisconnect = (name, connectedUsers) => {
        setConnectedUsers(connectedUsers);
        if(!document.hidden) showToast('user-disconnected', `👋 ${name} left the room`);
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
            console.log(error);
            showToast("error", "Error connecting to server");
        }
    }

    const shareRoomURL = () => {
        if (navigator.share) {
            navigator.share({
              title: 'Join my project!',
              url: window.location.href,
            })
          } else {
            showToast('error', 'Web Share API not supported on this browser.');
          }
    }

    const leaveRoom = () => {
        socket.current.emit('leave-room', { projectId, name });
        navigate('/dashboard');
    };

    useEffect(() => {

        initSocket();

        openProject();

        socket.current.on('connect_error', () => {
            showToast('error', 'Unable to connect to server. Please try again later.');
            navigate('/');
        });

        socket.current.on('user-connected', ({ name, connectedUsers}) => {
            handleUserConnect(name, connectedUsers);
        });

        socket.current.on('user-disconnected', ({ name, connectedUsers}) => {
            handleUserDisconnect(name, connectedUsers);
        });

        socket.current.on('sync-code', (code) => {
            setCode(code);
        });

        return () => {
            socket.current.off('connect_error');
            socket.current.off('user-connected');
            socket.current.off('user-disconnected')
            socket.current.disconnect();
        }

    }, []);


    return (
        <div className="CodeRoom flex flex-col h-screen">
        <Toast />
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-3">
            <div className="flex flex-shrink-0  mr-6">
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
                </div>


        </nav>
    
        { loading ? (
        <div className="flex justify-center items-center h-full bg-gray-700"> 
            <h1 className="text-5xl font-extrabold text-white">Loading...</h1>
        </div>
    
            ) : (
                    
        <div className="flex flex-row w-full h-full">
            <div className="Sidebar flex flex-col w-1/6 bg-gray-700 text-center border-r-2 border-gray-500">
                <h2 className="text-xl font-extralight text-gray-400 self-center m-2">Connected Users</h2>
                        
                <div className="h-8/10 w-full px-2 overflow-x-hidden overflow-y-auto">
                <ConnectedUser key={socket.current.id} name={connectedUsers[socket.current.id]} />
                    { Object.values(users).filter((name) => name !== connectedUsers[socket.current.id]).map((name) => {
                        return (
                            <ConnectedUser 
                            key={name} 
                            name={name} 
                            connectedUsers={connectedUsers}// provided to rerender component when users connect/disconnect
                            isOffline={ !connectedUsers[Object.keys(connectedUsers).find((socketId) => connectedUsers[socketId] === name)] } 
                            />
                        );
                    })
                    }
                </div>
    
                <div className="flex flex-col h-fit py-2 align-center border-t-2 border-gray-600">
                    <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 w-11/12 self-center rounded mb-2"
                    onClick={shareRoomURL}>
                        Invite Others
                    </button>
                    <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 w-11/12 self-center rounded"
                    onClick={leaveRoom}>
                        Dashboard
                    </button>
                </div>
                        
            </div>
            <CodeEditor 
                language={project.language} 
                code = {code}
                setCode={setCode} 
                isCollaborative={true} 
                socket={socket}
            />
            <IOTerminal code={code} language={project.language} />
        </div>
        )}
        </div>
    );
}

export default CollabProjectPage;