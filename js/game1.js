

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


Init();
// BEGIN!
setInterval(Draw, 1000 / frameRate);

function Reset() {
  b = new Ball();
}