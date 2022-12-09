const Queue=require('bull');
const Job = require('./Models/Job');
const {executeCode} = require('./CodeExecutionSystem/executeCode');
const NumWorkers=5;
const jobQueue = new Queue("job-queue");

jobQueue.process(NumWorkers, async ({data})=>{
    const {id: jobId}=data;
    const job=await Job.findById(jobId);
    const{language, filePath, inputs} = job;
    if(job===undefined) throw Error("Job not found");
    console.log("[Fetched]:", jobId);
    try{job['startedAt']=new Date();
    const output=await executeCode(language, filePath, inputs);//run code
    console.log("[Executed]:",jobId);
    job["completedAt"]=new Date();
    job["status"]='success';
    job['output']=output;
    await job.save();//updating document in db
    return true;
} catch(err){
    console.log(err);
}
});

const AddJobToQueue = async (jobId)=>{
    await jobQueue.add({id: jobId});
    console.log("[Added to Queue]:",JSON.stringify(jobId));
};

jobQueue.on('failed', (error) => {
    console.log(error.data.id," failed", error.failedReason);
});

module.exports={
    AddJobToQueue,
};