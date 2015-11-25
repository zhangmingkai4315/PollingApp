var express = require('express');
var _ = require('underscore');
var app = express();
var currentQuestion=false;

var results={
  a:0,
  b:0,
  c:0,
  d:0
};


// 保存当前的连接对象
var connections = [];
var audience = [];
var speaker = {};


// Q&A
var questions=require('./app-questions');

// 测试socket
var title = "暂无主题";
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));


var server = app.listen(3000, function() {
    console.log("App is running at http://0.0.0.0:3000");
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    socket.once("disconnect", function() {

        //remove disconnected member
        var member = _.findWhere(audience, {
            id: this.id
        });
        if (member) {
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit('audience', audience);
            console.log("One audience left this room:" + member.name);
        } else if(this.id === speaker.id){
            console.log('%s has left .%s is over',speaker.name,title);
            speaker={};
            title="Untitled";
            io.sockets.emit('end',{title:title,speaker:''});
        }


        connections.splice(connections.indexOf(socket), 1);
        console.log("Client" + socket.id + "Left");
        console.log("%s remaining in this room", connections.length);
    });
    socket.emit("welcome", {
        title: title,
        audience: audience,
        speaker: speaker,
        questions:questions,
        currentQuestion:currentQuestion,
        results:results
    });
    socket.on('join', function(data) {
        var newMember = {
            id: this.id,
            name: data.name,
            type: data.type
        };
        this.emit('joined', newMember);
        audience.push(newMember);
        io.sockets.emit('audience', audience); //broadcast audience event to all audiences.
        console.log("Join number:" + data.name);
    });
    socket.on('start', function(payload) {
        speaker.name = payload.name;
        speaker.id = this.id;
        title = payload.title;
        speaker.title = title;
        speaker.type = "speaker",
            this.emit('joined', speaker);
        io.sockets.emit("start", {
            title: title,
            speaker: speaker
        });
        console.log("Presentation Started:%s by %s", title, speaker.name);
    });

    socket.on("ask",function (question) {
      currentQuestion=question;
      results={a:0,b:0,c:0,d:0};
      io.sockets.emit('ask',currentQuestion);
      console.log("Ask :"+currentQuestion);
    });

    socket.on('answer',function (payload) {
      results[payload.choice]++;
      io.sockets.emit('results',results);
      console.log("Answer:'%s' -'%j'",payload.choice,results);
    })

    connections.push(socket);
    console.log("Connection :" + socket.id);
});
