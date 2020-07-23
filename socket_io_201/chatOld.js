const express = require('express');
const app = express();
const socket = require('socket.io');
app.use(express.static(__dirname+'/public'));
const server = app.listen(3000);
const io = socket(server);
app.use('/',(res,req)=>{
  req.send("OK")
});
//Main namespace
io.on('connection',(socket)=>{
     socket.emit('messageFromServer',`Day la data tu server ${Date.now()}`);   
    socket.on('dataToServer',dataFromClient=>{
    });
    socket.on('newMessageToServer',(data)=>{
       console.log(data);
       io.emit('messageToClient',{text:data});
    });
    // setTimeout(() => {
      io.of('/admin').emit('welcome','Welcome to the admin channel in to the main chanel!');
    // },200);
    
});


//Custom namespace
io.of('/admin').on('connection',socket=>{
 console.log("Someont connected to the admin namespace!");
 io.of('/admin').emit('welcome','Welcome to the admin channel!');
});