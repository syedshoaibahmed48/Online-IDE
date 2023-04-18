import React, { useEffect, useState } from "react";
import axios from 'axios';
import CodeEditor  from "../Components/CodeEditor";
import OutputField from "../Components/OutputField";
import InputField from "../Components/InputField";
import Dropdown from "../Components/Dropdown";
import SampleCode from "../assets/SampleCode";
import { Toast, showToast } from "../Components/Toast";

const CodeLabPage = () =>{

  const [code, setCode] = useState(SampleCode['c']);
  const [language, setLanguage] = useState('c');
  const [inputs, setInputs] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "CodeLab";
    return () => {
      document.title = "Online IDE";
    };
  }, []);

  const executeCode = async () => {
    setLoading(true);
    setOutput("");
    if(code.replaceAll(" ","").replaceAll("\n","")===""){//if code field is empty
      showToast("error", "Code field is empty");
      setLoading(false);
      return;
    }

    const payload={//payload of an API is the data you sen to the server when you make an API request.
      language,
      code,//in es6 code:code is same as code
      inputs
    };
    
    try{
      const response = await axios.post(import.meta.env.VITE_EXECUTE_API, payload);//post request
  
      const intervalId = setInterval(async()=>{
        const jobResponse = await axios.get(import.meta.env.VITE_STATUS_API, {params:{id:response.data.jobId}});
        const {success, job, error} = jobResponse.data;
        if(success){
          const {status:jobStatus, output:jobOutput} = job;
          if(jobStatus==="pending") return;//continue loop
          setOutput(jobOutput);
          setLoading(false);
          clearInterval(intervalId);//stops interval loop wh
        }
        else{
          setOutput(error);
          setLoading(false);
          clearInterval(intervalId);
        }
      },3000);//3 sec delay
    } catch (err) {
      showToast("error", "Error connecting to server");
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen bg-zinc-700 text-white'>
      <Toast/>
      <nav className="flex items-center justify-between flex-wrap bg-zinc-800 p-3">
        <div className="flex flex-shrink-0  mr-6">
          <h1 className="text-4xl font-bold text-white">CodeLab</h1>
        </div>

        <div className="flex flex-row">

          <Dropdown language={language} setLanguage={setLanguage}/>

          <button onClick={executeCode} className="inline-flex items-center text-xl px-4 ml-4 border rounded border-white hover:bg-zinc-900 lg:mt-0"
            disabled={ loading ? true : false } >
            { !loading ? ('Run Code') : // If loading is false, show this
            (<div className="flex flex-row">
              <svg className="animate-spin -ml-1 mr-3 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Executing</p>
            </div>)}
          </button>
        </div>
      </nav>

      <div className="flex flex-grow">
        <div className="CodeLabCM w-1/2 m-2 px-1 py-1">
          <CodeEditor setCode={setCode} language={language} />
        </div>
        
        <div className="CodeLabIO mt-2 flex-grow">
          <OutputField output={output} setOutput={setOutput}/>
          <InputField inputs={inputs} setInputs={setInputs}/>
        </div>

      </div>
    </div>
  );
}

export default CodeLabPage;