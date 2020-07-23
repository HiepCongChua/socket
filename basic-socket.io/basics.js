const http = require("http")
const socketio = require("socket.io")
const server = http.createServer((req, res) => {
  // Tao sever HTTP
  res.end("I am connected!")
})
const io = socketio(server) // Attachment socker server to http
io.on("connection", (socket, req) => {
  socket.emit("welcome", "Welcome to the websocket server!")
  socket.on("message", (msg) => {
    console.log("OKKOKo")
    msg("abc")
    // console.log(msg)
  })
})
server.listen(8080)
