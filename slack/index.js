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
    // console.log(namespace.endpoint);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
    nsSocket.on("joinRoom", (roomJoin, numberOfUserCallback) => {
      nsSocket.join(roomJoin);
      io.of("/wiki")
        .in(roomJoin)
        .clients((err, clients) => {
          numberOfUserCallback(clients.length);
        });
    });
    nsSocket.on("newMessageToServer", (msg) => {
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: "hieple",
        avatar: "https://picsum.photos/id/237/200/300",
      };
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      const nsRoom = namespaces[0].room.find((room) => {
        return (room.roomTitle = roomTitle);
      });
      console.log(nsRoom);
      io.of("/wiki").to(roomTitle).emit("messageToCliens", fullMsg);
    });
  });
});
