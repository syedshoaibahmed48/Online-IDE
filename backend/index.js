const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const {generateCodeFile}=require('./CodeExecutionSystem/generateCodeFile');
const {AddJobToQueue} = require('./CodeExecutionSystem/jobQueue');
const Job=require('./CodeExecutionSystem/Models/Job');//no curly braces coz job is default export in job.js
const port=5000;

mongoose.connect('mongodb://127.0.0.1/Online_IDE_DB',(err)=>{
    if(err) console.error(err);
    else console.log("Successfully connected to the Database");
});

const app=express();

app.use(express.json());//The express.json() function is a built-in middleware function in Express.
//It parses incoming requests with JSON payloads and is based on body-parser.

app.use(cors());//to handle cors(cross origin resource sharing) error

app.use(express.urlencoded({extended: true}));//middleware that only parses urlencoded bodies

app.post('/run', async (req,res)=>{//this code handles post request to '/run' route
    const {language, code, inputs}=req.body;
    try{
        const filePath=await generateCodeFile(language, code);//to generate code file
        job =await new Job({language, filePath, inputs}).save();//savin doc with lang and filepath in db
        const jobId=job['_id'];
        AddJobToQueue(jobId);
        console.log("[Run Request]:",JSON.stringify(jobId));
        res.status(201).json({success:true,jobId})
    } catch(err){
        res.status(500).json({success:false, error:JSON.stringify(err)});
    }
}); 

app.get('/status', async (req, res)=>{//this code handles get request to '/status' route
    const jobId=req.query.id;
    console.log("[Status Request]:",jobId);
    try{
        const job=await Job.findById(jobId);
        if(job===undefined) res.status(404).json({success:false, error:'Invalid job id'});//if job not found
        res.status(200).json({success:true, job});
    } catch(err){
        res.status(400).json({success:false, error:JSON.stringify(err)});
    }
})

app.listen(port, ()=>{//This starts a server and listens on port for connections
    console.log("App is available at : http://localhost:"+port);
});