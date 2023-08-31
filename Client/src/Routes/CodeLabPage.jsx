import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CodeEditor from "../Components/CodeEditor";
import IOTerminal from "../Components/IOTerminal";
import Dropdown from "../Components/Dropdown";

const CodeLabPage = () => {

  const location = useLocation();
  const { initialLanguage } = location.state || { initialLanguage: "c" };

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(initialLanguage);

  return (
    <div className="flex flex-col h-screen bg-zinc-700 text-white">
      <nav className="flex items-center justify-between flex-wrap bg-zinc-800 p-3">
        <div className="flex flex-shrink-0 ">
          <a href="/">
            <img
              className="object-cover object-center rounded w-9 hover:w-10 "
              alt="hero"
              src={new URL(`../assets/arrow.png`, import.meta.url)}
            />
          </a>
          <h1 className="text-4xl font-bold text-white ml-6">CodeLab</h1>
        </div>

        <div className="flex flex-row">
          <Dropdown language={language} setLanguage={setLanguage} />
        </div>
      </nav>

      <div className="flex flex-col flex-grow w-full h-full overflow-auto">
        <div className="ProjectPage h-full w-full">
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
            useSampleCode={true}
          />
        </div>
        <IOTerminal code={code} language={language} />
      </div>
    </div>
  );
};

export default CodeLabPage;
