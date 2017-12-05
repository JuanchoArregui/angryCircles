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
////////   INIT  ///////////////
/////////////////////////////////////////////

// Create new Game.
var angryGame = new AngryGame();


  // Create new angryBall with 2 balls.
  var angryBall_1 = new AngryBall();
    angryBall_1.xPos = 50;  // $('#xPosIni').val();      // x position.
    angryBall_1.yPos = 50;
    angryBall_1.xVel = 100;
    angryBall_1.yVel = 120; 

  var angryBall_2 = new AngryBall();
    angryBall_2.xPos = 500;  // $('#xPosIni').val();      // x position.
    angryBall_2.yPos = 200 ; 
    angryBall_2.xVel = -150;
    angryBall_2.yVel = 100; 

  angryGame.balls.push(angryBall_1);
  angryGame.balls.push(angryBall_2);
  

  angryGame.draw();
  angryGame.update();





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






})