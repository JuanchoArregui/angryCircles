
////////////////////////////////////////////////////
///////  AngryCircle CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryCircle() {  

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
 
  ctx.strokeRect(0, 0, canvas.width, canvas.height);  // Clear the canvas.
  ctx.fillStyle = this.color; // Set the fill style to the colour of the circle.
  ctx.beginPath(); // Make sure to start a new path.
  ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false); // Draw 360° arc and fill it.
  ctx.fill();
  ctx.closePath();// Close the path.

}


////////////////////////////////////////////////
///////////  AngryCircle MOVE METHOD ///////////
////////////////////////////////////////////////
AngryCircle.prototype.move = function() {
  setInterval(function(){
      ctx.clearRect(0,0, canvas.width, canvas.height);
      
      //effect of gravity
      this.xVel += this.xGravity;
      this.yVel += this.yGravity;
      //effect of friction
      this.xVel *= this.friction / 100;
      this.yVel *= this.friction / 100;

      this.xPos += this.xVel;
      this.yPos += this.yVel;

      //Boundary collision detection and adding effect of speed loss because of collision
      if (this.xPos + this.radius > canvas.width || this.xPos + this.radius < 2*this.radius) {
        this.vx *= -1 * this.bounceRate / 100;
      }
      if (this.yPos + this.radius > canvas.height || this.yPos + this.radius < 2*this.radius) {
      this.yVel *= -1 * this.bounceRate / 100;
      }

      this.draw();
  }.bind(this), frameRate);

};


////////////////////////////////////////////////
///////////  AngryCircle UPDATE METHOD ///////////
////////////////////////////////////////////////
AngryCircle.prototype.update = function() {

  setInterval(function(){
      this.draw();
      this.move();
  }, frameRate);

};
