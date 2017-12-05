////////////////////////////////////////////////////
///////  AngryGame CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryGame() {

    
    this.balls = [];
    this.maxNumBalls = 15;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseOnBall = false;
    this.mouseActive = false;
    this.activeBall = 0;


    // this.browserX = window.screenX;
    // this.browserY = window.screenY;
    //this.stageWidth = $canvas.width();
    //this.stageHeight = $canvas.height();

}



/////////////////////////////////////////////////////
////////////  AngryGame DRAW METHOD ///////////////
////////////////////////////////////////////////////
AngryGame.prototype.draw = function() {

   //  console.log("draw GAME");
    // Clear the canvas.

    $canvas.clearCanvas();
     
    var that = this;
     
    for (var i = 0; i<this.balls.length ; i++){
        $canvas.drawImage({
        source: './images/angry.png',
        rotate: that.balls[i].angle,
        x: that.balls[i].xPos,
        y: that.balls[i].yPos,
        width: 2*that.balls[i].radius,
        height: 2*that.balls[i].radius,
        });
    }
}  


////////////////////////////////////////////////
///////////  AngryGame UPDATE METHOD /////////
////////////////////////////////////////////////
AngryGame.prototype.update = function() {
    
    this.angryMoving = setInterval(function(){

        for (var m=0; m<this.balls.length ; m++ ){
            this.balls[m].move();
            }
        this.draw();
        

        /*
            if (Math.abs(this.xVel)<1 && Math.abs(this.yVel)<1 ){
            this.xVel = 0;
            this.yVel = 0;
            console.log("PELOTA PARADA!");
            clearInterval(this.angryMoving);
            }
        */

       

        
    }.bind(this), frameRate);
    
    };


////////////////////////////////////////////////
///////////  AngryGame mouseIsInsideBall METHOD /////////
////////////////////////////////////////////////
AngryGame.prototype.mouseIsInsideBall = function() {

    for (var i = 0; i<this.balls.length ; i++){
        var dist = Math.sqrt( Math.pow((this.mouseX - this.balls[i].xPos), 2) + Math.pow((this.mouseY - this.balls[i].yPos), 2) );
        if (  dist < this.balls[i].radius){
            inside = true;
            this.mouseOnBall = true;
            this.activeBall = i;
            break;
        }
        else{this.mouseOnBall = false;}
    }
    return this.mouseOnBall;

}
