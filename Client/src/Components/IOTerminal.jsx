import React, {useState} from "react";
import axios from "axios";
import InputField from "./InputField";
import OutputField from "./OutputField";
import { Toast, showToast } from "./Toast";

const IOTerminal = ({code, language}) => {

    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
        setOutput("");
        setInputs("");
    }

    const executeCode = async () => {
        setLoading(true);
        setOutput("");
        if(code.replaceAll(" ","").replaceAll("\n","")===""){//if code field is empty
            showToast("error", "Code field is empty");
            setLoading(false);
            return;
        }
        setOpen(true);

        const payload={ language, code, inputs };

        console.log(payload);

        try{
            const response = await axios.post(import.meta.env.VITE_EXECUTE_API, payload);

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
    }

    return (
        <div className="absolute bottom-0 bg-gray-800 w-full z-50 text-white" >
            <Toast/>
            <div className="flex flex-row items-center justify-between w-full bg-gray-800 py-1">
                <div className="flex flex-shrink-0 ml-4">
                    <button className="text-gray-400 font-bold hover:text-white"
                     onClick={ toggleOpen }>{'I/O Terminal >'}</button>
                </div>
                <div className="flex flex-shrink-0 mr-4">
                    

                <button onClick={ executeCode } className="inline-flex items-center px-2 mr-4 border rounded border-white hover:bg-gray-700 lg:mt-0"
                    disabled={ loading ? true : false } >
                { !loading ? ('Run Code') : // If loading is false, show this
                (<div className="flex flex-row">
                    <svg className="animate-spin -ml-1 mr-3 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="self-center" >Executing</p>
                </div>)}
                </button>


                    <button className="text-gray-400 font-bold rounded-full p-1 hover:text-white hover:bg-gray-600"
                     onClick={ toggleOpen } >
                        { open ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />    
                            </svg>  
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /> 
                            </svg>
                        }
                    </button>
                </div>
            </div>

            { open && 
            <div className="flex flex-col items-center justify-center w-full h-fit bg-gray-700 text-white">
                <div className="IOTerminal flex flex-row items-center justify-center w-full h-96 text-white">
                    <div className="InputField flex flex-col items-center w-1/3 h-full">
                        <p className="text-2xl items-center font-bold my-1">Input</p>
                        <InputField inputs={inputs} setInputs={setInputs}/>
                    </div>
                    <div className="OutputField flex flex-col items-center w-2/3 h-full">
                        <p className="text-2xl font-bold my-1">Output</p>
                        <OutputField output={output} setOutput={setOutput}/>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default IOTerminal;
