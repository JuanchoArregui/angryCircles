
////////////////////////////////////////////////////
///////  angryBall CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryBall() {  
   
    this.xPos = $canvas.width()/2;  // $('#xPosIni').val();      // x position.
    this.yPos = $canvas.height()/2; // $('#yPosIni').val();      // y position.
    this.xPosPrev;
    this.yPosPrev;
    this.time;
    this.timePrev;
    this.xVel = 150; // $('#xVelIni').val();     // x Initial velocity.
    this.yVel = 160; // $('#yVelIni').val();     // y Initial velocity.
    this.xGravity = 0; // $('#gravity').val();        // Controls how hard gravity pulls on the BallangryBall.  1 is normal.ç
    this.yGravity = 10; // $('#gravity').val();        // Controls how hard gravity pulls on the BallangryBall.  1 is normal.
    this.spin = 0; //positive value means clockwise spin, and negative counterclockwise

    this.color = colorMain; // Colour of the BallangryBall.
    this.radius = 2*angryModule; // $('#radius').val();  // Radius of the BallangryBall.
    this.width = angryModule;  // Radius of the BallangryBall.
    
    this.bounceRate = 80; // $('#bounceRate').val();     // Bounce rate of the BallangryBall as a percentage. Higher number means more bounce.
    this.friction = 2 ; // $('#friction').val();    // Controls the amount of horizontal friction. Higher number equals more friction.
    
    $('#xGravitySlider').value = this.xGravity;
    $('#xGravitySpan').text(this.xGravity) ;
    $('#yGravitySlider').value = this.yGravity;
    $('#yGravitySpan').text(this.yGravity) ;
    $('#bounceRateSlider').value = this.bounceRate;
    $('#bounceRateSpan').text(this.bounceRate) ;
    $('#frictionSlider').value = this.friction;
    $('#frictionSpan').text(this.friction) ;
}


/////////////////////////////////////////////////////
////////////  angryBall DRAW METHOD ///////////////
////////////////////////////////////////////////////
AngryBall.prototype.draw = function() {
 console.log("draw");
  // ctx.strokeRect(0, 0, canvas.width, canvas.height);  // Clear the canvas.
  $canvas.clearCanvas();

  $canvas.drawImage({
    source: './images/angry.png',
    layer: true,
    draggable: true,
    bringToFront: true,
    name: 'angryBallangryBall',
    fillStyle: this.color,
    x: this.xPos, y: this.yPos,
    width: 2*this.radius,
    height: 2*this.radius,

    dragstart: function(layer) {
      this.xPosPrev = layer.eventX;
      this.yPosPrev = layer.eventY;
      this.timePrev = Date.now();
    },
    drag: function(layer) {
      this.xPos = layer.eventX
      this.yPos = layer.eventY
      this.time = Date.now();
      console.log("posición bola: " + this.xPos + ", " + this.yPos);
    },
    dragstop: function(layer) {
      var difX = this.xPos - this.xPosPrev;
      var difY = this.yPos - this.yPosPrev;
      var difTime = this.time - this.timePrev;
      
      console.log("fin TOUCH" );
      console.log("difX: " + difX );
      console.log("difY: " + difY );
      console.log("difTime: " + difTime );

    }

  });

  $("#xPos").text(Math.round(this.xPos));
  $("#yPos").text(Math.round(this.yPos));

  $("#xVel").text(Math.round(this.xVel));
  $("#yVel").text(Math.round(this.yVel));


}


////////////////////////////////////////////////
///////////  angryBall MOVE METHOD ///////////
////////////////////////////////////////////////
AngryBall.prototype.move = function() {

  //store the prvious position (still dont know for what)
  this.xPosPrev = this.xPos;
  this.yPosPrev = this.yPos;

  //effect of gravity
  this.xVel += this.xGravity;
  this.yVel += this.yGravity;
  //effect of friction
  this.xVel *= (1 - this.friction / 100);
  this.yVel *= (1 - this.friction / 100);

  this.xPos += this.xVel;
  this.yPos += this.yVel;
 

  //Boundary collision detection and adding effect of speed loss because of collision
  if (this.xPos + this.radius > $canvas.width() ) {
    this.xPos = $canvas.width()-this.radius;
    console.log("choque RIGHT border ");
    this.xVel *= -1 * this.bounceRate / 100;
  }
  if ( this.xPos - this.radius < 0 ) {
    this.xPos = this.radius;
    console.log("choque LEFT border ");
    this.xVel *= -1 * this.bounceRate / 100;
  }
  if (this.yPos + this.radius > $canvas.height() ) {
    this.yPos = $canvas.height()-this.radius;
    console.log("choque BOTTOM border ");
    this.yVel *= -1 * this.bounceRate / 100;
  }
  if ( this.yPos - this.radius < 0 ) {
    this.yPos = this.radius;
    console.log("choque TOP border "); 
    this.yVel *= -1 * this.bounceRate / 100;
  }
};


////////////////////////////////////////////////
///////////  angryBall UPDATE METHOD /////////
////////////////////////////////////////////////
AngryBall.prototype.update = function() {

  this.angryMoving = setInterval(function(){
    this.move();
    this.draw();

    if (Math.abs(this.xVel)<1 && Math.abs(this.yVel)<1 ){
      this.xVel = 0;
      this.yVel = 0;
      console.log("PELOTA PARADA!");
      clearInterval(this.angryMoving);;
    }
    
}.bind(this), frameRate);

};
