
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
    
            this.canvas.drawText({
            fillStyle: colorSecondary,
            x: that.balls[i].xPos + 75, 
            y: that.balls[i].yPos + 75,
            fontSize: 15,
            fontFamily: 'Arial',
            fontStyle: 'bold',
            align: 'left',
            text: that.balls[i].xPos + ', ' + that.balls[i].yPos
            });
        }
    
        
    
        $("#xPos").text(Math.round(this.balls[0].xPos));
        $("#yPos").text(Math.round(this.balls[0].yPos));
      
        $("#xVel").text(Math.round(this.balls[0].xVel));
        $("#yVel").text(Math.round(this.balls[0].yVel));
    
        $("#spin").text(Math.round(this.balls[0].spin));
    
    
    }  
    
    