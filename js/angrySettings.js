/////////////////////////////////////////////
//////////  SETTING VARIABLES  //////////////
/////////////////////////////////////////////

//this are the parameters used in the design of the game
//and they are setted at the CSS
var angryModule = ( $(':root').css('--angryModule') ).replace('px', ''); //jquery returns us a string like '25px' so we need to take out the 'px'
var borderWidth = 25;
var borderRadius = 100;
var colorMain = $(':root').css('--colorMain');
var colorSecondary = $(':root').css('--colorSecondary');
var frameRate = 1000/24; //frames per second



$(document).ready(function(){

  /////////////////////////////////////////////
  ////////   SETTING LISTENERS  ///////////////
  /////////////////////////////////////////////

  // canvas change size
  $(window).on('resize', angryGame.setAngryCanvas);


  //  button play/pause
  $("#button-play").click(function(){
      $(this).toggleClass("is-active");

      if ( $(this).hasClass( "is-active" ) ) {
        console.log(" Pausamos  el juego")
        $(this).text(" ► Play");
        clearInterval(angryGame.angryMoving)
      }
      else {
        console.log("CONTINUAMOS el juego")
        $(this).text(" ▌▌  Pause");
        if(angryGame.balls.length===0){
          var angryBall_1 = new AngryBall(100, 100, 50, 12);
          angryGame.balls.push(angryBall_1);
        }
        angryGame.update();
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


  /////////////////////////////////////////////
  ////////   INIT  ///////////////
  /////////////////////////////////////////////

  // Create new Game.
  var angryGame = new AngryGame();

  angryGame.setAngryCanvas(); 

  angryGame.canvas.drawText({
      fillStyle: colorSecondary,
      x: angryGame.canvas.width()/2, 
      y: angryGame.canvas.height()/2,
      fontSize: 90,
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center',
      text: 'Drag the bouncing AngryBall over the playground and just start playing!',
      maxWidth: angryGame.canvas.width()*0.8
    });


  
  /*
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
    angryGame.draw();
    angryGame.update();
    */
    
    

 
  /////////////////////////////////////////////
  ////////////   DRAG AND DROP  ///////////////
  ///////////////////////////////////////////// 

  function dragStart(event) {
    console.log("dragStart");
    // Add the target element's id to the data transfer object
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  function dragOver(event) {
    event.preventDefault();
    // Set the dropEffect to move
    event.dataTransfer.dropEffect = "move"
  }

  function drop(event) {
    event.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var dropX = event.clientX- angryGame.canvas.position().left;
    var dropY = event.clientX- angryGame.canvas.position().top;;
    var ballName = "angryBall_" + angryGame.balls.length;
    var ballName = new AngryBall(dropX, dropY, 0, 0 );
    angryGame.balls.push(ballName);
    angryGame.update();
    
  }