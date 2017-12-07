
    //  Set the listeners associated to the canvas:

    $canvas.mousemove(function(event){
        angryGame.mouseX = event.clientX - $canvas.position().left;
        angryGame.mouseY = event.clientY - $canvas.position().top;
        if (angryGame.mouseIsInsideBall() ){
          $canvas.css('cursor', 'pointer');
            if (angryGame.mouseActive) {
              angryGame.balls[angryGame.activeBall].xPos = angryGame.mouseX;
              angryGame.balls[angryGame.activeBall].yPos = angryGame.mouseY;
            }
        } 
        else{
          $canvas.css('cursor', 'default');
          angryGame.mouseActive = false;
        }  
      });
  
      $canvas.mousedown(function() {
        if (angryGame.mouseOnBall){ angryGame.mouseActive = true } 
      });
  
      $canvas.mouseup(function() {
        if (angryGame.mouseIsInsideBall()){ angryGame.mouseActive = false } 
      });
  
  
  
      $canvas.on('touchstart', function(event){
        angryGame.mouseX = event.touches[0].pageX;
        angryGame.mouseX = event.touches[0].pageY;
        console.log("TOUCHING: " + angryGame.mouseX + ", " + angryGame.mouseY);
        
      });
      
      $canvas.mouseleave(function(event){
          console.log("el mouse está fuera del canvas!!!!!!!");
      });
  



////////////////////////////////////////////////
//        KK esto ya está en el GAME creo que se puede borrar sin problemas
///////////  angryBall UPDATE METHOD /////////
////////////////////////////////////////////////
AngryBall.prototype.update = function() {
    
      this.angryMoving = setInterval(function(){
        this.move();
        this.draw();
    
        if (Math.abs(this.xVel)<1 && Math.abs(this.yVel)<1 ){
          this.xVel = 0;
          this.yVel = 0;
          console.log("PELOTA PARADA!");
          clearInterval(this.angryMoving);
        }
        
    }.bind(this), frameRate);
    
    };
    