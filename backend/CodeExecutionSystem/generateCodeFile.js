const fs=require('fs');//js module for working with files
const path=require('path');//js module for working with file paths 
const {v4: uuid}=require('uuid');

const CodeFilesDir=path.join(__dirname,"CodeFiles");//__dirname gives path of this generateCodeFile file 

if(!fs.existsSync(CodeFilesDir)){//to create CodeFile folder if its not present
    fs.mkdirSync(CodeFilesDir,{recursive:true});
}

const generateCodeFile= async (language, code)=>{
    const jobId=uuid();
    const fileName=`${jobId}.${language}`;
    const filePath=path.join(CodeFilesDir,fileName);//file path for code file is created
    await fs.writeFileSync(filePath,code);//file is writtenin above created filepath
    return filePath;
};

module.exports={
    generateCodeFile
};