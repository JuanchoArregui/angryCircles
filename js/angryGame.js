////////////////////////////////////////////////////
///////  AngryGame CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryGame() {

    this.canvas = $('#canvas');
    this.canvasWidth;
    this.canvasHeight;
    this.balls = [];
    this.numBalls = 0;
    this.maxNumBalls = 15;
    this.animations = [];
    this.tagets = [];
    this.obstacles = [];
    this.pointerX = 0;
    this.pointerY = 0;
    this.pointerOnBall = false;
    this.pointerctive = false;
    this.activeBall = 0;
    this.xGravity = 0; // $('#gravity').val();        // Controls how hard gravity pulls on the BallangryBall.  1 is normal.ç
    this.yGravity = 5; // $('#gravity').val();        // Controls how hard gravity pulls on the BallangryBall.  1 is normal.
    this.bounceRate = 90; // $('#bounceRate').val();     // Bounce rate of the BallangryBall as a percentage. Higher number means more bounce.
    this.friction = 2 ; // $('#friction').val();    // Controls the amount of horizontal friction. Higher number equals more friction.
    this.angryMoving; // we use this to stop the update method with a clearinterval
    this.gameStopped = false;


    // we update the sliders
    //I dont know why, but jquery doesnt update the slider properly. it work fine with document.getElementById
    document.getElementById('xGravitySlider').value = this.xGravity;
    // $('#xGravitySlider').value = this.xGravity;
    $('#xGravitySpan').text(this.xGravity) ;
    document.getElementById('yGravitySlider').value = this.yGravity;
    $('#yGravitySpan').text(this.yGravity) ;

    document.getElementById('bounceRateSlider').value = this.bounceRate;
    $('#bounceRateSpan').text(this.bounceRate  + "%") ;

    document.getElementById('frictionSlider').value = this.friction;
    $('#frictionSpan').text(this.friction + "%") ;


}


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
    $( "#canvas-outfit" ).append( '<canvas id="canvas" width="' + cw + '" height="' + ch + '" class = "pink" ondrop="drop(event);" ondragover="dragOver(event);"></canvas>' );
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
        console.log(this.pointerX + ', ' + this.pointerY);
      }.bind(this));

    this.canvas.on('mouseleave', function(event){
        console.log('out of the canvas');
    });

    this.canvas.on('mouseenter', function(event){
        console.log('entering the canvas');
    });

}

