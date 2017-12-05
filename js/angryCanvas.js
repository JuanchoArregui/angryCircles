
/////////////////////////////////////////////////
///////////////  SET CANVAS  ////////////////////
/////////////////////////////////////////////////

function setAngryCanvas() {
    //alert("activado evento resize");

    //if there is any previous canvas is deleted
    $('#canvas').remove();

    // Get the size of the display window to Maximize the width and height of the canvas
    var ww = this.innerWidth;
    var wh = this.innerHeight;
    console.log( "////////////////////");
    console.log( "window width: " + ww);
    console.log( "  ''  height: " + wh);
    // Set the max new size for the canvas
    // we calculate the size subtracting the margins established in the design to the size of the window
    console.log(angryModule);
    
    var cw = ww - 4*angryModule;
    var ch = wh - 16*angryModule;
    console.log( "canvas width: " + cw);
    console.log( "  ''  height: " + ch);
    $( "#canvas-outfit" ).append( '<canvas id="canvas" width="' + cw + '" height="' + ch + '" class = "pink"></canvas>' );
    $( "#canvas-outfit" ).width(cw);
    $( "#canvas-outfit" ).height(ch);

    $canvas = $('#canvas');

    
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


    
    //estudiar esto:
    var pointerEventToXY = function(e){
      var out = {x:0, y:0};
      if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        out.x = touch.pageX;
        out.y = touch.pageY;
      } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        out.x = e.pageX;
        out.y = e.pageY;
      }
      return out;
    };

    $canvas.on('mouseover touchcancel', function(e){
      console.log(pointerEventToXY(e)); // will return obj ..kind of {x:20,y:40}
    });

    
    $canvas.on('touchmove', function(e){
      console.log(pointerEventToXY(e)); // will return obj ..kind of {x:20,y:40}
    })

  
}
