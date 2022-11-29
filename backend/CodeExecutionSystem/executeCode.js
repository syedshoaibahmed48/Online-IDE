const fs=require('fs');//js module for working with files
const path=require('path');//js module for working with file paths 
const { exec } = require('node:child_process');

const CodeFilesDir=path.join(__dirname,"CodeFiles");//__dirname gives path of this generateCodeFile file 

const executeCode = (language, filePath)=>{
    const jobId=path.basename(filePath).split(".")[0];//basename gives the filename from file path
    const outputPath=path.join(CodeFilesDir,`${jobId}.exe`);//path for o/p file is created

    switch(language){
        case "cpp": 
        return new Promise((resolve, reject)=> {
            exec(`g++ ${filePath} -o ${outputPath} && cd ${CodeFilesDir} && ${jobId}.exe`, 
            (error, stdout, stderr)=>{
                if(error) reject({error, stderr});
                if(stderr) reject(stderr);
                resolve(stdout);
                exec(`cd ${CodeFilesDir} && del ${filePath} ${outputPath}`);//deleting the files after execution
            });
        });

        case "c":
            return new Promise((resolve, reject)=> {
                exec(`gcc ${filePath} -o ${outputPath} && cd ${CodeFilesDir} && ${jobId}.exe`, 
                (error, stdout, stderr)=>{
                    if(error) reject({error, stderr});
                    if(stderr) reject(stderr);
                    resolve(stdout);
                    exec(`cd ${CodeFilesDir} && del ${filePath} ${outputPath}`);
                });
            });

        case "java":
            return new Promise((resolve, reject)=> {
                exec(`java ${filePath}`, 
                (error, stdout, stderr)=>{
                    if(error) reject({error, stderr});
                    if(stderr) reject(stderr);
                    resolve(stdout);
                    exec(`cd ${CodeFilesDir} && del ${filePath}`);
                });
            });

        case "py":
            return new Promise((resolve, reject)=> {
                exec(`python ${filePath}`, 
                (error, stdout, stderr)=>{
                    if(error) reject({error, stderr});
                    if(stderr) reject(stderr);
                    resolve(stdout);
                    exec(`cd ${CodeFilesDir} && del ${filePath}`);
                });
            });

        case "js":
            return new Promise((resolve, reject)=> {
                exec(`node ${filePath}`, 
                (error, stdout, stderr)=>{
                    if(error) reject({error, stderr});
                    if(stderr) reject(stderr);
                    resolve(stdout);
                    exec(`cd ${CodeFilesDir} && del ${filePath}`);
                });
            });
    }
};

module.exports={
    executeCode
};