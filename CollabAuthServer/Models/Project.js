const mongoose = require('mongoose');

const ProjectSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    isCollaborative:{
        type:Boolean,
        required:true
    },
    collaborators:{
        type:[String],
        default:[]
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