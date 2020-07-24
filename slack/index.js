const express = require("express")
const app = express()
const socket = require("socket.io")
app.use(express.static(__dirname + "/public"))
const server = app.listen(3000)
const io = socket(server)
const namespaces = require("./data/namespaces")
app.use("/", (res, req) => {
  req.send("OK")
})

io.on("connection", (socket) => {
  const nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    }
  })
  socket.emit("nsList", nsData)
})
// loop through each namespace and listen for a connection
namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (socket) => {
    console.log(`${socket.id} has join ${namespace.endpoint}`)
  })
})
