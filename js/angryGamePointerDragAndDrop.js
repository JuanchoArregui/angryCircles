


////////////////////////////////////////////////
///////////  AngryGame mouseIsInsideBall METHOD ///////// REVISAR SI SE USA ESTO
////////////////////////////////////////////////
AngryGame.prototype.pointerInsideBall = function(ballIndex) {

    var dist = Math.sqrt( Math.pow((this.pointerX - this.balls[ballIndex].xPos), 2) + Math.pow((this.pointerY - this.balls[ballIndex].yPos), 2) );
    
    if ( dist < this.balls[ballIndex].radius ){
    this.pointerOnBall = true;
    this.canvas.css('cursor', 'pointer');
    this.activeBall = ballIndex;
    console.log("IN");
    //this.balls[this.activeBall].xPos = this.mouseX;
    //this.balls[this.activeBall].yPos = this.mouseY;

    }
    else{
    this.pointerOnBall = false;
    this.canvas.css('cursor', 'default');
    this.activeBall = "";
    }

//console.log("pointer:" + this.pointerOnBall);
//return this.pointerOnBall;
    
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
    
      