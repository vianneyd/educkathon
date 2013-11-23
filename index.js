var profIO = require('socket.io').listen(8080);
var elvIO = require("socket.io").listen(8081);

var profsSockets = [];
var elvSockets = [];

var events = ["new_question","answer","end_question","next_slide","previous_slide","goto_slide"];

var sendToElv = function(name,data){
  for(var i = 0; i < elvSockets.length; i++){
      elvSockets[i].emit(name,data);
  }
};

var sendToProf = function(name,data){
    for(var i = 0; i < elvSockets.length; i++){
        elvSockets[i].emit(name,data);
    }
};

profIO.sockets.on("connection", function(socket){
    console.log("Prof Connection");

    profsSockets.push(socket);

    socket.on("disconnect", function(){
        for(var i = 0; i < profsSockets.length; i++){
            if(profsSockets[i] == socket){
                profsSockets.splice(i,1);
                break;
            }
        }
    });
    for(var i = 0; i < events.length; i++){
        (function(i){
            socket.on(events[i], function(data){
                sendToElv(events[i],data);
            });
        })(i);
    }

});

elvIO.sockets.on("connection", function(socket){
    console.log("Eleve Connection");

    elvSockects.push(socket);

    socket.on("disconnect", function(){
        for(var i = 0; i < elvSockets.length; i++){
            if(elvSockets[i] == socket){
                elvSockets.splice(i,1);
                break;
            }
        }
    });

    for(var i = 0; i < events.length; i++){
        (function(i){
            socket.on(events[i], function(data){
                sendToProf(events[i],data);
            });
        })(i);
    }

    socket.on("test", function(){
        console.log("Testing eleve...");
        elvIO.sockets.emit("new_question",{
            type: "qcm",
            question: "Quel est le cheval blanc d'henry 4 ?",
            answers: [
                "blanc",
                "gris",
                "noir"
            ]
        });
    });
});



