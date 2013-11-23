var profIO = require('socket.io').listen(8080);
var elvIO = require("socket.io").listen(8081);

profIO.sockets.on("connection", function(socket){
    console.log("Prof Connection");

    socket.on("new_question", function(data){
        console.log(arguments);
    });
});

elvIO.sockets.on("connection", function(socket){
    console.log("Eleve Connection");

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



