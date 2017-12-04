/////////////////////////////////////////////
//////////  SETTING VARIABLES  //////////////
/////////////////////////////////////////////

//this are the parameters used in the design of the game
//and they are setted at the CSS
var angryModule = ( $(':root').css('--angryModule') ).replace('px', ''); //jquery returns us a string like '25px' so we need to take out the 'px'
var borderWidth = 25;
var borderRadius = 100;
var colorMain = $(':root').css('--colorMain');


//more parameters for the game and tha animation
var $canvas;
var ctx;
var frameRate = 1000/24; //frames per second


/////////////////////////////////////////////
//////////  SETTING ANGRY CANVAS  ///////////
/////////////////////////////////////////////

// initialize the canvas    
setAngryCanvas(); 

// Get the canvas.
//canvas = document.getElementById("canvas"); //var canvas = $("#canvas"); PQ NO FUNCIONA?????
// Get the 2d context globally 
//ctx = canvas.getContext('2d');
// alert if there is any problem with the canvas 
//if (!canvas.getContext) {
//  alert ("Ops, canvas is not supported!! I think you should upadtae your browser...")
//}




/////////////////////////////////////////////
////////   SETTING LISTENERS  ///////////////
/////////////////////////////////////////////

$(document).ready(function(){

  // canvas change size
  $(window).on('resize', setAngryCanvas);

  //  button play/pause
  $("#button-play").click(function(){
      $(this).toggleClass("is-active");
      console.log("pulsado botón")

      if ( $(this).hasClass( "is-active" ) ) {
        console.log("CONTINUAMOS el juego")
        $(this).text(" ► Play");
        clearInterval(angryBall.angryMoving)
      }
      else {
        console.log("Pausamos el juego")
        $(this).text(" ▌▌  Pause");
        angryBall.update();
      } 
  });

  //  slider bars

  $('#xGravitySlider').on('input', function () {
    $('#xGravitySpan').text(this.value) ;
    angryBall.xGravity = this.value;
  });

  $('#yGravitySlider').on('input', function () {
    $('#yGravitySpan').text(this.value) ;
    angryBall.yGravity = this.value;
  });

  $('#bounceRateSlider').on('input', function () {
    $('#bounceRateSpan').text(this.value) ;
    angryBall.bounceRate = this.value;
  });

  $('#frictionSlider').on('input', function () {
    $('#frictionSpan').text(this.value) ;
    angryBall.friction = this.value;
  });

//  canvas mouse
  $canvas.mouseleave(function(event){
    console.log("el mouse está fuera del canvas!!!!!!!");
  });

//  $canvas.on('click', function(event){
//    var x = event.clientX - $canvas.position().left;
//    var y = event.clientY - $canvas.position().top;
//     console.log('click en. ' + x + ' ' + y);
//  });



  


/////////////////////////////////////////////
////////   INIT  ///////////////
/////////////////////////////////////////////

  // Create new angryBall.
  var angryBall = new AngryBall();
  
    angryBall.draw();
    angryBall.update();


})