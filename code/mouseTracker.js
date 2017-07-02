'use strict';

var mousePos;

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(canvas, evt);
	//console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
  }, false);
