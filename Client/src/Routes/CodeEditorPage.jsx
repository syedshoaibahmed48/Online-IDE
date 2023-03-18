import React, {useState} from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import 'bootstrap/dist/css/bootstrap.css';
import CodeEditor from "../Components/CodeEditor";
import OutputField from "../Components/OutputField";
import InputField from "../Components/InputField";
import SampleCode from "../SampleCode.js";

const CodeEditorPage = () =>{

    const [code, setCode] = useState(SampleCode['c']);
    const [language, setLanguage] = useState('c');
    const [inputs, setInputs] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState('C');


    const executeCode= async () => {
      setLoading(true);
      setOutput("");
      if(code.replaceAll(" ","").replaceAll("\n","")===""){//if code field is empty
        alert("No Code Submitted");
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
        alert("Error connecting to the server");
        setLoading(false);
      }
    };

    const DisplayLogo=(props) => {
      return <img src={ new URL (`../assets/${props.language}.png`, import.meta.url)} alt='logo' //new URL is used to get the path of the image
              className="image" 
              height={30}
              width={30}
            />;
    }


    return(
        <div className="CodeEditorPage">
            <Navbar variant="dark">
              <Container>

                <Navbar.Brand>
                  Online IDE
                </Navbar.Brand>

                <DropdownButton menuVariant="dark" variant="secondary"
                  title={<><DisplayLogo language={language}/><span className="selectedOption">{option}</span></>} 
                      onSelect={(a, e)=>{setOption(e.target.innerText); 
                                         setLanguage(e.target.value);
                                         setOutput("")}}>
                    <DropdownItem as={Button} value='c'><DisplayLogo language='c'/>C</DropdownItem>
                    <DropdownItem as={Button} value='cpp'><DisplayLogo language='cpp'/>C++</DropdownItem>
                    <DropdownItem as={Button} value='java'><DisplayLogo language='java'/>Java</DropdownItem>
                    <DropdownItem as={Button} value='js'><DisplayLogo language='js'/>JavaScript</DropdownItem> 
                    <DropdownItem as={Button} value='py'><DisplayLogo language='py'/>Python</DropdownItem>  
                  </DropdownButton>

              </Container>
              
              <Button variant="secondary" size="lg" 
                style={{float:'right', marginInline:'40px', minHeight:'90%'}} 
                disabled={loading}
                onClick={executeCode}>
                Run Code
              </Button>
            </Navbar>

            <div className="mainDiv">
              <div className="codeEditorDiv">

                <CodeEditor language={language} setCode={setCode}/>
                
              </div>

              <div className="ioDiv">
                <div className="outputDiv">
                  <OutputField output={output} loading={loading}/>
                </div>
                <div className="inputDiv">
                  <InputField setInputs={setInputs}/>
                </div>
            </div>
              
            </div>
        </div>
    )
}

export default CodeEditorPage

