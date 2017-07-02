'use strict';

var canvas;
var stage;
var graphics;


var building = false;

function init() {
	//called in nbody.html
	stage = new createjs.Stage("stagecanvas");
	graphics = new createjs.Graphics();
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

function setUp() {
	var backdrop = new createjs.Shape();
	backdrop.graphics.beginFill("black").rect(0,0,800,600);
	stage.addChild(backdrop);
	
	stage.on("stagemousedown", function(evt) {
		console.log("the canvas was clicked at "+evt.stageX+","+evt.stageY);
	})
	
	stage.on("stagemouseup", function(evt) {
		console.log("the canvas was unclicked at "+evt.stageX+","+evt.stageY);
	})

}

