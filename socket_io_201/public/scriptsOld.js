const socket = io("http://localhost:3000")
const socketAdmin = io("http://localhost:3000/admin")
socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer)
  socket.emit("dataToServer", { data: "Data from the client" })
})
socket.on("connect", () => {
  console.log("SocketId", socket.id)
})
socketAdmin.on("connect", () => {
  console.log("SocketId", socketAdmin.id)
})
socketAdmin.on("welcome", (data) => {
  console.log(data)
})
socket.on("messageToClient", (data) => {
  console.log("data from server", data)
  document.querySelector("#messages").innerHTML += `<li>
         ${data.text.text}
        </li>`
})
document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault()
  const newMessage = document.querySelector("#user-message").value
  socket.emit("newMessageToServer", { text: newMessage })
})
