////////////////////////////////////////////////
///////////  AngryGame UPDATE METHOD /////////
////////////////////////////////////////////////
AngryGame.prototype.update = function() {
    if (this.numBalls > 0) {
        this.angryMoving = setInterval(function(){
            for (var ballIndex=0; ballIndex<this.numBalls ; ballIndex++ ){
                this.ballMovement(ballIndex);
                this.borderCollisionDetection(ballIndex);
                this.ballCollisionDetection(ballIndex);
                this.pointerInsideBall(ballIndex);
                }
            this.draw();
            this.checkIfAllBallsStopped();

        }.bind(this), frameRate);
    }
};



/////////////////////////////////////////////////////
////////  AngryGame BALLIndex MOVEMENT METHOD ///////
/////////////////////////////////////////////////////
AngryGame.prototype.ballMovement = function(ballIndex) {
    
    //store the prvious position 
    this.balls[ballIndex].xPosPrev = this.balls[ballIndex].xPos;
    this.balls[ballIndex].yPosPrev = this.balls[ballIndex].yPos;


    //effect of gravity or friction ()
    if (this.xGravity === 0 && this.yGravity === 0){
        console.log("friction");
    //if there is no gravity then its supposed we are playing in a flat table with the effect of friction
    this.balls[ballIndex].xVel = Math.floor( this.balls[ballIndex].xVel * (1 - this.friction / 100) );
    this.balls[ballIndex].yVel = Math.floor( this.balls[ballIndex].yVel * (1 - this.friction / 100) );
    this.balls[ballIndex].spin = Math.floor( this.balls[ballIndex].spin * (1 - this.friction / 100) );
    }
   /*
    else if ( !(this.xVel === 0 && ( this.xPos === this.canvasWidth - this.balls[ballIndex].radius || this.xPos === this.balls[ballIndex].radius ))) {
    console.log("hurraXXXXXXXXXXXXXXX")
    }
    else if ( !(this.yVel === 0 && ( this.yPos === this.canvasHeight - this.balls[ballIndex].radius || this.yPos === this.balls[ballIndex].radius ))) {
    console.log("hurraYYYYYYYYYYYY")
    }
    */

    else{
    //if there is gravity then its supposed we are playing in the air and there is no friction
    this.balls[ballIndex].xVel += this.xGravity;
    this.balls[ballIndex].yVel += this.yGravity;
    }

    //new position and spin
    this.balls[ballIndex].xPos += this.balls[ballIndex].xVel;
    this.balls[ballIndex].yPos += this.balls[ballIndex].yVel;
    this.balls[ballIndex].angle += this.balls[ballIndex].spin;
     
    };



    
/////////////////////////////////////////////////////
////////////  AngryGame DRAW METHOD ///////////////
////////////////////////////////////////////////////
AngryGame.prototype.draw = function() {
    
        // Clear the canvas.
        this.canvas.clearCanvas();
        // console.log("drawing ");
         
        var that = this;
        
        this.canvas.drawText({
        fillStyle: colorSecondary,
        x: 150, 
        y: 100,
        fontSize: 20,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'left',
        text: 'X-grav: '+ this.xGravity + '\nY-grav: ' + this.yGravity + '\nBounce rate: ' +   this.bounceRate + '%\nBounce rate: ' + this.friction + '%'
        });
         
        for (var i = 0; i<this.balls.length ; i++){
            this.canvas.drawImage({
            source: './images/angryBall.png',
            rotate: that.balls[i].angle,
            x: that.balls[i].xPos,
            y: that.balls[i].yPos,
            width: 2*that.balls[i].radius,
            height: 2*that.balls[i].radius,
            });
        }
        if ( $("#showDataOnCanvas").is(':checked') ){
            for (var i = 0; i<this.balls.length ; i++){
                this.canvas.drawRect({
                fillStyle: 'rgba(255, 255, 255, 0.7)',
                x: that.balls[i].xPos,
                y: that.balls[i].yPos,
                width: 120,
                height: 50,
                cornerRadius: 10
                });

                this.canvas.drawText({
                fillStyle: colorSecondary,
                x: that.balls[i].xPos, 
                y: that.balls[i].yPos,
                fontSize: 15,
                fontFamily: 'Arial',
                fontStyle: 'bold',
                align: 'center',
                text: "Pos: "+ that.balls[i].xPos + ', ' + that.balls[i].yPos + "\nVel: " + that.balls[i].xVel + ', ' + that.balls[i].yVel + "\nSpin: " + that.balls[i].spin
                });
            }
        }
    
    }  
    


/////////////////////////////////////////////////////
////////  AngryGame CHECK IF STOP METHOD ///////
/////////////////////////////////////////////////////
AngryGame.prototype.checkIfAllBallsStopped = function() {
    
    //this is to prevent infinitesimal movements
    var that = this;
    this.balls.every ( function (ball) {
        if (ball.xPos === ball.xPosPrev && ball.yPos === ball.yPosPrev && ball.spin === 0) {
            that.gameStopped = true;
        return true;  // seguir con el siguiente elemento
        
        } else {
            that.gameStopped = false;
        return false; // terminar el bucle en este elemento
        }
    });
    if (this.gameStopped==true){
        console.log("ALL THE BALLS ARE STOPPED");
            angryGame.canvas.drawText({
            fillStyle: colorSecondary,
            x: angryGame.canvas.width()/2, 
            y: angryGame.canvas.height()/2,
            fontSize: 90,
            fontFamily: 'Arial',
            fontStyle: 'bold',
            align: 'center',
            text: 'All the balls are stopped.\nDrag anyone to keep playing!',
            maxWidth: angryGame.canvas.width()*0.8
            });
        clearInterval(this.angryMoving);
        if ( $("#button-play").hasClass( "is-active" ) ) {
            $("#button-play").toggleClass("is-active");
            $("#button-play").text(" ► Play");
            }
    }
}  