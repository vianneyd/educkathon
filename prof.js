var socket = io.connect('http://localhost:8080');

var questions = [
    {
        type: "qcm",
        question: "Quel est le cheval blanc d'henry 4 ?",
        answers: [
            "blanc",
            "gris",
            "noir"
        ]
    },
    {
        type: "qcm",
        question: "Comment ça va ?",
        answers: [
            "bien",
            "bof",
            "je suis fatigué"
        ]
    }
];

var currentQuestion = null;
var currentAnswers = [];
var totalAnswers = 0;

var renderQuestion = function(id,question){
    var content = document.createElement("div");
    content.id = "question"+id;
    content.innerHTML = question.question;

    return content;
};

var questionClicked = function(e){
    e.preventDefault();

    var id = e.currentTarget.id.substr(8);
    renderCurrentQuestion(id);
};

var renderCurrentQuestion = function(id){
    var question = questions[id];
    currentQuestion = id;

    var questionDiv = document.querySelector("#currentQuestion");
    questionDiv.innerHTML = "";
    questionDiv.innerHTML += "<h2>"+question.question+"</h2>";
    questionDiv.innerHTML += "<ul><li>"+question.answers.join("</li><li>")+"</li></ul>";

    var button = document.createElement("button");
    button.dataset.question_id=id;
    button.addEventListener("click",sendQuestion);
    button.innerHTML = "Envoyer la question";

    questionDiv.appendChild(button);
};

var sendQuestion = function(e){
    var id = e.currentTarget.dataset.question_id;
    var question = questions[id];
    question.id = id;

    currentAnswers = [];
    totalAnswers = 0;

    socket.emit("new_question", question);
};

var updateAnswers = function(){
    for(var i = 0; i < questions[currentQuestion].answers.length; i++){
        console.log((currentAnswers[i]/totalAnswers));
        currentAnswers[i] = currentAnswers[i] || 0;
        var answer = document.querySelector("#currentQuestion > ul > li:nth-child("+(i+1)+")");
        answer.style.width = 100*(currentAnswers[i]/totalAnswers)+"%";
        answer.innerHTML = questions[currentQuestion].answers[i]+" - "+currentAnswers[i];
    }
};

socket.on("answer", function(data){
    currentAnswers  [data.answer] = currentAnswers[data.answer] || 0;
    currentAnswers[data.answer]++;
    totalAnswers++;
    updateAnswers();

});

var questionContainer = document.querySelector("#questions");

for(var i = 0; i < questions.length; i++){
    var questionDiv = renderQuestion(i,questions[i]);
    console.log(questionDiv);
    questionDiv.addEventListener("click",questionClicked);
    questionContainer.appendChild(questionDiv);
}




