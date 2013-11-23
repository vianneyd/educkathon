var profIO = require('socket.io').listen(8080);
var elvIO = require("socket.io").listen(8081);

profIO.sockets.on("connection", function(socket){
    console.log("Prof Connection");
});

elvIO.sockets.on("connection", function(){
    console.log("Eleve Connection");
});

elvIO.sockets.on("test", function(){
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


