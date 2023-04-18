const isNewRoom = (rooms, roomId) => {
    return !rooms.has(roomId);
}

const addUserToRoom = (rooms, roomId, name, socketId, language) => { // add user to room
    const room = isNewRoom(rooms, roomId) ? {users:[], language, code:''} : rooms.get(roomId);
    room.users.push({name, socketId});
    rooms.set(roomId, room);
}

const removeUserFromRoom = (rooms, roomId, socketId) => { // remove user from room and delete room if no users left
    const room = rooms.get(roomId);
    room.users = room.users.filter(user => user.socketId !== socketId);
    room.users.length === 0 ? rooms.delete(roomId) : rooms.set(roomId, room);
}

const getRoomId = (rooms, socketId) => { // returns roomId of the socketId if exists
    let roomId = null;
    rooms.forEach((room, Id) => {
      if (room.users.some(user => user.socketId === socketId)) {
        roomId = Id;
        return;
      }
    });
    return roomId;
}

const getName = (rooms, socketId) => { // returns name of the socketId 
    let name = null;
    rooms.forEach((room, Id) => {
        if (room.users.some(user => user.socketId === socketId)) {
            name = room.users.find(user => user.socketId === socketId).name;
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