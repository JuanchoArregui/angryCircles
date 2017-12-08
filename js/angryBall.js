
////////////////////////////////////////////////////
///////  angryBall CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryBall(xPos, yPos, xVel, yVel) {  
   
    this.xPos = xPos; // x position.
    this.yPos = yPos; // y position.
    this.xPosPrev;
    this.yPosPrev;
    this.time;
    this.timePrev;
    this.xVel = xVel; // x Initial velocity.
    this.yVel = yVel; // y Initial velocity.
    this.spin = 0; //positive value means clockwise spin, and negative counterclockwise
    this.angle = 0;
    this.radius = 2*angryModule; // Radius of the angryBall.
    this.mass = 1;

}


