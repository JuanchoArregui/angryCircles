
////////////////////////////////////////////////////
///////  AngryCircle CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryCircle(canvas, ctx) {  
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.xPos = ctx.canvas.width/2;  // $('#xPosIni').val();      // x position.
    this.yPos = ctx.canvas.height/2; // $('#yPosIni').val();      // y position.
    this.xVel = 4; // $('#xVelIni').val();     // x Initial velocity.
    this.yVel = 6; // $('#yVelIni').val();     // y Initial velocity.
    this.xGravity = 0; // $('#gravity').val();        // Controls how hard gravity pulls on the circle.  1 is normal.ç
    this.yGravity = 1; // $('#gravity').val();        // Controls how hard gravity pulls on the circle.  1 is normal.
    this.spin = 0; //positive value means clockwise spin, and negative counterclockwise

    this.color = colorMain; // Colour of the circle.
    this.radius = 4*angryModule; // $('#radius').val();  // Radius of the circle.
    this.width = angryModule;  // Radius of the circle.
    
    this.bounceRate = 50; // $('#bounceRate').val();     // Bounce rate of the circle as a percentage. Higher number means more bounce.
    this.friction = 0 ; // $('#friction').val();    // Controls the amount of horizontal friction. Higher number equals more friction.
     
}


/////////////////////////////////////////////////////
////////////  AngryCircle DRAW METHOD ///////////////
////////////////////////////////////////////////////
AngryCircle.prototype.draw = function() {
 
  this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);  // Clear the canvas.
  this.ctx.fillStyle = this.color; // Set the fill style to the colour of the circle.
  this.ctx.beginPath(); // Make sure to start a new path.
  this.ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false); // Draw 360° arc and fill it.
  this.ctx.fill();
  this.ctx.closePath();// Close the path.

}


////////////////////////////////////////////////
///////////  AngryCircle MOVE METHOD ///////////
////////////////////////////////////////////////
AngryCircle.prototype.move = function() {

  //effect of gravity
  this.xVel += this.xGravity;
  this.yVel += this.yGravity;
  //effect of friction
  this.xVel *= this.friction / 100;
  this.yVel *= this.friction / 100;

  this.xPos += this.xVel;
  this.yPos += this.yVel;

  //Boundary collision detection and adding effect of speed loss because of collision
  if (this.xPos + this.radius > this.canvas.width || this.xPos + this.radius < 2*this.radius) {
    this.vx *= -1 * this.bounceRate / 100;
  }
  if (this.yPos + this.radius > this.canvas.height || this.yPos + this.radius < 2*this.radius) {
  this.yVel *= -1 * this.bounceRate / 100;
  }
};


////////////////////////////////////////////////
///////////  AngryCircle UPDATE METHOD ///////////
////////////////////////////////////////////////
AngryCircle.prototype.update = function() {
  var that = this;
  setInterval(function(){
      that.draw();
      that.move();
  }, frameRate);

};
