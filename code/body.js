
function Body(x, y, stage) {
	this.x = x;
	this.y = y;
	this.xv = 0;
	this.yv = 0;
	
}

Body.prototype.tick() {
	x = x + xv;
	y = y + yv;
}