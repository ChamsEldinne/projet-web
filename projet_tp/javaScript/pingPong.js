let globalSpeebBallX= 6;
let globalSpeebBallY= Math.floor(Math.random() *3) +1;
let globalSpeedY=12 ;
let maxScour3;
let canvas=document.getElementById("board") ;
let context=canvas.getContext('2d') ;
let scour=document.getElementById("scour") ;
let notic=document.getElementById("notic");
let s=0 ;
let yp =150 ;
let yc=150 ;
let gameOver=false ;
let speedY=0;
let ballX=300 ;
let ballY=200 ;
let ballSpeedX=globalSpeebBallX;
let ballSpeedY=globalSpeebBallY;

if(window.localStorage.getItem("maxScour3")!=null){
    maxScour3=window.localStorage.getItem("maxScour3") ;
}else {
    window.localStorage.setItem("maxScour3",0) ;
} 

scour.innerHTML=`score :${s} | maxScour:${maxScour3}` ;

function changeDirection(e){
    if(e.code=="ArrowUp"){
       speedY=-globalSpeedY ;
    }else if(e.code=="ArrowDown"){
        speedY=globalSpeedY ;
    }
}

let time ;

window.onload=function(){
    document.addEventListener("keyup",changeDirection) ;
    time=setInterval(update,10) ;
}

function update(){
    if(gameOver){
        notic.innerHTML="game over" ;
        clearInterval(time) ;
    } 
    drawBoard();
    drawBall() ;
    drawPersonBar();
    drawCoputerBar() ;
    changeBallDirection() ;
}

function drawBall(){
    context.beginPath() ;
    context.fillStyle='#0f0' ;
    ballX+=ballSpeedX ;
    ballY+=ballSpeedY ;

    context.shadowColor="white";
    context.shadowBlur=10 ;
    context.shadowOffserX=1 ;
    context.shadowOffserY=1 ;
    context.arc(ballX,ballY,15,0,2*Math.PI) ;
    context.fill() ;
}

function drawBoard(){
    context.fillStyle='#222' ;
    context.shadowBlur=0 ;
    context.fillRect(0 , 0,board.width ,board.height) ;
}


function drawPersonBar(){
    if(yp>=300) speedY=-1;
    if(yp<=0) speedY=1 ;
    yp+=speedY ;
    context.fillStyle='white' ;
    context.fillRect(20,yp,20,100);
}

function drawCoputerBar(){
    while(ballY>=yc+100){
        yc++;
        context.fillRect(560,yc,20,100);
    }
    while(ballY<=yc){
        yc--;
        context.fillRect(560,yc,20,100);
    }
    context.fillRect(560,yc,20,100);
}

function changeBallDirection(){
    if(ballX<=55 && ballX>=30 && ballY<=yp+100 && ballY>=yp){
        ballSpeedX=globalSpeebBallX ;
        s+=10;
        maxScour3=Math.max(s,maxScour3) ;
        window.localStorage.setItem("maxScour3",maxScour3) ;
        scour.innerHTML=`score :${s} | maxScour:${maxScour3}` ;
    }else if(ballX<0){
       gameOver=true ;
    }else if (ballX>=545 && ballY<=yc+100 && ballY>=yc){
       ballSpeedX=-globalSpeebBallX ;  
    }else if(ballX>560){
       gameOver=true ; 
    }else if(ballY<=15){
        ballSpeedY=Math.floor(Math.random() *globalSpeebBallY) +1; 
    }else if (ballY>=380){
        ballSpeedY= -Math.floor(Math.random() *globalSpeebBallY) -1 ;
    }
}

function restart(){
    location.reload() ;
}

