'use strict';

// ref: https://stackoverflow.com/questions/387707/what-techniques-can-be-used-to-define-a-class-in-javascript-and-what-are-their

function Body(x, y, stage) {
	//console.log ("creating new body.");
	this.x = mousePos.x;
	this.y = mousePos.y;
	this.xv = 0;
	this.yv = 0;
	this.volume = 5;
	this.radius = 1;
	this.doomed = false;
	
	this.mouseHistory = [];
	this.updateMouseHistory();
	
	this.clip = new createjs.Shape();
	this.redraw();
	stage.addChild(this.clip);
}

Body.prototype.tick = function() {
	//console.log (this.xv, this.yv);
	this.x += this.xv;
	this.y += this.yv;
	this.clip.x = this.x;
	this.clip.y = this.y;
	
	if (this.x < -800 || this.y < -800 || this.x > 1600 || this.y > 1440) {
		this.doomed = true;
	}
}

Body.prototype.enlarge = function() {
	//console.log ("enlarging: mouse: " + mousePos.x + ", " + mousePos.y);
	this.x = mousePos.x;
	this.y = mousePos.y;
	this.updateMouseHistory();
	this.volume += 5;
	this.redraw();
}

Body.prototype.destroy = function(stage) {
	stage.removeChild(this.clip);
	this.clip = null;
}

Body.prototype.redraw = function() {
	//radius is cube root of volume. Meh, times some constant.
	this.radius = Math.pow(this.volume, 1/3);
	this.clip.graphics.clear().beginFill("white").drawCircle(0, 0, this.radius);
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
			stepsBack = this.mouseHistory.length;
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

Body.prototype.attract = function(otherBody) {
	var distX = this.x - otherBody.x;
	var distY = this.y - otherBody.y;
	var sqDist = (distX * distX) + (distY * distY);
	var dist = Math.sqrt(sqDist);
	if (dist < this.radius + otherBody.radius) {
		this.collide(otherBody);
	}
	else {
		var force = gConst * (this.volume * otherBody.volume)/sqDist;
		
		var thisImpulse = force/this.volume;
		var otherImpulse = force/otherBody.volume;
		
		//normalise vector distX/distY
		distX = distX / dist;
		distY = distY / dist;
		
		this.xv -= distX * thisImpulse;
		this.yv -= distY * thisImpulse;
		
		otherBody.xv += distX * otherImpulse;
		otherBody.yv += distY * otherImpulse;
	}
}

Body.prototype.collide = function(otherBody) {
	if (otherBody.volume > this.volume) {
		//this could be better
		this.x = otherBody.x;
		this.y = otherBody.y;
	}
	
	var xForce = this.xv * this.volume + otherBody.xv * otherBody.volume;
	var yForce = this.yv * this.volume + otherBody.yv * otherBody.volume;
	
	this.volume += otherBody.volume;
	this.xv = xForce / this.volume;
	this.yv = yForce / this.volume;
	otherBody.doomed = true;
	
	this.redraw();

}

