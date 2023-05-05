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
  const [userProjects, setUserProjects] = useState({});
  const [collabProjects, setCollabProjects] = useState({});

  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(import.meta.env.VITE_USER_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success === true) {
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
          navigate("/");
        }, 2000);
      }
    } else {
      showToast("error", "Please login to continue");
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const createProject = async (name, language, isCollaborative) => {
    if (name === "") return;

    try {
      const response = await axios.post(
        import.meta.env.VITE_NEW_PROJECT_API,
        { name, language, isCollaborative },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success === true) {
        const projectId = response.data.projectId;

        const newProject = {
          [projectId]: {
            name: name,
            language: language,
            isCollaborative: isCollaborative,
          },
        };

        isCollaborative
          ? setCollabProjects({ ...collabProjects, ...newProject })
          : setUserProjects({ ...userProjects, ...newProject });

        showToast("success", "Project created successfully");
        setShowModal(false);
      } else {
        showToast("error", "Error creating project");
      }
    } catch (error) {
      showToast("error", "Error connecting to server");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-700 overflow-hidden">
      <nav className="flex justify-between flex-wrap bg-gray-900 px-4 py-2">
        <div className="flex flex-row ">
          <a href="/">
            <img
              className="object-cover object-center rounded mt-4 w-9 hover:w-10 "
              alt="hero"
              src={new URL(`../assets/arrow.png`, import.meta.url)}
            />
          </a>
          <div className=" ml-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mr-4">{username}</h1>
            <p className="text-white">{email}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <button
            className="bg-emerald-500 hover:bg-green-600 text-white font-bold rounded-md px-4 py-2 m-2"
            onClick={() => setShowModal(true)}
          >
            New Project
          </button>
          <button
            className="bg-emerald-500 hover:bg-green-600 text-white font-bold rounded-md px-4 py-2 m-2"
            onClick={signout}
          >
            Logout
          </button>
        </div>
      </nav>

      <NewProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        createProject={createProject}
      />
      <Toast />

      <div className="flex flex-col h-full">
        <div className="flex flex-col h-1/2 w-full border-b-2 border-emerald-500  mr-4">
          <div className="flex flex-row items-center justify-between w-full px-4 py-1 bg-gray-800">
            <h1 className="text-lg font-bold text-white">My Projects</h1>
          </div>
          <div className="flex flex-row flex-wrap items-center w-full overflow-x-auto overflow-y-auto">
            {loading ? (
              <h1 className="text-2xl m-2 text-white">Loading...</h1>
            ) : (
              <>
                {Object.keys(userProjects).map((key) => (
                  <ProjectDetails
                    key={key}
                    id={key}
                    name={userProjects[key].name}
                    language={userProjects[key].language}
                    isCollaborative={false}
                  />
                ))}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col h-2/5 w-full">
          <div className="flex flex-row items-center justify-between w-full px-4 py-1 bg-gray-800">
            <h1 className="text-lg font-bold text-white">
              Collaboration Projects
            </h1>
          </div>
          <div className="flex flex-row flex-wrap items-center w-full overflow-x-auto overflow-y-auto">
            {loading ? (
              <h1 className="text-2xl m-2 text-white">Loading...</h1>
            ) : (
              <>
                {Object.keys(collabProjects).map((key) => (
                  <ProjectDetails
                    key={key}
                    id={key}
                    name={collabProjects[key].name}
                    language={collabProjects[key].language}
                    isCollaborative={true}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
