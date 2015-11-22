var express = require('express');
var app=express();
// 保存当前的连接对象
var connections=[];

// 测试socket
var title="计算机科学";


app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));


var server= app.listen(3000,function () {
  console.log("App is running at http://0.0.0.0:3000");
});
var io=require('socket.io').listen(server);
io.sockets.on('connection',function (socket) {
  socket.once("disconnect",function () {
    connections.splice(connections.indexOf(socket),1);
    console.log("Client"+socket.id+"Left");
    console.log("%s remaining in this room",connections.length);
  });
  socket.emit("welcome",{
    title:title
  });
  connections.push(socket);
  console.log("Connection :"+socket.id);

});
