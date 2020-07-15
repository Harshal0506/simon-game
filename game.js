//alert("hello");
var start=false;
var level=0;
var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
function nextSequence(){
	
level+=1;
$("h1").text("Level "+ level);
var randomNumber=Math.floor(Math.random()*4);
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
 
}

$(".btn").click(function handler(){
	if (start){
	var userChoosenColour=$(this).attr("id");
	userClickedPattern.push(userChoosenColour);
	playSound(userChoosenColour);
	animatePress(userChoosenColour);
	checkAnswer(userClickedPattern.length-1);
}
})

function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
 	audio.play();
}

function animatePress(currentColour){
	$("#"+currentColour).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColour).removeClass("pressed");
	},100);
};

$(document).keypress(function(){
	if(!start){
		nextSequence();
		start=true;

	}
});
function checkAnswer(currentLevel){
	if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
		console.log("success");
	}else{
		var wrong = new Audio("sounds/wrong.mp3");
		wrong.play();
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		},500);
		startOver();
	}
	if (currentLevel==gamePattern.length-1){
		userClickedPattern=[];
		setTimeout(nextSequence,1000);


	}
}

function startOver(){
 	level=0;
 	gamePattern=[];
 	userClickedPattern=[];
 	$("h1").text("Try Again Champ ");
 	
 	setTimeout(function(){
 		$("h1").text("Press A Key to Start");
 	},500);
 	start=false;
}