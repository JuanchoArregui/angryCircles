////////////////////////////////////////////////
////////  AngryGame BALLIndex MOVEMENT METHOD ////////
////////////////////////////////////////////////
AngryGame.prototype.ballMovement = function(ballIndex) {
    
      //store the prvious position 
      this.balls[ballIndex].xPosPrev = this.balls[ballIndex].xPos;
      this.balls[ballIndex].yPosPrev = this.balls[ballIndex].yPos;
    
      //effect of gravity
      this.balls[ballIndex].xVel += this.xGravity;
      this.balls[ballIndex].yVel += this.yGravity;
    
      //effect of friction
      this.balls[ballIndex].xVel *= (1 - this.friction / 100);
      this.balls[ballIndex].yVel *= (1 - this.friction / 100);
      this.balls[ballIndex].spin *= (1 - this.friction / 100);
    
      //new position and spin
      this.balls[ballIndex].xPos += this.balls[ballIndex].xVel;
      this.balls[ballIndex].yPos += this.balls[ballIndex].yVel;
      this.balls[ballIndex].angle += this.balls[ballIndex].spin;
     
    };
