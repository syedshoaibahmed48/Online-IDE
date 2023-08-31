import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectDetails from "../Components/ProjectDetails";
import NewProjectModal from "../Components/NewProjectModal";
import LogoNameLink from "../Components/LogoNameLink";
import { Toast, showToast } from "../Components/Toast";
import "../App.css"

const DashboardPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState({});

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
          setProjects(response.data.user.projects);
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
          },
        };

        
        setProjects({ ...projects, ...newProject });
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
    <div className="flex flex-col h-screen overflow-hidden">
      <nav className="flex justify-between flex-wrap bg-[#0b0f18] px-4 py-2 border-b border-cyan-500">
        <div className="flex flex-row ">
          <LogoNameLink />
          <div className="border-r-2 border-cyan-500 h-16 ml-2" />
          <div className="flex flex-col ml-2 justify-center">
            <h1 className="text-3xl font-bold text-white mr-4">{username}</h1>
            <p className="text-white">{email}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <button className="primaryButton" onClick={() => setShowModal(true)}>
            New Project
          </button>
          <button className="primaryButton ml-2"onClick={signout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-col w-full h-full px-12 py-2 bg-[#111827] overflow-x-auto overflow-y-auto">
        <h1 className="text-5xl font-extrabold self-center text-white text-center px-4 py-2 my-2 border-b-4 border-white">Projects</h1>
        <div className="flex flex-row flex-wrap">
        {
          Object.keys(projects).map((key) => (
                  <ProjectDetails
                    key={key}
                    id={key}
                    name={projects[key].name}
                    language={projects[key].language}
                  />
                ))
        }
        </div>
      </div>

      <NewProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        createProject={createProject}
      />
      <Toast />


    </div>
  );
};

export default DashboardPage;
