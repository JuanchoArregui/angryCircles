/////////////////////////////////////////////
///////////////  VARIABLES  /////////////////
/////////////////////////////////////////////

//this are the parameters used in the design of the game
//and they are setted at the CSS
var angryModule = ( $(':root').css('--angryModule') ).replace('px', ''); //jquery returns us a string like '25px' so we need to take out the 'px'
var borderWidth = 25;
var borderRadius = 100;
var colorMain = $(':root').css('--colorMain');

//more parameters for the game and tha animation
var canvas;
var ctx;
var frameRate = 1000/24; //frames per second



/////////////////////////////////////////////
///////////  SET ANGRY CANVAS  /////////////
/////////////////////////////////////////////

// initialize the canvas    
setCanvas(); 




/////////////////////////////////////////////
///////////////  LISTENERS  /////////////////
/////////////////////////////////////////////

$(document).ready(function(){

    $(window).on('resize', setCanvas);

    $("#button-play").click(function(){
      initAngryGame1()
    });
 
    $(".hamburger").click(function(){
      $(this).toggleClass("is-active");
    });

    
});
  
