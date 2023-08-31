import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import io from "socket.io-client";
import CodeEditor from "../Components/CodeEditor";
import ConnectedUser from "../Components/ConnectedUser";
import { Toast, showToast } from "../Components/Toast";
import IOTerminal from "../Components/IOTerminal";
import LogoNameLink from "../Components/LogoNameLink";
import "../App.css";

const CodeRoomPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  var { userName, language, action } = location.state
    ? location.state
    : { userName: "", language: null, action: "join" };

  const { roomId } = useParams();
  const socket = useRef(null);

  const [name, setName] = useState(userName); // name of the user
  const [users, setUsers] = useState({}); // list of users in the room
  const [code, setCode] = useState(""); // code of the room
  const [loading, setLoading] = useState(true);
  const [roomLanguage, setRoomLanguage] = useState(language); // language of the room [c, cpp, java, python, js]

  const initSocket = () => {
    socket.current = io(import.meta.env.VITE_SOCKET_SERVER, {
      transports: ["websocket"],
    });
  };

  const joinRoom = async () => {
    socket.current.emit(
      "join-room",
      { roomId, name, language, action },
      ({ success, name, language, connectedUsers, code, message }) => {
        // callback
        if (success) {
          setupRoom(name, language, connectedUsers);
          setCode(code);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } else {
          showToast("error", message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    );
  };

  const setupRoom = async (name, language, connectedUsers) => {
    setName(name);
    setRoomLanguage(language);
    setUsers(connectedUsers);
  };

  const handleUserConnect = (name, connectedUsers) => {
    setUsers(connectedUsers);
    if (!document.hidden)
      showToast("user-connected", `👋 ${name} joined the room`);
  };

  const handleUserDisconnect = (name, connectedUsers) => {
    setUsers(connectedUsers);
    if (!document.hidden)
      showToast("user-disconnected", `👋 ${name} left the room`);
  };

  const shareRoomURL = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join my room!",
        url: window.location.href,
      });
    } else {
      showToast("error", "Web Share API not supported on this browser.");
    }
  };

  const leaveRoom = () => {
    socket.current.emit("leave-room", { roomId, name });
    navigate("/");
  };

  useEffect(() => {
    initSocket();

    if (roomLanguage) joinRoom();

    socket.current.on("connect_error", () => {
      showToast(
        "error",
        "Unable to connect to server. Please try again later."
      );
      navigate("/");
    });

    socket.current.on("user-connected", ({ name, connectedUsers }) => {
      handleUserConnect(name, connectedUsers);
    });

    socket.current.on("user-disconnected", ({ name, connectedUsers }) => {
      handleUserDisconnect(name, connectedUsers);
    });

    socket.current.on("sync-code", (code) => {
      setCode(code);
    });

    return () => {
      socket.current.off("connect_error");
      socket.current.off("user-connected");
      socket.current.off("user-disconnected");
      socket.current.disconnect();
    };
  }, []);

  return (
    <div className="CodeRoom flex flex-col h-screen overflow-auto">
      <Toast />
      <nav className="flex justify-between flex-wrap bg-gray-900 border-b border-gray-400 px-4 py-2">
        <LogoNameLink />
        <img className="self-center h-10 w-10 mr-6" src={new URL(`../assets/${roomLanguage}.png`, import.meta.url)} alt="logo" />
      </nav>

      {loading ? (
        <div className="flex justify-center items-center h-full bg-gray-800">
          {!roomLanguage ? ( // if user joins using URL show enter name form
            <div className="flex flex-col items-center justify-center border-t-2 border-cyan-400 p-10 bg-gray-900 rounded-md">
              <h1 className="text-4xl text-white font-bold">
                Enter your name:
              </h1>
              <input
                className="w-full h-12 mt-5 p-2 rounded-lg font-bold border-4 focus:outline-none focus:border-cyan-400"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="primaryButton text-2xl w-full mt-5" onClick={joinRoom}>
                Join Room
              </button>
            </div>
          ) : (
            <h1 className="text-5xl font-extrabold text-white">Loading...</h1>
          )}
        </div>
      ) : (
        <div className="flex flex-row w-full h-full overflow-auto">
          <div className="Sidebar flex flex-col w-1/6 bg-gray-900 text-center border-r-2 border-gray-400">
            <h2 className="text-xl font-extralight text-gray-400 self-center m-2">
              Connected Users
            </h2>

            <div className="h-8/10 w-full px-2 overflow-x-hidden overflow-y-auto">
              <ConnectedUser key={socket.current.id} name={name} />
              {Object.keys(users)
                .filter((socketId) => socketId !== socket.current.id)
                .map((socketId) => {
                  return (
                    <ConnectedUser key={socketId} name={users[socketId]} />
                  );
                })}
            </div>

            <div className="flex flex-col h-fit py-2 align-center border-t-2 border-gray-600">
              <button
                className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 w-11/12 self-center rounded mb-2"
                onClick={shareRoomURL}
              >
                Invite Others
              </button>
              <button
                className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 w-11/12 self-center rounded"
                onClick={leaveRoom}
              >
                Leave Room
              </button>
            </div>
          </div>
          <CodeEditor
            language={roomLanguage}
            code={code}
            setCode={setCode}
            isCollaborative={true}
            socket={socket}
          />
          <IOTerminal code={code} language={roomLanguage} />
        </div>
      )}
    </div>
  );
};

export default CodeRoomPage;
