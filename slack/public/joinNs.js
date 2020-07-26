function joinNs(endpoint) {
  if (nsSocket) {
    nsSocket.close();
    document
      .querySelector("#user-input")
      .removeEventListener("submit", formSubmission);
  }
  nsSocket = io(`http://localhost:3000${endpoint}`);
  nsSocket.on("nsRoomLoad", (rooms) => {
    const roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    rooms.forEach((room) => {
      let glyph;
      if (room.privateRoom) {
        glyph = "lock";
      } else {
        glyph = "globe";
      }
      roomList.innerHTML += `<li class="room" ><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
      // add click listener to each element
      const roomNodes = document.getElementsByClassName("room");
      Array.from(roomNodes).forEach((el) => {
        el.addEventListener("click", (element) => {
          const roomName = element.target.innerText;
          joinRoom(roomName);
        });
      });
      const topRoom = document.querySelector(".room");
      const topRoomName = topRoom.innerText;
      joinRoom(topRoomName);
    });
  });
  nsSocket.on("messageToCliens", (msg) => {
    const newMsg = buildHTML(msg);
    document.querySelector("#messages").innerHTML += newMsg;
  });
  document
    .querySelector(".message-form")
    .addEventListener("submit", formSubmission);
}
function formSubmission(event) {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  nsSocket.emit("newMessageToServer", { text: newMessage });
}

function buildHTML(msg) {
  const convertedDate = new Date(msg.time).toLocaleString();
  const newHTML = `<li>
  <div class="user-image">
    <img src="${msg.avatar}" />
  </div>
  <div class="user-message">
    <div class="user-name-time">${msg.username}<span>${convertedDate}</span></div>
    <div class="message-text">${msg.text}</div>
  </div>
</li>`;
  return newHTML;
}
