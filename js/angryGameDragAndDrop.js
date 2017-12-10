


////////////////////////////////////////////////
///////////  AngryGame mouseIsInsideBall METHOD ///////// REVISAR SI SE USA ESTO
////////////////////////////////////////////////
AngryGame.prototype.pointerInsideBall = function() {
    
        for (var i = 0; i<this.balls.length ; i++){
            var dist = Math.sqrt( Math.pow((this.mouseX - this.balls[i].xPos), 2) + Math.pow((this.mouseY - this.balls[i].yPos), 2) );
            if (  dist < this.balls[i].radius){
                inside = true;
                this.pointerOnBall = true;
                this.activeBall = i;
                break;
            }
            else{this.pointerOnBall = false;}
        }
        return this.pointerOnBall;
    
    }
    
    
////////////////////////////////////////////////
/////  AngryGame pointerEventToXY METHOD   /////
////////////////////////////////////////////////
AngryGame.prototype.pointerEventToXY = function(event){

    if(event.type == 'touchstart' || event.type == 'touchmove' || event.type == 'touchend' || event.type == 'touchcancel'){
        var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
        this.pointerX = touch.pageX - this.canvas.position().left;
        this.pointerY = touch.pageY - this.canvas.position().top;
    }
    else if (event.type == 'mousedown' || event.type == 'mouseup' || event.type == 'mousemove' || event.type == 'mouseover'|| event.type=='mouseout' || event.type=='mouseenter' || event.type=='mouseleave') {
        this.pointerX = event.pageX - this.canvas.position().left;
        this.pointerY = event.pageY - this.canvas.position().top;
    }
};
    
      