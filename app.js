
function Question(text,choices,answer) { 
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}
var q1= new Question("En çok kullanılan programlama dili hangisidir?",["C#","Javascrip","Python","Asp.net"],"Javascrip");
var q2= new Question("HTML bir programlama dilidir?",["Evet","Hayır",'*'],"Hayır");
var q3= new Question("Datetime objesinin default değeri hangisidir?",["10.10.1000","01.01.0000","01.01.0001"],"01.01.0001");

var questions= [q1,q2,q3];

/// prototype
Question.prototype.checkAnwer= function (answer) { 
    return this.answer===answer;
}

///Quiz Constructor
function Quiz(questions) {
    this.questions=questions;
    this.score=0;
    this.questionIndex=0;
}

//sorumu aldım
Quiz.prototype.GetQuestion=function () {
    return this.questions[this.questionIndex];
}

//Quiz sonu
Quiz.prototype.finis=function () {
    return this.questions.length===this.questionIndex;
}

Quiz.prototype.guess=function (answer) {
    var questions= this.GetQuestion();
    if(questions.checkAnwer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

var quiz= new Quiz(questions);

loaqQuestion();
showProgress();
function loaqQuestion() {
    
if(quiz.finis()){
    showScore();
}
    else{

    var soru=quiz.GetQuestion();
    var choices=soru.choices;
    document.querySelector('#question').textContent=soru.text; 

    for (let i = 0; i < choices.length; i++) {

       var element= document.querySelector('#choice'+i);
       element.innerHTML=choices[i]; 
       guess('btn'+i,choices[i]);
        }
    }
}

function guess(id,guess) {
    var btn= document.getElementById(id);
    btn.onclick=function () {
        quiz.guess(guess);
        loaqQuestion();
        showProgress ();
    }
}


function showScore() {
    var html = `<h2>Score</h2> <h4>${quiz.score}</h4> `
    document.querySelector('.card-body').innerHTML=html;
}

function showProgress() {
    var soruSayisi= quiz.questions.length;
    var olduguSoru= quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML='Soru: '+`<b>${olduguSoru}</b>`+ ' Kalan Sor Sayısı: '+ `<b>${soruSayisi}</b>`;
}