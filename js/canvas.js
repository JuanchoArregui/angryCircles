
/////////////////////////////////////////////////
///////////////  SET CANVAS  ////////////////////
/////////////////////////////////////////////////

  function setCanvas() {
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
    var cw = ww - 2*margin - 2*borderWidth;
    var ch = wh - 2*margin - 2*borderWidth - 2*borderRadius;
    console.log( "canvas width: " + cw);
    console.log( "  ''  height: " + ch);
    $( "#canvas-outfit" ).append( '<canvas id="canvas" width="' + cw + '" height="' + ch + '" class = "pink"></canvas>' );
    $( "#canvas-outfit" ).width(cw);
    $( "#canvas-outfit" ).width(cw);

    // Get the canvas.
    //var canvas = $("#canvas");
    var canvas = document.getElementById("canvas");

    // Get the 2d context globally 
    var ctx = canvas.getContext('2d');

    // alert if there is any problem with the canvas 
    if (!canvas.getContext) {
        alert ("Ops, canvas is not supported!! I think you should upadtae your browser...")
      }
    
}
