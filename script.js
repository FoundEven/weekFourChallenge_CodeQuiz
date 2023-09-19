//elements that connect to my HTML
var begin = document.querySelector(".begin");
var holdQuestion = document.querySelector(".quest");
var startBt = document.querySelector("#start");
var timer = document.querySelector("#time");
var h2El = document.querySelector("#h2start");
var scoreEl = document.querySelector("#score");
var highScore = document.querySelector("#highS");
var highList = document.querySelector("#hsList");
//created elements
var button1 = document.createElement("button");
var button2 = document.createElement("button");
var button3 = document.createElement("button");
var button4 = document.createElement("button");
var list1 = document.createElement("li");

var playagain = document.createElement("button");
var aHighscore = document.createElement("button");
var scoreText = document.createElement("textarea");
var enter = document.createElement("button");

var countdow = 20;      //varible to keep track of countdown
var score = 0;          //varible to keep track of score
var holdKey = "";
var prevScore = localStorage.getItem("prevScore");
// this object is the questions and answers and correct answer
var questionEl = {
   question: ["What key word do you use to get code that loops?","What data types can be in an object?","What method do you use to get all letters in a string to lower case?","How do you get content on webpage using Javascript?","How do you connect a element that you created in Javascript to your HTML?"],   //questions
   a1: ["for","Boolean","lowerCase","word","child"],                                    //answer 1  
   a2: ["if","String","toLowerCase","text","connectChild"],                             //answer 2
   a3: ["var","Number","toUpperCase","textContent","toHTML"],                           //answer 3
   a4: ["return","All of the Above","None of the above","content","appendChild"],       //answer 4
   correct: ["for","All of the Above","toLowerCase","textContent","appendChild"]        //correct answer
};


// this function gets the questions and answers and displays them for the user to guess
function questionAndAnswer() {
        console.log(countdow);
        var randomPos = randomNum(0,4);

        h2El.textContent = questionEl["question"][randomPos];

        button1.textContent = questionEl.a1[randomPos];
        button2.textContent = questionEl.a2[randomPos];
        button3.textContent = questionEl.a3[randomPos];
        button4.textContent = questionEl.a4[randomPos];
    
        holdQuestion.addEventListener("click", function(event) {

            var btnClick = event.target.textContent;

        
            if (btnClick == questionEl.correct[randomPos]){
                score = score + 10;

            } else {
                if (countdow < 5) {
                    countdow = 0;
                } else {
                    countdow = countdow - 5;
                }
            }
        
            scoreEl.textContent = "Score: " + score;

            randomPos = randomNum(0,4);
        
            h2El.textContent = questionEl["question"][randomPos];
        
            button1.textContent = questionEl.a1[randomPos];
            button2.textContent = questionEl.a2[randomPos];
            button3.textContent = questionEl.a3[randomPos];
            button4.textContent = questionEl.a4[randomPos];
        
            console.log(btnClick);
            console.log(questionEl.correct[randomPos])
            
        })

    
    
}
//this function displays the most recent scores
highScore.addEventListener("click",function() {
    holdQuestion.appendChild(playagain);
    startBt.remove();
    highScore.remove();
    h2El.textContent = "Score!";

    highList.appendChild(list1);

    var p1 = localStorage.getItem("highscore1");


    list1.textContent = p1;

    playagain.textContent = "Back";
})
//thsi function allows the user to add their name and score to score borad
aHighscore.addEventListener("click", function(){
    playagain.remove();
    aHighscore.remove();

    h2El.textContent = "Please enter in your name.";
    holdQuestion.appendChild(scoreText);

    scoreText.addEventListener("keydown", function(event){
        var key = event.key;

        holdKey += key;

    })
    holdQuestion.appendChild(enter);
    enter.textContent = "Enter";
    enter.addEventListener("click", function(){
        enter.remove();
        scoreText.remove();
        finalScore = holdKey + "-" + score;
        console.log(finalScore);


        if (score >= prevScore){
        list1 = finalScore;

        localStorage.setItem("highscore1",list1);
        localStorage.setItem("prevScore", score);
        }


        holdQuestion.appendChild(highScore);
        highScore.textContent = "Score Board";
       
    })
})

//this function activates the timer and stops the user from playing when time runs out.
function activateTimer() {


    var changeTime = setInterval( function() {
        countdow--;
        timer.textContent = countdow;

        if (countdow <= 0) {
            clearInterval(changeTime);

            button1.remove();
            button2.remove();
            button3.remove();
            button4.remove();
    
            h2El.textContent = "Would you like to enter in your new score or play again?";

            holdQuestion.appendChild(playagain);
            playagain.textContent = "Play Again";
            console.log(countdow);
            holdQuestion.appendChild(aHighscore);
            aHighscore.textContent = "Add your score!";
        }
    } , 1000)
}
//this function gets a random number
function randomNum(x,y){
    min = Math.ceil(x);
    max = Math.floor(y);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//this function reloads the pag so you can play again
playagain.addEventListener("click", function(){
    location.reload();
})

//this event listener will start when the start button is pressed
startBt.addEventListener("click", function(){
    //reset score and countdown
    countdow = 20;
    score = 0;
    console.log(countdow);
    // remove any elements that due not need to be hear
    startBt.remove();
    aHighscore.remove();
    list1.remove();

    // adds answer buttons
    holdQuestion.appendChild(button1);
    holdQuestion.appendChild(button2);
    holdQuestion.appendChild(button3);
    holdQuestion.appendChild(button4);
  
    activateTimer();
    questionAndAnswer();
})
// we have it start out as the ready to start and start button
// when user clicks button, than we change h2 to say question and add 4 more buttons and start a timer
// if user clicks wrong button then timer gets set amount decrease
// once clock runs out we change h2 to say score and give them option to add score and name to highscore or play again
//highscore is saved in local memory
