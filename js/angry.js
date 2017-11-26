//this are the parameters used in the design of the game
var margin = 25;
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

$(window).on('resize', setCanvas);

$("#button-play").click(function(){
    alert ("ok, botón pulsado");
  });

