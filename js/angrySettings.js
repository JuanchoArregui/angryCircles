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
        clearInterval(angryCircle.angryMoving)
      }
      else {
        console.log("Pausamos el juego")
        $(this).text(" ▌▌  Pause");
        angryCircle.update();
      } 
  });

  //  hamburguer menu
  $(".hamburger").click(function(){
    $(this).toggleClass("is-active");
  });

  //  slider bar
  var slider = $('#xGravitySlider');
  var output = $('#xGravitySpan');
  output.innerHTML = slider.value;

  $('#xGravitySlider').on('input', function () {
    $('#xGravitySpan').text(this.value) ;
    console.log(this.value)
  });
    
});
  


/////////////////////////////////////////////
////////   INIT  ///////////////
/////////////////////////////////////////////

  // Create new angryCircle.
  var angryCircle = new AngryCircle();
  
    angryCircle.draw();
    angryCircle.update();