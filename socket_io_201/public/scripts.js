const socket = io('http://localhost:3000');
const socketAdmin = io('http://localhost:3000/admin')
console.log(socket.io);

socket.on('messageFromServer', dataFromServer => {
    console.log(dataFromServer);
    socket.emit('dataToServer', { data: "Data from the client" });
});
socket.on('connect',()=>{
    console.log("SocketId",socket.id);
  });
socketAdmin.on('connect',()=>{
  console.log("SocketId",socketAdmin.id);
});
socketAdmin.on('welcome',(data)=>{
    console.log(data);
})
socket.on('messageToClient',(data)=>{
    console.log("data from server",data);
    document.querySelector('#messages').innerHTML += `<li>
         ${data.text.text}
        </li>`
})
// socket.on('ping', () => {//Cứ sau 25s thì server sẽ bắn sự kiện ping về cho client để kiểm tra client có kết nối không 
//     console.log("Ping was recieved from the server");
//     console.log(io.protocol);
// });
// socket.on('pong', (latency) => {//sau khi client nhận được sự kiện ping thì nó emit sự kiện pong về cho server, server sẽ bắn lại cho client để xác nhân nó nhận được sự kiện pong từ client
//     console.log({ latency });
//     console.log("Pong was sent to the server");
// });
document.querySelector('#message-form').addEventListener('submit', event => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer',{text:newMessage});
});
