import React, { useEffect, useState } from "react";
import CodeEditor  from "../Components/CodeEditor";
import IOTerminal from "../Components/IOTerminal";
import Dropdown from "../Components/Dropdown";


const CodeLabPage = () =>{

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState('c');

  useEffect(() => {
    document.title = "CodeLab";
    return () => {
      document.title = "Online IDE";
    };
  }, []);

  return (
    <div className='flex flex-col h-screen bg-zinc-700 text-white'>
      <nav className="flex items-center justify-between flex-wrap bg-zinc-800 p-3">
        <div className="flex flex-shrink-0  mr-6">
          <h1 className="text-4xl font-bold text-white">CodeLab</h1>
        </div>

        <div className="flex flex-row">
          <Dropdown language={language} setLanguage={setLanguage}/>
        </div>
      </nav>


      <div className="flex flex-col flex-grow w-full h-full overflow-auto">
        <div className="ProjectPage h-full w-full">
          <CodeEditor code={code} setCode={setCode} language={language} useSampleCode={true}/>
        </div>
        <IOTerminal code={code} language={language}/>
      </div>
  

      </div>
  );
}

export default CodeLabPage;