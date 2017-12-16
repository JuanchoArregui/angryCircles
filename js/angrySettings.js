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
var frameRate = 1000/16; //frames per second



$(document).ready(function(){

  /////////////////////////////////////////////
  ////////   SETTING LISTENERS  ///////////////
  /////////////////////////////////////////////

  // canvas change size
  $(window).on('resize', (angryGame.setAngryCanvas).bind(angryGame));


  //  button play/pause
  $("#button-play").click(function(){
      $(this).toggleClass("is-active");

      if ( $(this).hasClass( "is-active" ) ) {
        console.log(" Pausamos  el juego")
        $(this).text(" ► Play");
          angryGame.canvas.drawText({
          fillStyle: colorSecondary,
          x: angryGame.canvas.width()/2, 
          y: angryGame.canvas.height()/2,
          fontSize: 90,
          fontFamily: 'Arial',
          fontStyle: 'bold',
          align: 'center',
          text: 'Game Paused',
          maxWidth: angryGame.canvas.width()*0.8
          });
    
        clearInterval(angryGame.angryMoving)
      }
      else {
        console.log("CONTINUAMOS el juego")
        $(this).text(" ▌▌  Pause");
        if(angryGame.balls.length===0){
          var angryBall_1 = new AngryBall(100, 100, 50, 50);
          angryGame.balls.push(angryBall_1);
          angryGame.numBalls = angryGame.balls.length;
        }
        angryGame.update();
      } 
  });


  //  slider bars
  $('#xGravitySlider').on('input', function () {
    $('#xGravitySpan').text(this.value) ;
    angryGame.xGravity = parseInt(this.value);
    angryGame.update();
  });

  $('#yGravitySlider').on('input', function () {
    $('#yGravitySpan').text(this.value) ;
    angryGame.yGravity = parseInt(this.value);
    angryGame.update();
  });

  $('#bounceRateSlider').on('input', function () {
    $('#bounceRateSpan').text(this.value + "%") ;
    angryGame.bounceRate = parseInt(this.value);
    angryGame.update();
  });

  $('#frictionSlider').on('input', function () {
    $('#frictionSpan').text(this.value + "%") ;
    angryGame.friction = parseInt(this.value);
    angryGame.update();
  });

})


  /////////////////////////////////////
  ////////
  ////////   INIT  ///////////////
  /////////////////////////////////////////////

  // Create new Game.
  var angryGame = new AngryGame();

  angryGame.setAngryCanvas(); 

  

 
  /////////////////////////////////////////////
  ////////////  LOGO  DRAG AND DROP  ///////////////
  ///////////////////////////////////////////// 

  function dragStart(event) {
    console.log("dragStart");
    // Add the target element's id to the data transfer object
    event.dataTransfer.setData("text/plain", event.target.id);

    angryGame.pointerEventToXY(event); 
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
    var ballName = new AngryBall(dropX, dropY, 50, 50 );
    angryGame.balls.push(ballName);
    angryGame.numBalls = angryGame.balls.length;
      if ( $("#button-play").hasClass( "is-active" ) ) {
        $("#button-play").toggleClass("is-active");
        $("#button-play").text(" ▌▌  Pause");
      }
    angryGame.update();
    
  }