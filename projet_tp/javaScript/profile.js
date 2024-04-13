let profile=document.getElementById("picteur") ;
console.log(profile) ;
let container=document.getElementById("container") ;
console.log( container) ;

profile.onclick=function(){
    if(container.style.display=="none"){
        container.style.display="block" ;
    }else{
        container.style.display="none" ;
    }
}
let btn=document.getElementById("btn") ;
let informatin=document.getElementById("informatin") ;
btn.onclick=function(){
    if(informatin.style.display=="none"){
        informatin.style.display="block"
    }else{
        informatin.style.display="none"
    }
}
let max1=window.localStorage.getItem("maxScour") ;
let SnakeScour=document.getElementById("SnakeScour").innerHTML=`Max Scour in snake :${max1}` ;

let max2=window.localStorage.getItem("maxSour2") ;
let sudukoscour=document.getElementById("sudukoscour").innerHTML=`Max Scour in suduko :${max2}` ;


let max3=window.localStorage.getItem("maxScour3") ;
let pingPosngScour=document.getElementById("pingPosngScour").innerHTML=`Max Scour in ping Pong :${max3}` ;