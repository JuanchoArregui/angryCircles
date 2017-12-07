
////////////////////////////////////////////////////
///////  angryBall CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryBall() {  
   
    this.xPos = 100; //$canvas.width()/2;  // $('#xPosIni').val();      // x position.
    this.yPos = 100; //$canvas.height()/2; // $('#yPosIni').val();      // y position.
    this.xPosPrev;
    this.yPosPrev;
    this.time;
    this.timePrev;
    this.xVel = 100; // $('#xVelIni').val();     // x Initial velocity.
    this.yVel = 100; // $('#yVelIni').val();     // y Initial velocity.
    this.spin = 0; //positive value means clockwise spin, and negative counterclockwise
    this.angle = 0;
    this.radius = 2*angryModule; // Radius of the angryBall.

}


