// const namespaces = require("../data/namespaces")

const socket = io("http://localhost:3000")
const socketWiki = io("http://localhost:3000/wiki")
const socketLinux = io("http://localhost:3000/linux")
const socketMozilla = io("http://localhost:3000/mozilla")
socket.on("connect", () => {
  console.log(socket)
  // console.log("SocketId", socket.id)
})
socketWiki.on("connect", () => {
  console.log("SocketId", socketWiki.id)
})
socketLinux.on("connect", () => {
  console.log("SocketId", socketLinux.id)
})
socketMozilla.on("connect", () => {
  console.log("SocketId", socketMozilla.id)
})
socket.on("nsList", (nsData) => {
  let namespacesDiv = document.querySelector(".namespaces")
  namespacesDiv.innerHTML = ""
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}" /></div>`
  })
  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      element.addEventListener("click", (el) => {
        const nsEndpoint = element.getAttribute("ns")
        console.log(`${nsEndpoint} i should go to now`)
      })
    }
  )
})
