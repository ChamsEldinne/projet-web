let blockSize = 25;
let total_row = 20; 
let total_col = 25; 
let board;
let context;
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let speedX = 0; 
let speedY = 0;
let snakeBody = [];
let foodX;
let foodY;
let gameOver = false;
let scour=0 ;
let scoure=document.getElementById("scoure") ;
let maxScour;
if(window.localStorage.getItem("maxSour2")!=null){
	 maxScour=window.localStorage.getItem("maxScour") ;
}else {
	 window.localStorage.setItem("maxScour",0) ;
} 


let divmaxScour=document.getElementById("maxScour")
let notic=document.getElementById("notic") ;


window.onload = function () {
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

	placeFood();
	document.addEventListener("keyup", changeDirection); 
	setInterval(update, 1000/10);
}

function update() {
	if (gameOver) {
		return;
	}
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context.fillStyle = "#222";
	context.fillRect(0, 0, 	board.width  , board.height);
	context.fillStyle = "#0f0";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		scour+=20 ;
		maxScour=Math.max(maxScour,scour) ;
		window.localStorage.setItem("maxScour",maxScour) ;
		placeFood();
	}

	for (let i = snakeBody.length-1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}
     context.strokeStyle="black" ;
	context.fillStyle = "white";
	snakeX += speedX * blockSize; 
	snakeY += speedY * blockSize; 
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	context.strokeRect(snakeX, snakeY, blockSize, blockSize) ;
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
		context.strokeRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

	if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) { 	
		gameOver = true;
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 			
			gameOver = true;
		}
	}
	if(gameOver) notic.innerHTML="you are loser" ;
}

function changeDirection(e) {
	if (e.code == "ArrowUp" && speedY != 1) { 
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		speedX = -1;
		speedY = 0;
	}
	else if ( e.code== "ArrowRight" && speedX != -1) { 
		speedX = 1;
		speedY = 0;
	}
	scoure.innerHTML=`curent scoure: ${scour}` ;
    divmaxScour.innerHTML=`Max Scour :${maxScour}` ;
}

function placeFood() {
	foodX = Math.floor(Math.random() * total_col) * blockSize; 
	foodY = Math.floor(Math.random() * total_row) * blockSize; 
}

function resetScour(){
	window.localStorage.setItem("maxScour",0) ;
	divmaxScour.innerHTML=`Max Scour :${maxScour}` ;
}

function restart(){
	location.reload() ;
}
