
function Body(x, y, stage) {
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	this.volume = 1;
	
	//radius is cube root of volume. Meh, times some constant.
	radius = Math.pow(this.volume, 1/3);
	
	this.clip = new createjs.Shape();
	this.clip.graphics.beginFill("white").drawCircle(this.x, this.y, radius);
	stage.addChild(this.clip);
}

Body.prototype.tick = function() {
	this.x = this.x + this.xv;
	this.y = this.y + this.yv;
}

