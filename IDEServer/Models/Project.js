const mongoose = require('mongoose');

const ProjectSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        enum:['c', 'cpp', 'java', 'js', 'py'],
    },
    collaborators:{//map of userids to name
        type: Map,
        of: String
    },
    createdAt:{
        type:Date,
        default:Date.now//returns mongoDB compatible date object
    },
    code:{
        type:String,
        default:""
    }
});

const Project=mongoose.model('Project', ProjectSchema);//Project is a collection in db 

module.exports=Project;