import React, {useEffect, useState, useRef} from "react";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import io from "socket.io-client";
import CodeEditor from "../Components/CodeEditor";
import ConnectedUser from "../Components/ConnectedUser";
import { Toast, showToast } from "../Components/Toast";


const CodeRoomPage = () => {

    const navigate = useNavigate();

    const location = useLocation();

    var { userName, language, action } = location.state ? location.state : { userName: '', language: null, action: 'join' };

    const { roomId } = useParams();
    const socket = useRef(null);

    const [name, setName] = useState(userName); // name of the user
    const [users, setUsers] = useState([]); // list of users in the room
    const [code, setCode] = useState(""); // code of the room
    const [loading, setLoading] = useState(true);
    const [roomLanguage, setRoomLanguage] = useState(language); // language of the room [c, cpp, java, python, js]

    const initSocket = () => {
        socket.current = io(import.meta.env.VITE_SOCKET_SERVER, {
            transports: ['websocket'],
        });
    }

    const joinRoom = async () => {
        socket.current.emit('join-room', { roomId, name, language, action }, 
        ({success, name,  language, connectedUsers, code, message }) => {// callback
            if (success) {
                setupRoom(name, language, connectedUsers);
                setCode(code);
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } else {
              handleJoinRoomError(message);
            }
        });
    }

    const setupRoom = async (name, language, connectedUsers) => {
        setName(name);
        setRoomLanguage(language);
        setUsers((users) => [...users, ...connectedUsers.filter((u) => u.socketId !== socket.current.id)]);
    }

    const handleJoinRoomError = (message) => {
        showToast('error', message);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

    const handleUserConnect = (socketId, name) => {
        const newUser = {socketId: socketId, name: name};
        setUsers((users) => [...users, newUser]);
        if(!document.hidden) showToast('user-connected', `👋 ${name} joined the room`);
    }

    const handleUserDisconnect = (socketId, name) => {
        setUsers((users) => users.filter((u) => u.socketId !== socketId));
        if(!document.hidden) showToast('user-disconnected', `👋 ${name} left the room`);
    }

    const shareRoomURL = () => {
        if (navigator.share) {
            navigator.share({
              title: 'Join my room!',
              url: window.location.href,
            })
          } else {
            showToast('error', 'Web Share API not supported on this browser.');
          }
    }

    const leaveRoom = () => {
        socket.current.emit('leave-room', { roomId, name });
        navigate('/');
    };

    useEffect(() => {

        initSocket();

        if(roomLanguage) joinRoom();

        socket.current.on('connect_error', () => {
            handleJoinRoomError('Connection error, please try again later.');
        });

        socket.current.on('user-connected', ({socketId, name}) => {
            handleUserConnect(socketId, name);
        });

        socket.current.on('user-disconnected', ({socketId, name}) => {
            handleUserDisconnect(socketId, name);
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
    <div className="room flex flex-col h-screen">
    <Toast />
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-3">
        <div className="flex flex-shrink-0  mr-6">
          <h1 className="text-4xl font-bold text-white">Online IDE</h1>
        </div>
    </nav>

    { loading ? (
    <div className="flex justify-center items-center h-full bg-gray-700"> 
        { !roomLanguage ? ( // if user joins using URL show enter name form
        <div className="flex flex-col items-center justify-center border-t-2 border-teal-400 p-10 bg-gray-800 rounded-md">
            <h1 className="text-4xl text-white font-bold">Enter your name:</h1>
            <input className="w-full h-12 mt-5 p-2 rounded-lg font-bold border-4 border-gray-400" type="text" 
            placeholder="Enter your name" value={name} onChange={(e)=>{setName(e.target.value)}} />
            <button className="w-full mt-5 bg-gray-600 hover:bg-gray-500 text-2xl text-white font-bold py-2 px-4 rounded-lg" 
            onClick={joinRoom}>Join Room</button>
        </div>
        ) : (
                <h1 className="text-5xl font-extrabold text-white">Loading...</h1>
        ) }
    </div>

        ) : (
                
    <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-1/6 bg-gray-700 text-center border-r-2 border-gray-500">
            <h2 className="text-xl font-extralight text-gray-400 self-center m-2">Connected Users</h2>
                    
            <div className="h-8/10 w-full px-2 overflow-x-hidden overflow-y-auto">
            <ConnectedUser key={socket.current.id} name={name}/>
                {users.map((user) => (
                    <ConnectedUser key={user.socketId} name={user.name}/>
                ))}
            </div>

            <div className="flex flex-col h-fit py-2 align-center border-t-2 border-gray-600">
                <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 w-11/12 self-center rounded mb-2"
                onClick={shareRoomURL}>
                    Invite Others
                </button>
                <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 w-11/12 self-center rounded"
                onClick={leaveRoom}>
                    Leave Room
                </button>
            </div>
                    
        </div>
        <CodeEditor 
            language={roomLanguage} 
            code = {code}
            setCode={setCode} 
            isCollaborative={true} 
            socket={socket}
        />
    </div>
    )}
    </div>
    );
}

export default CodeRoomPage;