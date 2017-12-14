////////////////////////////////////////////////////
///////  AngryGame CONSTRUCTOR FUNCTION //////////
////////////////////////////////////////////////////
function AngryGame() {

    this.canvas = $('#canvas');
    this.canvasWidth;
    this.canvasHeight;
    this.balls = [];
    this.numBalls = 0;
    this.maxNumBalls = 15;
    this.animations = [];
    this.tagets = [];
    this.obstacles = [];
    this.pointerX = 0;
    this.pointerY = 0;
    this.pointerOnBall = false;
    this.pointerctive = false;
    this.activeBall = 0;
    this.xGravity = 0; // $('#gravity').val();        // Controls how hard gravity pulls on the BallangryBall.  1 is normal.ç
    this.yGravity = 5; // $('#gravity').val();        // Controls how hard gravity pulls on the BallangryBall.  1 is normal.
    this.bounceRate = 90; // $('#bounceRate').val();     // Bounce rate of the BallangryBall as a percentage. Higher number means more bounce.
    this.friction = 2 ; // $('#friction').val();    // Controls the amount of horizontal friction. Higher number equals more friction.
    this.angryMoving; // we use this to stop the update method with a clearinterval
    this.gameStopped = false;


    // we update the sliders
    //I dont know why, but jquery doesnt update the slider properly. it work fine with document.getElementById
    document.getElementById('xGravitySlider').value = this.xGravity;
    // $('#xGravitySlider').value = this.xGravity;
    $('#xGravitySpan').text(this.xGravity) ;
    document.getElementById('yGravitySlider').value = this.yGravity;
    $('#yGravitySpan').text(this.yGravity) ;

    document.getElementById('bounceRateSlider').value = this.bounceRate;
    $('#bounceRateSpan').text(this.bounceRate  + "%") ;

    document.getElementById('frictionSlider').value = this.friction;
    $('#frictionSpan').text(this.friction + "%") ;


}


