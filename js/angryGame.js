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
    this.yGravity = 0; // $('#gravity').val();        // Controls how hard gravity pulls on the BallangryBall.  1 is normal.
    this.bounceRate = 80; // $('#bounceRate').val();     // Bounce rate of the BallangryBall as a percentage. Higher number means more bounce.
    this.friction = 2 ; // $('#friction').val();    // Controls the amount of horizontal friction. Higher number equals more friction.
    this.angryMoving; // we use this to stop the update method with a clearinterval


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
    var ch = wh - 16*angryModule;
    $( "#canvas-outfit" ).append( '<canvas id="canvas" width="' + cw + '" height="' + ch + '" class = "pink"></canvas>' );
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


/////////////////////////////////////////////////////
////////////  AngryGame DRAW METHOD ///////////////
////////////////////////////////////////////////////
AngryGame.prototype.draw = function() {

    // Clear the canvas.
    this.canvas.clearCanvas();
    console.log("drawing ");
     
    var that = this;
     
    for (var i = 0; i<this.balls.length ; i++){
        this.canvas.drawImage({
        source: './images/angryBall.png',
        rotate: that.balls[i].angle,
        x: that.balls[i].xPos,
        y: that.balls[i].yPos,
        width: 2*that.balls[i].radius,
        height: 2*that.balls[i].radius,
        });
    }

    $("#xPos").text(Math.round(this.balls[0].xPos));
    $("#yPos").text(Math.round(this.balls[0].yPos));
  
    $("#xVel").text(Math.round(this.balls[0].xVel));
    $("#yVel").text(Math.round(this.balls[0].yVel));

    $("#spin").text(Math.round(this.balls[0].spin));


}  


////////////////////////////////////////////////
////////  AngryGame BAL MOVEMENT METHOD ////////
////////////////////////////////////////////////
AngryGame.prototype.ballMovement = function(ball) {
    
      //store the prvious position 
      this.balls[ball].xPosPrev = this.balls[ball].xPos;
      this.balls[ball].yPosPrev = this.balls[ball].yPos;
    
      //effect of gravity
      this.balls[ball].xVel += this.xGravity;
      this.balls[ball].yVel += this.yGravity;
    
      //effect of friction
      this.balls[ball].xVel *= (1 - this.friction / 100);
      this.balls[ball].yVel *= (1 - this.friction / 100);
      this.balls[ball].spin *= (1 - this.friction / 100);
    
      //new position and spin
      this.balls[ball].xPos += this.balls[ball].xVel;
      this.balls[ball].yPos += this.balls[ball].yVel;
      this.balls[ball].angle += this.balls[ball].spin;
     
    };

/////////////////////////////////////////////////////
////////////  AngryGame BORDER COLLISION METHOD ////////////
/////////////////////////////////////////////////////
AngryGame.prototype.borderCollisionDetection = function(ball) {
    
//Boundary collision detection and adding effect of speed loss because of collision
if (this.balls[ball].xPos + this.balls[ball].radius > this.canvas.width() ) {
    this.balls[ball].xPos = this.canvas.width()-this.balls[ball].radius;
    console.log("ball num:" + ball + " has collided with the RIGHT border ");
    this.balls[ball].xVel *= -1 * this.bounceRate / 100;
        if (this.balls[ball].yPos > this.balls[ball].yPosPrev) {
            this.balls[ball].spin -= this.balls[ball].yVel*0.1;
        }
        else {
            this.balls[ball].spin += this.balls[ball].yVel*0.1;
        }
}
if ( this.balls[ball].xPos - this.balls[ball].radius < 0 ) {
    this.balls[ball].xPos = this.balls[ball].radius;
    console.log("ball num:" + ball + " has collided with the LEFT border ");
    this.balls[ball].xVel *= -1 * this.bounceRate / 100;
        if (this.balls[ball].yPos > this.balls[ball].yPosPrev) {
            this.balls[ball].spin += this.balls[ball].yVel*0.1;
        }
        else {
            this.balls[ball].spin -= this.balls[ball].yVel*0.1;
        }
}
if (this.balls[ball].yPos + this.balls[ball].radius > this.canvas.height() ) {
    this.balls[ball].yPos = this.canvas.height()-this.balls[ball].radius;
    console.log("ball num:" + ball + " has collided with the BOTTOM border ");
    this.balls[ball].yVel *= -1 * this.bounceRate / 100;

        if (this.balls[ball].xPos > this.balls[ball].xPosPrev) {
            this.balls[ball].spin += this.balls[ball].xVel*0.1;
        }
        else {
            this.balls[ball].spin -= this.balls[ball].xVel*0.1;
        }
}

if ( this.balls[ball].yPos - this.balls[ball].radius < 0 ) {
    this.balls[ball].yPos = this.balls[ball].radius;
    console.log("ball num:" + ball + " has collided with the TOP border "); 
    this.balls[ball].yVel *= -1 * this.bounceRate / 100;
        if (this.balls[ball].xPos > this.balls[ball].xPosPrev) {
            this.balls[ball].spin -= this.balls[ball].xVel*0.1;
        }
        else {
            this.balls[ball].spin += this.balls[ball].xVel*0.1;
        }
}

}


////////////////////////////////////////////////
///////////  AngryGame UPDATE METHOD /////////
////////////////////////////////////////////////
AngryGame.prototype.update = function() {
    
    this.angryMoving = setInterval(function(){

        for (var ball=0; ball<this.balls.length ; ball++ ){
            this.ballMovement(ball);
            this.borderCollisionDetection(ball);
            }
        this.draw();
        

        /*
            if (Math.abs(this.xVel)<1 && Math.abs(this.yVel)<1 ){
            this.xVel = 0;
            this.yVel = 0;
            console.log("PELOTA PARADA!");
            clearInterval(this.angryMoving);
            }
        */

        
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
  


  