var profIO = require('socket.io').listen(8080);
var elvIO = require("socket.io").listen(8081);

profIO.sockets.on("connection", function(socket){
    console.log("Prof Connection");

    socket.on("new_question", function(data){
        console.log(arguments);
        for(var i = 0; i < 100; i++){
            setTimeout(function(){
                socket.emit("answer",{
                    question_id: data.id,
                    answer: Math.floor(Math.random()*data.answers.length)
                });
            }, 1000);
        }
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



