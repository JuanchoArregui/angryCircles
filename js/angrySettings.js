/////////////////////////////////////////////
//////////  SETTING VARIABLES  //////////////
/////////////////////////////////////////////

//this are the parameters used in the design of the game
//and they are setted at the CSS
var angryModule = ( $(':root').css('--angryModule') ).replace('px', ''); //jquery returns us a string like '25px' so we need to take out the 'px'
var borderWidth = 25;
var borderRadius = 100;
var colorMain = $(':root').css('--colorMain');
var frameRate = 1000/24; //frames per second



$(document).ready(function(){

  /////////////////////////////////////////////
  ////////   INIT  ///////////////
  /////////////////////////////////////////////

  // Create new Game.
  var angryGame = new AngryGame();


  // Create new angryBall with 2 balls.
  var angryBall_1 = new AngryBall();
    angryBall_1.xPos = 50;
    angryBall_1.yPos = 50;
    angryBall_1.xVel = 50;
    angryBall_1.yVel = 12; 

  var angryBall_2 = new AngryBall();
    angryBall_2.xPos = 500;
    angryBall_2.yPos = 200 ; 
    angryBall_2.xVel = -15;
    angryBall_2.yVel = 50; 

  angryGame.balls.push(angryBall_1);
  angryGame.balls.push(angryBall_2);
  
  angryGame.setAngryCanvas(); 
  angryGame.draw();
  angryGame.update();



  /////////////////////////////////////////////
  ////////   SETTING LISTENERS  ///////////////
  /////////////////////////////////////////////

  // canvas change size
  $(window).on('resize', angryGame.setAngryCanvas);


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
    angryGame.xGravity = this.value;
  });

  $('#yGravitySlider').on('input', function () {
    $('#yGravitySpan').text(this.value) ;
    angryGame.yGravity = this.value;
  });

  $('#bounceRateSlider').on('input', function () {
    $('#bounceRateSpan').text(this.value) ;
    angryGame.bounceRate = this.value;
  });

  $('#frictionSlider').on('input', function () {
    $('#frictionSpan').text(this.value) ;
    angryGame.friction = this.value;
  });






})