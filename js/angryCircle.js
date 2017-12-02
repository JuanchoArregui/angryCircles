
////////////////////////////////////////////////////
///////  AngryCircle CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryCircle() {  
   
    this.xPos = $canvas.width()/2;  // $('#xPosIni').val();      // x position.
    this.yPos = $canvas.height()/2; // $('#yPosIni').val();      // y position.
    this.xVel = 150; // $('#xVelIni').val();     // x Initial velocity.
    this.yVel = 160; // $('#yVelIni').val();     // y Initial velocity.
    this.xGravity = 0; // $('#gravity').val();        // Controls how hard gravity pulls on the circle.  1 is normal.ç
    this.yGravity = 10; // $('#gravity').val();        // Controls how hard gravity pulls on the circle.  1 is normal.
    this.spin = 0; //positive value means clockwise spin, and negative counterclockwise

    this.color = colorMain; // Colour of the circle.
    this.radius = 2*angryModule; // $('#radius').val();  // Radius of the circle.
    this.width = angryModule;  // Radius of the circle.
    
    this.bounceRate = 80; // $('#bounceRate').val();     // Bounce rate of the circle as a percentage. Higher number means more bounce.
    this.friction = 2 ; // $('#friction').val();    // Controls the amount of horizontal friction. Higher number equals more friction.
    
    $('#xGravitySlider').value = this.xGravity;
    $('#xGravitySpan').text(this.xGravity) ;
    $('#yGravitySlider').value = this.yGravity;
    $('#yGravitySpan').text(this.yGravity) ;
    $('#bounceRateSlider').value = this.bounceRate;
    $('#bounceRateSpan').text(this.bounceRate) ;
    $('#frictionSlider').value = this.friction;
    $('#frictionSpan').text(this.friction) ;
}


/////////////////////////////////////////////////////
////////////  AngryCircle DRAW METHOD ///////////////
////////////////////////////////////////////////////
AngryCircle.prototype.draw = function() {
 
  // ctx.strokeRect(0, 0, canvas.width, canvas.height);  // Clear the canvas.
  $canvas.clearCanvas();

  $canvas.drawArc({
    layer: true,
    draggable: true,
    bringToFront: true,
    name: 'angryCircle',
    fillStyle: this.color,
    x: this.xPos, y: this.yPos,
    radius: this.radius,

    dragstop: function(layer) {
      var layerName = layer.name;
      console.log('The <strong>' + layerName + '</strong> has been dropped.');
    }

  })
  .drawRect({
    layer: true,
    draggable: true,
    bringToFront: true,
    name: 'redSquare',
    fillStyle: 'red',
    x: 190,
    y: 100,
    width: 100,
    height: 100,
    rotate: 130,
    shadowX: -2,
    shadowY: 5,
    shadowBlur: 3,
    shadowColor: 'rgba(0, 0, 0, 0.5)',

    touchstart: function(layer) {
      console.log("objeto tocado");
    },
    touchend: function(layer) {
     console.log("objeto soltado");
    },
    click: function(layer) {
      console.log("objeto clic");
    }

  });
 // $canvas.drawArc({
 //   fillStyle: 'white',
//    x: this.xPos, y: this.yPos,
//    radius: (this.radius - this.width/2),
//  });

  $("#xPos").text(Math.round(this.xPos));
  $("#yPos").text(Math.round(this.yPos));

  $("#xVel").text(Math.round(this.xVel));
  $("#yVel").text(Math.round(this.yVel));


}


////////////////////////////////////////////////
///////////  AngryCircle MOVE METHOD ///////////
////////////////////////////////////////////////
AngryCircle.prototype.move = function() {

  //effect of gravity
  this.xVel += this.xGravity;
  this.yVel += this.yGravity;
  //effect of friction
  this.xVel *= (1 - this.friction / 100);
  this.yVel *= (1 - this.friction / 100);

  this.xPos += this.xVel;
  this.yPos += this.yVel;
 

  //Boundary collision detection and adding effect of speed loss because of collision
  if (this.xPos + this.radius > $canvas.width() ) {
    this.xPos = $canvas.width()-this.radius;
    console.log("choque RIGHT border ");
    this.xVel *= -1 * this.bounceRate / 100;
  }
  if ( this.xPos - this.radius < 0 ) {
    this.xPos = this.radius;
    console.log("choque LEFT border ");
    this.xVel *= -1 * this.bounceRate / 100;
  }
  if (this.yPos + this.radius > $canvas.height() ) {
    this.yPos = $canvas.height()-this.radius;
    console.log("choque BOTTOM border ");
    this.yVel *= -1 * this.bounceRate / 100;
  }
  if ( this.yPos - this.radius < 0 ) {
    this.yPos = this.radius;
    console.log("choque TOP border "); 
    this.yVel *= -1 * this.bounceRate / 100;
  }
};


////////////////////////////////////////////////
///////////  AngryCircle UPDATE METHOD /////////
////////////////////////////////////////////////
AngryCircle.prototype.update = function() {

  this.angryMoving = setInterval(function(){
    this.move();
    this.draw();

    if (Math.abs(this.xVel)<1 && Math.abs(this.yVel)<1 ){
      this.xVel = 0;
      this.yVel = 0;
      console.log("PELOTA PARADA!");
      clearInterval(this.angryMoving);;
    }
    
}.bind(this), frameRate);

};
