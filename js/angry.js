//this are the parameters used in the design of the game
var angryModule = 25;
var borderWidth = 25;
var borderRadius = 100;


//more parameters for the game and tha animation
var canvas;
var ctx;
var frameRate = 60;



// initialize the canvas    
setCanvas(); 




/////////////////////////////////////////////
///////////////  LISTENERS  /////////////////
/////////////////////////////////////////////
// window.addEventListener("resize", handleCanvasResize);
$(document).ready(function(){

    $(window).on('resize', setCanvas);

    $("#button-play").click(function(){
    alert ("ok, botón pulsado");
    });
 
    $(".hamburger").click(function(){
      $(this).toggleClass("is-active");
    });

    
});
  
