const express = require("express");
const app = express();
const socket = require("socket.io");
app.use(express.static(__dirname + "/public"));
const server = app.listen(3000);
const io = socket(server);
const namespaces = require("./data/namespaces");
app.use("/", (res, req) => {
  req.send("OK");
});

io.on("connection", (socket) => {
  const nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    };
  });
  socket.emit("nsList", nsData);
});
// loop through each namespace and listen for a connection
namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (nsSocket) => {
    const username = nsSocket.handshake.query.username;
    nsSocket.emit("nsRoomLoad", namespace.rooms);
    // Handle join room
    nsSocket.on("joinRoom", (roomJoin, numberOfUserCallback) => {
      const roomToLeave = Object.keys(nsSocket.rooms)[1];
      updateUsersInRoom(namespace, roomToLeave);
      nsSocket.leave(roomToLeave);
      nsSocket.join(roomJoin);
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomJoin;
      });
      nsSocket.emit("historyCatchUp", nsRoom.history);
      //send back the number of user in this room to all socket connected this room
      updateUsersInRoom(namespace, roomJoin);
    });
    // Handle send message
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username,
        avatar: "https://picsum.photos/id/237/200/300",
      };
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      const nsRoom = namespace.rooms.find((room) => {
        return (room.roomTitle = roomTitle);
      });
      nsRoom.addMessage(fullMsg);
      io.of(namespace.endpoint).to(roomTitle).emit("messageToCliens", fullMsg);
    });
  });
});

function updateUsersInRoom(namespace, roomJoin) {
  io.of(namespace.endpoint)
    .to(roomJoin)
    .clients((err, clients) => {
      io.of(namespace.endpoint)
        .in(roomJoin)
        .emit("updateMembers", clients.length);
    });
}
