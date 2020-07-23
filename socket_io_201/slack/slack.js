const express = require("express")
const app = express()
const socket = require("socket.io")
app.use(express.static(__dirname + "/public"))
const server = app.listen(3000)
const io = socket(server)
app.use("/", (res, req) => {
  req.send("OK")
})
io.on("connection", (socket) => {
  socket.emit("messageFromServer", `Day la data tu server ${Date.now()}`)
  socket.on("dataToServer", (dataFromClient) => {})
  socket.on("newMessageToServer", (data) => {
    io.emit("messageToClient", { text: data })
  })
  socket.join("level1", () => console.log("ok"))
  socket //socket.to gui den tat ca socket join vao phong ngoai tru socket gui di
    .to("level1")
    .emit("joined", `${socket.id} have joined the level 1 rooom!`)
})

//Custom namespace
io.of("/admin").on("connection", (socket) => {
  console.log("Someont connected to the admin namespace!")
  io.of("/admin").emit("welcome", "Welcome to the admin channel!")
})
