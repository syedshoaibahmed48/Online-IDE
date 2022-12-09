import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import SampleCode from './SampleCode';

function App() {

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('c');
  const [inputs, setInputs] = useState('');
  const [output, setOutput] = useState('');

useEffect(()=>{
  setCode(SampleCode[language]);
},[language]);

  const runCode= async () => {
    if(code.replaceAll(" ","").replaceAll("\n","")===""){//if code field is empty
      setOutput("No Code Submitted");
      return;
    }
    const payload={//payload of an API is the data you sen to the server when you make an API request.
      language,
      code,//in es6 code:code is same as code
      inputs
    };

    try{
      const response = await axios.post("http://localhost:5000/run", payload);//post request

      const intervalId = setInterval(async()=>{
        const jobResponse = await axios.get("http://localhost:5000/status",{params:{id:response.data.jobId}});
        const {success, job, error} = jobResponse.data;
        if(success){
          const {status:jobStatus, output:jobOutput} = job;
          if(jobStatus==="pending") return;//continue loop
          setOutput(jobOutput);
          clearInterval(intervalId);//stops interval loop wh
        }
        else{
          setOutput(error);
          clearInterval(intervalId);
        }
      },3000);//3 sec delay
    } catch (err) {
      console.log("Error connecting to the server");
    }
  };

  return (
    <div className="App">
      <div id="inputDiv">
        <h1>Online IDE</h1>
        <div id="options">

        <form>
            <label htmlFor="cars">Language:</label>
             <select value={language} onChange={(e)=>{setLanguage(e.target.value);}}>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="js">JavaScript</option>
              <option value="py">Python</option>
             </select>
              <br></br>
          </form>

          <button id="run" onClick={()=>{runCode();}}>Run Code</button>

        </div>
        <br></br><br></br>
        <textarea rows="24" cols="60" value={code} onChange={(e)=>{setCode(e.target.value);}}></textarea>
      </div>

      <div id='outputDiv'>
        <h2>Output</h2>
        <textarea rows="17" cols="45" value={output} readOnly={true}></textarea>
        <h2>Inputs</h2>
        <textarea rows="5" cols="30" value={inputs} onChange={(e)=>{setInputs(e.target.value);}}></textarea>
      </div>

    </div>
  );
}

export default App;
