function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"></span
    ></span>`;
  });
  nsSocket.on("historyCatchUp", (history) => {
    const messageUl = document.querySelector("#messages");
    messageUl.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = buildHTML(msg);
      const currentMessages = messageUl.innerHTML;
      messageUl.innerHTML = currentMessages + newMsg;
    });
    messageUl.scrollTo(0, messageUl.scrollHeight);
  });
  nsSocket.on("updateMembers", (numberMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `<span class="glyphicon glyphicon-user">${numberMembers}</span
    >`;
    document.querySelector(
      ".curr-room-text"
    ).innerHTML = `<span class="curr-room-text">${roomName}</span>`;
  });
  const searchBox = document.querySelector("#search-box");
  searchBox.addEventListener("input", (e) => {
    const messages = Array.from(
      document.getElementsByClassName("message-text")
    );
    messages.forEach((msg) => {
      if (
        msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1
      ) {
        msg.style.display = "none";
      } else {
        msg.style.display = "block";
      }
    });
  });
}
