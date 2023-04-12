const express = require('express');
const app = express();
const server = require('http').Server(app);
const dotenv=require('dotenv');
dotenv.config({path: './.env'});
const PORT  = process.env.PORT;
const io = require('socket.io')(server, 
    {cors: {
        origin: 'http://localhost:' + PORT, // Client URL
        methods: ['GET', 'POST']
    }
});

const rooms = new Map();

const addUserToRoom = (roomid, name, socketId, language) => {
    const room = rooms.has(roomid) ? rooms.get(roomid) : {users:[], language, code:''};// language is set only once
    room.users.push({ name, socketId });
    rooms.set(roomid, room);
}

const removeUserFromRoom = (socket, roomid,name, socketId) => {
    const room = rooms.get(roomid);
    room.users = room.users.filter(user => user.socketId !== socketId);
    rooms.set(roomid, room)
    if (room.users.length === 0) rooms.delete(roomid);
    socket.to(roomid).emit('user-disconnected', { name, socketId});
}

const getRoomId = (socketId) => { // returns roomid of the socketId if exists
    let roomId = null;
    rooms.forEach((room, id) => {
      if (room.users.some(user => user.socketId === socketId)) {
        roomId = id;
        return;
      }
    });
    return roomId;
}

const formatName = (name) => { // format name to initials if name is too long
    if (name.length < 18) return name;
    const names = name.split(" ");
    return names.map((word) => word[0].toUpperCase()).join(".");
};
        

io.on('connection', (socket) => {

    console.log(`[${socket.id}] Connected`);

    socket.on('join-room', ({ roomid, name, language, action }, callback) => {
        if(action === 'join' && !rooms.has(roomid)) {
            callback({ success: false, message: 'Room does not exist' });
            return;
        }
        console.log(`[${socket.id}] ${action}s room [${roomid}]`);
        socket.join(roomid);
        name = formatName(name); 
        addUserToRoom(roomid, name, socket.id, language);
        socket.to(roomid).emit('user-connected', { name, socketId: socket.id });
        callback({ success: true ,
                   name,
                   language : rooms.get(roomid).language,
                   connectedUsers: rooms.get(roomid).users, 
                   code: rooms.get(roomid).code });
    });

    socket.on('code-change', ({ code, line, ch }) => {
        const roomid = getRoomId(socket.id);
        rooms.get(roomid).code = code;
        const remoteCursorPos = {line, ch}
        const userName = rooms.get(roomid).users.find(user => user.socketId === socket.id).name;
        socket.to(roomid).emit('sync-code', { userName, code, remoteCursorPos });
    });

    socket.on('leave-room', ({ roomid, name }) => {
        console.log(`[${socket.id}] Left room [${roomid}]`);
        socket.leave(roomid);
        removeUserFromRoom(socket, roomid, name, socket.id);
    });

    socket.on('disconnect', () => {
        const roomid = getRoomId(socket.id);
        if(roomid) {
            const name = rooms.get(roomid).users.find(user => user.socketId === socket.id).name;
            removeUserFromRoom(socket, roomid, name, socket.id);
        }
        console.log(`[${socket.id}] Disconnected`);
    });

});



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});