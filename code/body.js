'use strict';

// ref: https://stackoverflow.com/questions/387707/what-techniques-can-be-used-to-define-a-class-in-javascript-and-what-are-their

function Body(x, y, stage) {
	console.log ("creating new body.");
	this.x = mousePos.x;
	this.y = mousePos.y;
	this.xv = 0;
	this.yv = 0;
	this.volume = 5;
	
	this.mouseHistory = [];
	this.updateMouseHistory();
	
	this.clip = new createjs.Shape();
	this.redraw();
	stage.addChild(this.clip);
}

Body.prototype.tick = function() {
	this.x += this.xv;
	this.y += this.yv;
	this.clip.x = this.x;
	this.clip.y = this.y;
}

Body.prototype.enlarge = function() {
	//console.log ("enlarging: mouse: " + mousePos.x + ", " + mousePos.y);
	this.x = mousePos.x;
	this.y = mousePos.y;
	this.updateMouseHistory();
	this.volume += 5;
	this.redraw();
}

Body.prototype.redraw = function() {
	//radius is cube root of volume. Meh, times some constant.
	var radius = Math.pow(this.volume, 1/3);
	this.clip.graphics.clear().beginFill("white").drawCircle(0, 0, radius);
	this.clip.x = this.x;
	this.clip.y = this.y;
}

Body.prototype.updateMouseHistory = function() {
	var mh = {x: mousePos.x, y : mousePos.y};
	//console.log ("pushing to mouseHistory");
	this.mouseHistory.push(mh);
}

Body.prototype.detach = function() {
	if (this.mouseHistory.length > 2) {
		var stepsBack = 5;
		if (this.mouseHistory.length < 5) {
			stepsBack = mouseHistory.length;
		}
		var mStart = this.mouseHistory[this.mouseHistory.length - stepsBack];
		var mEnd = this.mouseHistory[this.mouseHistory.length - 1];
		//console.log (mStart, mEnd, stepsBack);
		var diffX = mEnd.x - mStart.x;
		var diffY = mEnd.y - mStart.y;
		
		this.xv = diffX / stepsBack;
		this.yv = diffY / stepsBack;
	}
	this.mouseHistory = [];
	//console.log ("detached. xv=" + this.xv + " yv=" + this.yv);
}