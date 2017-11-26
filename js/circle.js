// Get the canvas.
c = document.getElementById("canvas");

// Maximize the width and height.
c.width = $("#canvas-outfit").innerWidth;
c.height = $("#canvas-outfit").innerHeight;

// Get the 2d context globally.
ctx = c.getContext("2d");

frameRate = 60;

// Create the ball.
b = new Ball();

function Init() {
  RadiusBox.value = 10;
  ColourBox.value = "white"
  GravityBox.value = 1;
  BounceBox.value = 80;
  FrictionBox.value = 5;
  XPosBox.value = c.width / 10;
  YPosBox.value = c.height / 10;
  XVelBox.value = c.width / 10;
  YVelBox.value = c.height / 100;
  
  b = new Ball();
}

// Setup actions to be called by timer.
function Draw() {
  b.Draw();
  b.Move();
}

// The ball object.
function Ball() {  
  // Starting position.
  this.X = parseInt(XPosBox.value.toString());
  this.Y = parseInt(YPosBox.value.toString());;
  
  // Colour of the ball.
  this.C = ColourBox.value;
  
  // Initial velocity.
  this.VX = parseInt(XVelBox.value.toString());
  this.VY = parseInt(YVelBox.value.toString());
  
  // Size of the ball.
  this.Radius = parseInt(RadiusBox.value.toString());;
  
  // Bounce rate of the ball as a percentage.
  // Higher number equals more bounce.
  this.BounceRate = parseInt(BounceBox.value.toString());

  // Controls the amount of horizontal friction.
  // Higher number equals more friction.
  this.Friction = parseInt(FrictionBox.value.toString());
  
  // Controls how hard gravity pulls on the ball.
  // 1 is normal.
  this.Gravity = parseInt(GravityBox.value.toString());
}

Ball.prototype.Draw = function() {
  // Clear the canvas.
  ctx.clearRect(0, 0, c.width, c.height);
  
  // Make sure to start a new path.
  ctx.beginPath();
  
  // Set the fill style to the colour of the ball.
  ctx.fillStyle = this.C;
  
  // Draw 360° arc and fill it.
  ctx.arc(this.X, this.Y, this.Radius, 0, Math.PI * 2, false);
  ctx.fill();
  
  // Close the path.
  ctx.closePath();
}

Ball.prototype.Move = function() {
  // These next blocks test to see if the ball is going
  // to hit one of the boundaries.
  
  // Bottom boundary.
  if (this.Y + this.VY + this.Radius > c.height - 1) {
    // If out of bounds, stop at boundary.
    this.Y = c.height - 1 - this.Radius; 
    // Reverse direction.
    this.VY *= -this.BounceRate/100;
  }
  // Move ball Y position.
  else
    this.Y += this.VY;
  
  // Right boundary
  if (this.X + this.VX + this.Radius > c.width - 1) {
    // If out of bounds, stop at boundary.
    this.X = c.width - 1 - this.Radius;
    // Reverse direction.
    this.VX *= -this.BounceRate/100;
  }
  // Left bounds.
  else if (this.X + this.VX - this.Radius < 0) {
    // If out of bounds, stop at boundary.
    this.X = this.Radius;
    // Reverse direction.
    this.VX *= -this.BounceRate/100;
  }
  // Move ball X position.
  else
    this.X += this.VX;
  
  // This controls the decay rate of velocities.
  this.VY += (this.BounceRate / 100) * this.Gravity;
  this.VX -= this.VX / (250 / this.Friction);
}

Init();
// BEGIN!
setInterval(Draw, 1000 / frameRate);

function Reset() {
  b = new Ball();
}