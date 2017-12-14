

/////////////////////////////////////////////////
/////  AngryGame  SET CANVAS METHOD   ///////////
/////////////////////////////////////////////////

/*
IMPORTANT NOTE: I Dont know why but the canvas is not created with integer numbers dimenssions
For example I enter a height of 750px but the canvas created has 749,9993
So in order to avoid decimals I will round the numbers and create a new variable to store the rounded dimenssions
*/

AngryGame.prototype.setAngryCanvas = function() {
    
    // delete previous canvas
    $('#canvas').remove();

    // Get the size of the display window to Maximize the width and height of the canvas
    var ww = Math.floor(window.innerWidth);
    var wh = Math.floor(window.innerHeight);
    // Set the max new size for the canvas
    // we calculate the size subtracting the margins established in the design to the size of the window
    var cw = ww - 4*angryModule;
    var ch = wh - 14*angryModule;
    $( "#canvas-outfit" ).append( '<canvas id="canvas" width="' + cw + '" height="' + ch + '" class = "" ondrop="drop(event);" ondragover="dragOver(event);"></canvas>' );
    $( "#canvas-outfit" ).width(cw);
    $( "#canvas-outfit" ).height(ch);
    this.canvas = $('#canvas');
    this.canvasWidth = Math.round( $('#canvas').width() );
    this.canvasHeight = Math.round( $('#canvas').height() );
    console.log("NEW CANVAS:" + $('#canvas').width() + " x " + $('#canvas').height() );
    console.log("medidas redondeadas CANVAS:" + this.canvasWidth + " x " +  this.canvasHeight );
    angryGame.update();

    
    //and we set the listeners associated to thegame's canvas
    this.canvas.on('mousedown mouseup mousemove mouseover mouseout touchstart touchmove touchend touchcancel', function(event){
        this.pointerEventToXY(event); 
        // console.log(this.pointerX + ', ' + this.pointerY);
      }.bind(this));

    this.canvas.on('mouseleave', function(event){
        console.log('out of the canvas');
    });

    this.canvas.on('mouseenter', function(event){
        console.log('entering the canvas');
    });

    this.update;
}