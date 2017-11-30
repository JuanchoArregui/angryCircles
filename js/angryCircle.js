
////////////////////////////////////////////////////
///////  AngryCircle CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryCircle() {  
   
    this.xPos = $canvas.width()/2;  // $('#xPosIni').val();      // x position.
    this.yPos = $canvas.height()/2; // $('#yPosIni').val();      // y position.
    this.xVel = 150; // $('#xVelIni').val();     // x Initial velocity.
    this.yVel = 160; // $('#yVelIni').val();     // y Initial velocity.
    this.xGravity = 0; // $('#gravity').val();        // Controls how hard gravity pulls on the circle.  1 is normal.ç
    this.yGravity = 0; // $('#gravity').val();        // Controls how hard gravity pulls on the circle.  1 is normal.
    this.spin = 0; //positive value means clockwise spin, and negative counterclockwise

    this.color = colorMain; // Colour of the circle.
    this.radius = 2*angryModule; // $('#radius').val();  // Radius of the circle.
    this.width = angryModule;  // Radius of the circle.
    
    this.bounceRate = 80; // $('#bounceRate').val();     // Bounce rate of the circle as a percentage. Higher number means more bounce.
    this.friction = 0 ; // $('#friction').val();    // Controls the amount of horizontal friction. Higher number equals more friction.
     
}


/////////////////////////////////////////////////////
////////////  AngryCircle DRAW METHOD ///////////////
////////////////////////////////////////////////////
AngryCircle.prototype.draw = function() {
 
  // ctx.strokeRect(0, 0, canvas.width, canvas.height);  // Clear the canvas.
  $canvas.clearCanvas();

  $canvas.drawArc({
    layer: true,
    draggable: true,
    bringToFront: true,
    name: 'angryCircle',
    fillStyle: this.color,
    x: this.xPos, y: this.yPos,
    radius: this.radius,
  });
  $canvas.drawArc({
    fillStyle: 'white',
    x: this.xPos, y: this.yPos,
    radius: (this.radius - this.width/2),
  });

  $("#xPos").text(Math.round(this.xPos));
  $("#yPos").text(Math.round(this.yPos));

  $("#xVel").text(Math.round(this.xVel));
  $("#yVel").text(Math.round(this.yVel));

}


////////////////////////////////////////////////
///////////  AngryCircle MOVE METHOD ///////////
////////////////////////////////////////////////
AngryCircle.prototype.move = function() {

  //effect of gravity
  this.xVel += this.xGravity;
  this.yVel += this.yGravity;
  //effect of friction
  this.xVel *= (1 - this.friction / 100);
  this.yVel *= (1 - this.friction / 100);

  this.xPos += this.xVel;
  this.yPos += this.yVel;
  debugger;

  //Boundary collision detection and adding effect of speed loss because of collision
  if (this.xPos + this.radius > $canvas.width() || this.xPos - this.radius < 0) {
    this.xVel *= -1 * this.bounceRate / 100;
    console.log("choque en X");
  }
  if (this.yPos + this.radius > $canvas.height() || this.yPos - this.radius < 0) {
  this.yVel *= -1 * this.bounceRate / 100;
  console.log("choque en Y");
  }
};


////////////////////////////////////////////////
///////////  AngryCircle UPDATE METHOD /////////
////////////////////////////////////////////////
AngryCircle.prototype.update = function() {

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
