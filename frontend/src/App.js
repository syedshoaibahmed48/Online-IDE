import './App.css';
import axios from 'axios';
import React, {useState} from 'react';

function App() {

  const [code, setCode] = useState('');

  const [language, setLanguage] = useState('c');

  const [output, setOutput] = useState('');

  const runCode= async () => {
    if(code.replaceAll(" ","").replaceAll("\n","")===""){//if code field is empty
      setOutput("No Code Submitted");
      return;
    }
    const payload={//payload of an API is the data you sen to the server when you make an API request.
      language,
      code//in es6 code:code is same as code
    };

    try{
      const response = await axios.post("http://localhost:5000/run", payload);//post request
      setOutput(response.data.output);
    } catch (err) {
      const filePath=err.response.data.err.error.cmd.split(" ")[1]//gets file path from json object
      setOutput(err.response.data.err.stderr.replaceAll(filePath,"In Code"));//returns error message from stderr
                                                                             //without displaying the file path
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
        <textarea rows="20" cols="60" value={code} onChange={(e)=>{setCode(e.target.value);}}></textarea>
      </div>

      <div id='outputDiv'>
        <h2>Output</h2>
        <textarea rows="20" cols="40" value={output} readOnly={true}></textarea>
      </div>

    </div>
  );
}

export default App;
