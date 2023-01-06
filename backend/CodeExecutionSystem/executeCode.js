const path=require('path');//js module for working with file paths 
const { spawn, exec } = require('node:child_process');

const CodeFilesDir=path.join(__dirname,"CodeFiles");//__dirname gives path of this generateCodeFile file 

const executeCode = async (language, filePath, inputs)=>{
    const fileName=path.basename(filePath).split(".")[0];//basename gives the filename from file path
    const outputPath=path.join(CodeFilesDir,`${fileName}.exe`);//path for o/p file is created
    let execCmd="", delCmd="";
    switch(language){
        case 'c':
            execCmd=`gcc ${filePath} -o ${outputPath} && cd ${CodeFilesDir} && ${fileName}.exe`;
            delCmd=`cd ${CodeFilesDir} && del ${filePath} ${outputPath}`;
            break;
        
        case 'cpp':
            execCmd=`g++ ${filePath} -o ${outputPath} && cd ${CodeFilesDir} && ${fileName}.exe`;
            delCmd=`cd ${CodeFilesDir} && del ${filePath} ${outputPath}`;
            break;
        
        case 'java':
            execCmd=`java ${filePath}`;
            delCmd=`cd ${CodeFilesDir} && del ${filePath}`;
            break;

        case 'py':
            execCmd=`python ${filePath}`;
            delCmd=`cd ${CodeFilesDir} && del ${filePath}`;
            break;

        case 'js':
            execCmd=`node ${filePath}`;
            delCmd=`cd ${CodeFilesDir} && del ${filePath}`;
            break;
    }

    return new Promise((resolve, reject)=>{
        const sysShell= spawn(`${execCmd}`,{
            shell:true,
        });
        const timeout = setTimeout(() => {
            resolve('Error: Timed Out. Your code took too long to execute, over 15 seconds.');
          }, 15 * 1000);
        
        let output="", errorMsg="";

        if (inputs) {
            sysShell.stdin.write(inputs);
            sysShell.stdin.end();
          }
        
        sysShell.stdout.on(`data`,(data)=>{
            output+=data.toString();
        });
        
        sysShell.stderr.on(`data`,(data)=>{
            errorMsg+=data.toString();
        });
        
        sysShell.on(`error`, (error)=>{
            reject(`error: ${error}`);
        })
        
        sysShell.on(`exit`, ()=>{
            if(output) resolve(output);
            if(errorMsg) resolve(errorMsg.replaceAll(filePath, "In Code"));
            if(delCmd) exec(delCmd);
            clearTimeout(timeout);
        });
    });
};

module.exports={
    executeCode
};