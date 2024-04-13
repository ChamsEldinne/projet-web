let matrix=[] ;
let container=document.getElementById("container") ;
let scour =0 ;
let s=document.getElementById("scoure") ;
let set=new Set() ;
let maxScour=0 ;
if(window.localStorage.getItem("maxSour2")!=null){
   maxScour=window.localStorage.getItem("maxSour2") ;
}else {
    window.localStorage.setItem("maxSour2",0) ;
} 


for(let i=0 ; i<9 ;i++){
  let tab=[] ;
    for(let j= 0 ;j<9 ;j++){
      let input=document.createElement("input") ;
      input.type="text" ;
      input.style.cssText="" ;
      input.className="sells" ;
      input.id=`${i}${j}`
      tab.push(input) ;
      container.appendChild(tab[j]) ;
    }
   matrix.push(tab) ;
}

window.addEventListener("keyup",function(event){

        
    if(event.target.id.length==2 && (event.target.value.length >=2 || isNaN(Number(event.target.value)) || Number(event.target.value) <=0) ){
        event.target.value="" ;
    }else{
      let i=event.target.id.charAt(0) ;
      let j=event.target.id.charAt(1) ;
      if(!isValidSudoku1(matrix,Number(i),Number(j),event.target.value) ){
       event.target.style.cssText="animation: eror 0.3s linear 3;" ;  
       scour-=10 ;
      
     }else{ 
      event.target.style.cssText="animation: true 0.3s linear 3;" ; 
      scour+=20 ;
      maxScour=Math.max(maxScour,scour) ;
     }

     setTimeout(() => {
        event.target.style.cssText="animation: none ;"   
      }, 350);
    }
    this.window.localStorage.setItem("maxSour2",maxScour) ;
    s.innerHTML=`Scour:${scour} | MaxScour:${maxScour}` ;
});




function hideCells(){
    for(let i=0 ; i<9 ;i++){
        for(let j= 0;j<9 ;j++){
            if(set.has( matrix[i][j].id )){
                matrix[i][j].value="" ;
            }else{
                matrix[i][j].readOnly=true;
                matrix[i][j].style.cssText="background-color:#0f0 ;color:white" ;
            }
        }
    }
}

function solveSudoku(board) {
    return backtracking(board)
} ;

function backtracking(board){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j].value == "") {
                for (let k = 1; k <= 9; k++) {
                    if (isValidSudoku2(board, i, j, k + "")) {
                        board[i][j].value = k + "";
                        if (backtracking(board)) return true;
                    }
                }
                board[i][j].value = "";
                return false;
            }
        }
    }
    
    return true
} ;

function isValidSudoku2(board, x, y, k) {
    for (let i = 0; i < 9; i++) {
        if (board[x][i].value == k ){  return false ;}
        if (board[i][y].value == k  ){ return false ;}

        let xx = 3 * Math.floor(x / 3) + Math.floor(i / 3);
        let yy = 3 * Math.floor(y / 3) + Math.floor(i % 3);
        if (board[xx][yy].value == k ) { return false ;}
    }
    return true ;
};
function isValidSudoku1(board, x, y, k) {
    for (let i = 0; i < 9; i++) {
        if (board[x][i].value == k && i!=y ){ return false ;}
        if (board[i][y].value == k && i!=x ){ return false ;}

        let xx = 3 * Math.floor(x / 3) + Math.floor(i / 3);
        let yy = 3 * Math.floor(y / 3) + Math.floor(i % 3);
        if (board[xx][yy].value == k && xx!=x && yy!=y  ) { return false ;}
    }
    return true ;
};

function randomNumber(nb){
    let set=new Set() ;

   for(let i= 0 ;i< nb ;i++){
     let i=Math.floor( Math.random() *9)  ;
     let j=Math.floor( Math.random() *9)  ;
     set.add(`${i}${j}`) ;
   }
   return set ;
}

function clearAll(){
    hideCells();
}
function slotion(){
    hideCells();
    solveSudoku(matrix) ;
}

function newGame(){
    location.reload() ;
}



function putRndomNamberInBoard(){
   for(let i= 0 ;i<9 ;i+=3){
      matrix[i][i].value=Math.floor(Math.random() * 9)+1 ;
   }
}



window.onload=function(){
    set =randomNumber(90) ;
    putRndomNamberInBoard() ;
    solveSudoku(matrix) ;
    hideCells() ;
}