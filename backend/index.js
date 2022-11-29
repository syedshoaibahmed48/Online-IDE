const express=require('express');
const cors=require('cors');
const {generateCodeFile}=require('./CodeExecutionSystem/generateCodeFile');
const {executeCode} = require('./CodeExecutionSystem/executeCode');
const port=5000;

const app=express();

app.use(express.json());//The express.json() function is a built-in middleware function in Express.
//It parses incoming requests with JSON payloads and is based on body-parser.

app.use(cors());//to handle cors(cross origin resource sharing) error

app.use(express.urlencoded({extended: true}));//middleware that only parses urlencoded bodies

app.post('/run', async (req,res)=>{//this code handles post request to '/run' route
    const {language, code}=req.body;
    try{
        const filePath=await generateCodeFile(language, code);//to generate code file
        const output=await executeCode(language, filePath);//run code
        res.json({output});
    } catch(err){
        res.status(500).json({err});
    }
});

app.listen(port, ()=>{//This starts a server and listens on port for connections
    console.log("App is available at : http://localhost:"+port);
});