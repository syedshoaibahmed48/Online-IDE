const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Online_IDE_DB');

const JobSchema=mongoose.Schema({
    language:{
        type:String,
        required:true,
        enum: ['c', 'cpp', 'java', 'js', 'py']
    },
    filePath:{
        type:String,
        required:true
    },
    inputs:{
        type:String,
        default:''
    },
    output:{
        type:String
    },
    submittedAt:{
        type:Date,
        default:Date.now//returns mongoDB compatible date object
    },
    startedAt:{
        type:Date
    },
    completedAt:{
        type:Date
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending', 'success']
    }
});

const Job=mongoose.model('Job', JobSchema);//Job is a collection in db

module.exports=Job;