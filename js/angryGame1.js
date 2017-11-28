
function initAngryGame1() {

  // Get the canvas.
  //var canvas = $("#canvas");
  var canvas = document.getElementById("canvas");

  // Get the 2d context globally 
  var ctx = canvas.getContext('2d');
  // alert if there is any problem with the canvas 
  if (!canvas.getContext) {
    alert ("Ops, canvas is not supported!! I think you should upadtae your browser...")
  }

  // Create new angryCircle.
  var angryCircle = new AngryCircle(canvas, ctx);

  angryCircle.draw();
  angryCircle.update();
  debugger;
}
