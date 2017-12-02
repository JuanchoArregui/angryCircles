var $myCanvas = $('#myCanvas');

$myCanvas.drawRect({
  layer: true,
  draggable: true,
  bringToFront: true,
  name: 'blueSquare',
  fillStyle: 'steelblue',
  x: 250,
  y: 150,
  width: 100,
  height: 100,
  rotate: 80,
  shadowX: -1,
  shadowY: 8,
  shadowBlur: 2,
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  dragstop: function(layer) {
    var layerName = layer.name;
    document.getElementById('output').innerHTML = 'The <strong>' + layerName + '</strong> layer has been dropped.';
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
  dragstop: function(layer) {
    var layerName = layer.name;
    document.getElementById('output').innerHTML = 'The <strong>' + layerName + '</strong> layer has been dropped.';
  }
});