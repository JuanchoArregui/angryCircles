
/////////////////////////////////////////////////////
////////////  angryBall DRAW METHOD ///////////////
////////////////////////////////////////////////////
AngryBall.prototype.draw = function() {
    console.log("draw");
     // ctx.strokeRect(0, 0, canvas.width, canvas.height);  // Clear the canvas.
     $canvas.clearCanvas();
     
     var that = this;
     
     console.log();
     $canvas.drawImage({
       source: './images/angry.png',
       layer: true,
       draggable: true,
       bringToFront: true,
       name: 'angryBallangryBall',
       fillStyle: this.color,
       x: this.xPos, y: this.yPos,
       width: 2*this.radius,
       height: 2*this.radius,
       rotate: this.angle,
   
   
       click: function(layer) {
         console.log("CLICK");
         },
   
       dragstart: function(layer) {
         clearInterval(that.angryMoving);
         console.log("DRAGSTART");
         that.angrySpeedDrag = setInterval(function(){
           that.xPosPrev = layer.eventX;
           that.yPosPrev = layer.eventY;
         //console.log("posición prev: " + that.xPos + ", " + that.yPos);
         }, frameRate);
       },
   
       drag: function(layer) {
         that.xPos = layer.eventX;
         that.yPos = layer.eventY;
         console.log("dragging");
   
       },
   
       dragstop: function(layer) {
         clearInterval(that.angrySpeedDrag);
   
         var difX = that.xPos - that.xPosPrev;
         var difY = that.yPos - that.yPosPrev;
   
         that.xVel = 10*difX/frameRate;
         that.yVel = 10*difY/frameRate;
   
         
         console.log("fin TOUCH" );
         console.log("Vel X: " + that.xVel );
         console.log("Vel Y: " + that.yVel );
   
         that.update();
   
       }
   
     });
   
   
   
   }


