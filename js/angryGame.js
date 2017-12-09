////////////////////////////////////////////////////
///////  AngryGame CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryGame() {

    this.canvas = $('#canvas');
    this.balls = [];
    this.maxNumBalls = 15;
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
    $('#xGravitySlider').value = this.xGravity;
    $('#xGravitySpan').text(this.xGravity) ;
    $('#yGravitySlider').value = this.yGravity;
    $('#yGravitySpan').text(this.yGravity) ;
    $('#bounceRateSlider').value = this.bounceRate;
    $('#bounceRateSpan').text(this.bounceRate) ;
    $('#frictionSlider').value = this.friction;
    $('#frictionSpan').text(this.friction) ;


}


/////////////////////////////////////////////////
/////  AngryGame  SET CANVAS METHOD   ///////////
/////////////////////////////////////////////////

AngryGame.prototype.setAngryCanvas = function() {
    
    // delete previous canvas
    $('#canvas').remove();

    // Get the size of the display window to Maximize the width and height of the canvas
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    console.log("inner width x height: " + ww + " x " + wh);
    // Set the max new size for the canvas
    // we calculate the size subtracting the margins established in the design to the size of the window
    var cw = ww - 4*angryModule;
    var ch = wh - 18*angryModule;
    $( "#canvas-outfit" ).append( '<canvas id="canvas" width="' + cw + '" height="' + ch + '" class = "" ondrop="drop(event);" ondragover="dragOver(event);"></canvas>' );
    $( "#canvas-outfit" ).width(cw);
    $( "#canvas-outfit" ).height(ch);
    console.log("setting new Canvas to " + cw + " x " + ch);
    this.canvas = $('#canvas');

    
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




////////////////////////////////////////////////
///////////  AngryGame UPDATE METHOD /////////
////////////////////////////////////////////////
AngryGame.prototype.update = function() {
    
    this.angryMoving = setInterval(function(){

        for (var ballIndex=0; ballIndex<this.balls.length ; ballIndex++ ){
            this.ballMovement(ballIndex);
            this.borderCollisionDetection(ballIndex);
            this.ballCollisionDetection(ballIndex);
            }
        this.draw();

            //this is to prevent infinitesimal movements
            var that = this;
            this.balls.every ( function (ball) {
                if (Math.abs(ball.xVel)<1 && Math.abs(ball.yVel)<1 ) {
                    ball.xVel = 0;
                    ball.yVel = 0;
                    that.gameStopped = true;
                return true;  // seguir con el siguiente elemento
                
                } else {
                    that.gameStopped = false;
                return false; // terminar el bucle en este elemento
                }
            });
            if (this.gameStopped==true){
                console.log("ALL THE BALLS ARE STOPPED");
                clearInterval(this.angryMoving);
            }
         
    }.bind(this), frameRate);
    
    };


////////////////////////////////////////////////
///////////  AngryGame mouseIsInsideBall METHOD ///////// REVISAR SI SE USA ESTO
////////////////////////////////////////////////
AngryGame.prototype.pointerInsideBall = function() {

    for (var i = 0; i<this.balls.length ; i++){
        var dist = Math.sqrt( Math.pow((this.mouseX - this.balls[i].xPos), 2) + Math.pow((this.mouseY - this.balls[i].yPos), 2) );
        if (  dist < this.balls[i].radius){
            inside = true;
            this.pointerOnBall = true;
            this.activeBall = i;
            break;
        }
        else{this.pointerOnBall = false;}
    }
    return this.pointerOnBall;

}


////////////////////////////////////////////////
/////  AngryGame pointerEventToXY METHOD   /////
////////////////////////////////////////////////
AngryGame.prototype.pointerEventToXY = function(event){

    if(event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'touchend' || event.type == 'touchcancel'){
        var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
        this.pointerX = touch.pageX - this.canvas.position().left;
        this.pointerY = touch.pageY - this.canvas.position().top;
    }
    else if (event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove' || event.type == 'mouseover'|| event.type=='mouseout' || event.type=='mouseenter' || event.type=='mouseleave') {
        this.pointerX = event.pageX - this.canvas.position().left;
        this.pointerY = event.pageY - this.canvas.position().top;
    }
};
  
  