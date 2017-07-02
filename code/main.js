'use strict';

var canvas;
var stage;



var loader;

function init() {
	//called in nbody.html
	stage = new createjs.Stage("stagecanvas");
	startUp();
}

function startUp() {
	setUp();
	
	
	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(30);
}

function tick() {
	
	stage.update();
}



