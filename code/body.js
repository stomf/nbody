'use strict';

function Body(x, y, stage) {
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	this.volume = 5;
	
	//radius is cube root of volume. Meh, times some constant.
	
	
	this.clip = new createjs.Shape();
	this.redraw();
	stage.addChild(this.clip);
}

Body.prototype.tick = function() {
	this.x = this.x + this.xv;
	this.y = this.y + this.yv;
}

Body.prototype.enlarge = function() {
	//console.log ("mouse: " + mousePos.x + ", " + mousePos.y);
	this.x = mousePos.x;
	this.y = mousePos.y;
	this.volume += 5;
	this.redraw();
}

Body.prototype.redraw = function() {
	var radius = Math.pow(this.volume, 1/3);
	this.clip.graphics.clear().beginFill("white").drawCircle(this.x, this.y, radius);
	
}