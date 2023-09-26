let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let toggle = true;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeTo(100, 0.3, function () {$(this).fadeTo(500, 1.0); });
    playSound(randomChosenColour);
    
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern = []
};

$(".btn").on("click", function() {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

function checkAnswer(curr){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if(userClickedPattern[curr]==gamePattern[curr]){
        console.log("success");
        playSound(userClickedPattern[curr]);
        if(curr==gamePattern.length-1){
            setTimeout(function(){

                nextSequence();
            },1000)
        }
    }else{
        playSound("wrong");
        console.log("wrong");
        $("#level-title").text("Total Score: "+level);

        setTimeout(function(){

            location.reload(true);
        },3000);
    }
}

$(document).on("keypress click",function(){
    if(toggle===true){
        toggle = false;
        setTimeout(function(){

            nextSequence();
        },1000);
    }
});