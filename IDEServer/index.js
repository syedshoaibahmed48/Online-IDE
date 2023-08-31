const express = require('express');
const app = express();
const server = require('http').Server(app);
const dotenv=require('dotenv');
dotenv.config({path: './.env'});
const PORT  = process.env.PORT;
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:'+PORT, methods: ['GET', 'POST']}});
const mongoose = require('mongoose');
const User = require('./models/user');
const Project = require('./models/project');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const { addUserToRoom, removeUserFromRoom, getRoomId, getName } = require('./CollaborativeEditingSystem/roomOperations');
const { formatName } = require('./CollaborativeEditingSystem/utils');
const { signToken, verifyToken } = require('./AuthSystem/JWTOperations');

mongoose.connect(process.env.DATABASE, (err) => {
    if (err) console.error(err);
    else console.log("Successfully connected to the Database");
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { // test server
    res.send('Server is running');
});


app.post('/auth/signup', async (req, res) => { // signup
    const { username, email, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        const token = signToken(user._id, username);
        res.json({ success: true, token });
        console.log("User created with name: " + username + " and email: " + email );
    } catch(err) {
        res.json({ success: false, error: err.code === 11000 ? err.keyValue.username ? "Username already exists" : "Email already exists" : "Error creating user" });
    }
});

app.post('/auth/signin', async (req, res) => {  // signin
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(user && await bcrypt.compare(password, user.password)) {
        const token = signToken(user._id, user.username);
        res.json({ success: true, token } );
    } else {
        res.json({ success: false, error: "Invalid username or password" });
    }
});

app.get('/user-details', async (req, res) => { // get user details
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    if(decoded) {
        const { userid, username } = decoded;
        const user = await User.findOne({ userid, username });
        res.json({ success: true, user:{
            userid,
            username: user.username,
            email: user.email,
            projects: user.projects,
        } });
    } else {
        res.json({ success: false, error: "Invalid token" });
    }
});

app.post('/new-project', async (req, res) => { // create new project

    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    const { userid, username } = decoded;
    const { name, language } = req.body;
    const project = await Project.create({ name, language, collaborators: { [userid]: username } });
    const projectId = project._id;
    await User.updateOne({ userid, username }, { $set: { [`projects.${projectId}`]: { name, language } } });
    console.log("Project created with name: " + name + " for user: " + userid);
    res.json({ success: true, projectId });
});

app.get('/project-details', async (req, res) => { // get project details
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    const { userid, username } = decoded;
    const { projectId } = req.query;
    const project = await Project.findById(projectId);

    if(!project){// check if project exists
        res.json({ success: false, error: "Project not found" });
        return;
    }

    if(!project.collaborators.has(userid)) { // check if user has access to project
        res.json({ success: false, error: "You dont have access to this project" });
    } else {
        res.json({ success: true, project });
    }
});

app.post('/project-save', async (req, res) => { // save project
    const { projectId, code } = req.body;
    const project = await Project.findById(projectId);
    project.code = code;
    await project.save();
    res.json({ success: true });
}); 

app.post('/project-delete', async (req, res) => { // delete project
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    const { userid, username } = decoded;
    const { projectId } = req.body;
    const project = await Project.findById(projectId);

    // delete project from user 
    await User.updateOne({ userid, username }, { $unset: { [`projects.${projectId}`]: "" } });

    if(project.collaborators.size === 1) {// delete project if no collaborators, else remove user from collaborators
        await project.delete();
    } else {
        await Project.updateOne({ $unset: { [`collaborators.${userid}`]: "" } });
    }

    res.json({ success: true });
});

const rooms = new Map(); // map of rooms with roomId as key and users, language and code as value  

io.on('connection', (socket) => {

    console.log(`[${socket.id}] Connected`);

    socket.on('join-room', async ({ roomId, name, language, action }, callback) => {
        if(action === 'join' && !rooms.has(roomId)) {
            callback({ success: false, message: 'Room does not exist' });
            return;
        } 
        console.log(`[${socket.id}] ${action}s room [${roomId}]`);
        name = formatName(name); 
        addUserToRoom(rooms, roomId, name, socket.id, language);
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', { name, connectedUsers: rooms.get(roomId).users });
        callback({ 
            success: true ,
            name,
            language : rooms.get(roomId).language,
            connectedUsers: rooms.get(roomId).users, 
            code: rooms.get(roomId).code 
         });
    });

    socket.on('open-project', async ({ projectId, token }, callback) => {
        const decoded = verifyToken(token);
        const { userid, username } = decoded;
        const project = await Project.findById(projectId)
            .then(project => project).catch(err => null);
        if(!project) {
            console.log(projectId)
            callback({ success: false, error: "Project not found" });
            return;
        } else if(!project.collaborators.has(userid)) {
            await Project.updateOne({ _id: projectId }, { $set: { [`collaborators.${userid}`]: username } });
            await User.updateOne({ userid, username }, { $set: { [`projects.${projectId}`]: { name: project.name, language: project.language } } });
        }
        const code = rooms.has(projectId) ? rooms.get(projectId).code : project.code;
        addUserToRoom(rooms, projectId, username, socket.id, project.language);
        rooms.get(projectId).code = code;
        socket.join(projectId);
        socket.to(projectId).emit('user-connected', { name: username, connectedUsers: rooms.get(projectId).users, collaborators: project.collaborators });
        callback({
            success: true,
            project,
            connectedUsers: rooms.get(projectId).users,
            collaborators: project.collaborators,
            code
        });
    });

    socket.on('code-change', ({ code, line, ch }) => {
        const roomId = getRoomId(rooms, socket.id);
        rooms.get(roomId).code = code;
        const remoteCursorPos = {line, ch}
        const userName = getName(rooms, socket.id);
        socket.to(roomId).emit('sync-code', { userName, code, remoteCursorPos });
    });

    socket.on('leave-room', ({ roomId, name }) => {
        console.log(`[${socket.id}] Left room [${roomId}]`);
        socket.leave(roomId);
        removeUserFromRoom(rooms, roomId, socket.id);
        if(rooms.get(roomId) !== undefined)  if(rooms.get(roomId).users.size !== 0) socket.to(roomId).emit('user-disconnected', { name, connectedUsers: rooms.get(roomId).users });
    });

    socket.on('disconnect', () => {
        const roomId = getRoomId(rooms, socket.id);
        if(roomId) {
            const name = getName(rooms, socket.id);
            removeUserFromRoom(rooms, roomId, socket.id);
            if(rooms.get(roomId) !== undefined) socket.to(roomId).emit('user-disconnected', { name, connectedUsers: rooms.get(roomId).users});
        }
        console.log(`[${socket.id}] Disconnected`);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});