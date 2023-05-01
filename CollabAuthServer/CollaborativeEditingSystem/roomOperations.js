const isNewRoom = (rooms, roomId) => {
    return !rooms.has(roomId);
}

const addUserToRoom = (rooms, roomId, name, socketId, language) => { // add user to room
    const room = isNewRoom(rooms, roomId) ? {users:{}, language, code:''} : rooms.get(roomId);
    room.users[socketId] = name;
    rooms.set(roomId, room);
    console.log(room)
}

const removeUserFromRoom = (rooms, roomId, socketId) => { // remove user from room and delete room if no users left
    const room = rooms.get(roomId);
    if(!room) return;
    delete room.users[socketId];
    if (Object.keys(room.users).length === 0) rooms.delete(roomId);
    console.log(rooms)
}

const getRoomId = (rooms, socketId) => { // returns roomId of the socketId if exists
    let roomId = null;
    rooms.forEach((room, Id) => {
        if (Object.keys(room.users).includes(socketId)) {
            roomId = Id;
            return;
        }
    });
    return roomId;
}

const getName = (rooms, socketId) => { // returns name of the socketId 
    let name = null;
    rooms.forEach((room, Id) => {
        if (Object.keys(room.users).includes(socketId)) {
            name = room.users[socketId];
            return;
        }
    });
    return name || 'Anonymous';
}

module.exports = {
    addUserToRoom,
    removeUserFromRoom,
    getRoomId,
    getName,
}