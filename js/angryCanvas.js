
/////////////////////////////////////////////////
///////////////  SET CANVAS  ////////////////////
/////////////////////////////////////////////////

function setAngryCanvas() {
  //alert("activado evento resize");
  //console.log( this);

  //if there is any previous canvas is deleted
  $('#canvas').remove();

  // Get the size of the display window to Maximize the width and height of the canvas
  var ww = this.innerWidth;
  var wh = this.innerHeight;
  console.log( "////////////////////");
  console.log( "window width: " + ww);
  console.log( "  ''  height: " + wh);
  // Set the max new size for the canvas
  // we calculate the size subtracting the margins established in the design to the size of the window
  console.log(angryModule);
  
  var cw = ww - 4*angryModule;
  var ch = wh - 20*angryModule;
  console.log( "canvas width: " + cw);
  console.log( "  ''  height: " + ch);
  $( "#canvas-outfit" ).append( '<canvas id="canvas" width="' + cw + '" height="' + ch + '" class = "pink"></canvas>' );
  $( "#canvas-outfit" ).width(cw);
  $( "#canvas-outfit" ).height(ch);

  $canvas = $('#canvas');

  
}
