


/////////////////////////////////////////////////////
////////////  AngryGame BORDER COLLISION METHOD ////////////
/////////////////////////////////////////////////////
AngryGame.prototype.borderCollisionDetection = function(ballIndex) {
//Boundary collision detection and adding effect of speed loss because of collision

// first check X coordinates:

    //RIGHT border collision
    if (this.balls[ballIndex].xPos + this.balls[ballIndex].radius > this.canvasWidth ) {
        this.balls[ballIndex].xPos = this.canvasWidth-this.balls[ballIndex].radius;
        this.balls[ballIndex].xVel *= this.bounceRate / 100 ;
            //this is to prevent endless infinitesimal bouncing when the ball is almost stopped
            if ( this.balls[ballIndex].xVel < this.xGravity ) {
                this.balls[ballIndex].xVel=0;
            }
            else{
                this.balls[ballIndex].xVel = -1*Math.floor(this.balls[ballIndex].xVel);
            }
        
        //spin
        if (this.balls[ballIndex].yPos > this.balls[ballIndex].yPosPrev) {
            this.balls[ballIndex].spin -= this.balls[ballIndex].yVel*0.1;
        }
        else {
            this.balls[ballIndex].spin += this.balls[ballIndex].yVel*0.1;
        }
        
    }


    //LEFT border collision
    else if ( this.balls[ballIndex].xPos - this.balls[ballIndex].radius < 0 ) {
        this.balls[ballIndex].xPos = this.balls[ballIndex].radius;
        this.balls[ballIndex].xVel *= this.bounceRate / 100;
            //this is to prevent endless infinitesimal bouncing when the ball is almost stopped
            if ( this.balls[ballIndex].xVel > this.xGravity) {
                this.balls[ballIndex].xVel=0;
            }
            else{
                this.balls[ballIndex].xVel =-1* Math.floor(this.balls[ballIndex].xVel);
            }
        
        //spin
        if (this.balls[ballIndex].yPos > this.balls[ballIndex].yPosPrev) {
            this.balls[ballIndex].spin += this.balls[ballIndex].yVel*0.1;
        }
        else {
            this.balls[ballIndex].spin -= this.balls[ballIndex].yVel*0.1;
        }
        
    }


// second check Y coordinates:

    //BOTTOM border collision
    if (this.balls[ballIndex].yPos > this.canvasHeight - this.balls[ballIndex].radius ) {
        this.balls[ballIndex].yPos = this.canvasHeight-this.balls[ballIndex].radius;
        var kk = this.canvasHeight - this.balls[ballIndex].radius;
        console.log( "BOTTOM COLLISION");
        this.balls[ballIndex].yVel *= this.bounceRate / 100;
        
            //this is to prevent endless infinitesimal bouncing when the ball is almost stopped
            if ( this.balls[ballIndex].yVel < this.yGravity ) {
                this.balls[ballIndex].yVel=0;
            }
            else{
                this.balls[ballIndex].yVel = -1*Math.floor(this.balls[ballIndex].yVel);
            }
        
          
        //spin
        if (this.balls[ballIndex].xPos > this.balls[ballIndex].xPosPrev) {
            this.balls[ballIndex].spin += this.balls[ballIndex].xVel*0.1;
        }
        else {
            this.balls[ballIndex].spin -= this.balls[ballIndex].xVel*0.1;
        }
        
    }

    //TOP border collision
    else if ( this.balls[ballIndex].yPos - this.balls[ballIndex].radius < 0 ) {
        this.balls[ballIndex].yPos = this.balls[ballIndex].radius;
        this.balls[ballIndex].yVel *= this.bounceRate / 100;
            //this is to prevent endless infinitesimal bouncing when the ball is almost stopped
            if ( this.balls[ballIndex].yVel > this.yGravity) {
                this.balls[ballIndex].yVel=0;
            }
            else{
                this.balls[ballIndex].yVel = -1*Math.floor(this.balls[ballIndex].yVel);
            }
        
        //spin
        if (this.balls[ballIndex].xPos > this.balls[ballIndex].xPosPrev) {
            this.balls[ballIndex].spin -= this.balls[ballIndex].xVel*0.1;
        }
        else {
            this.balls[ballIndex].spin += this.balls[ballIndex].xVel*0.1;
        }
        
    }

}


/////////////////////////////////////////////////////
////////////  AngryGame BALL COLLISION METHOD ////////////
/////////////////////////////////////////////////////
AngryGame.prototype.ballCollisionDetection = function(ballIndex) {
    
    var ballsLength = this.balls.length;

    if ( ballIndex+1 < ballsLength){
        for ( var b=ballIndex+1; b < ballsLength; b++){
            var dx = this.balls[ballIndex].xPos - this.balls[b].xPos;
            var dy = this.balls[ballIndex].yPos - this.balls[b].yPos;
            var distance = Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) );
            var collisionAngle = Math.atan2(dy, dx);
            console.log("b: " + b);
            console.log("dx: " + dx);
            console.log("dy: " + dy);
            console.log("dist: " + distance);

                if (distance <= ( this.balls[ballIndex].radius + this.balls[b].radius) ) {
                   console.log("BALLIndex COLLISSION!!!!!!!!!!!");
                   
                   var magnitude_1 = Math.sqrt( Math.pow(this.balls[ballIndex].xVel, 2) + Math.pow(this.balls[ballIndex].yVel, 2) );
                   var magnitude_2 = Math.sqrt( Math.pow(this.balls[b].xVel, 2) + Math.pow(this.balls[b].yVel, 2) );
                   var direction_1 = Math.atan2(this.balls[ballIndex].yVel, this.balls[ballIndex].xVel);
                   var direction_2 = Math.atan2(this.balls[b].yVel, this.balls[b].xVel);
                   var new_xspeed_1 = magnitude_1*Math.cos(direction_1-collisionAngle);
                   var new_yspeed_1 = magnitude_1*Math.sin(direction_1-collisionAngle);
                   var new_xspeed_2 = magnitude_2*Math.cos(direction_2-collisionAngle);
                   var new_yspeed_2 = magnitude_2*Math.sin(direction_2-collisionAngle);
                   var final_xspeed_1 = ((this.balls[ballIndex].mass-this.balls[b].mass)*new_xspeed_1+(this.balls[b].mass+this.balls[b].mass)*new_xspeed_2)/(this.balls[ballIndex].mass+this.balls[b].mass);
                   var final_xspeed_2 = ((this.balls[ballIndex].mass+this.balls[ballIndex].mass)*new_xspeed_1+(this.balls[b].mass-this.balls[ballIndex].mass)*new_xspeed_2)/(this.balls[ballIndex].mass+this.balls[b].mass);
                   var final_yspeed_1 = new_yspeed_1;
                   var final_yspeed_2 = new_yspeed_2;
                   this.balls[ballIndex].xVel = Math.cos(collisionAngle)*final_xspeed_1+Math.cos(collisionAngle+Math.PI/2)*final_yspeed_1;
                   this.balls[ballIndex].yVel = Math.sin(collisionAngle)*final_xspeed_1+Math.sin(collisionAngle+Math.PI/2)*final_yspeed_1;
                   this.balls[b].xVel = Math.cos(collisionAngle)*final_xspeed_2+Math.cos(collisionAngle+Math.PI/2)*final_yspeed_2;
                   this.balls[b].xVel = Math.sin(collisionAngle)*final_xspeed_2+Math.sin(collisionAngle+Math.PI/2)*final_yspeed_2;
                   break; //esto presupone que solo puede chocar con una bola a la vez. habría que pulirlo
                }
        }
    }
}
    