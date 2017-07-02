'use strict';

var canvas;
var stage;
var graphics;


var building = false;
var meteor; //body under construction
var bodyList = [];

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
	if (building) {
		meteor.enlarge();
	}
	for (var i = 0; i < bodyList.length; i++) {
		bodyList[i].tick();
	}
	stage.update();
}

function setUp() {
	var backdrop = new createjs.Shape();
	backdrop.graphics.beginFill("black").rect(0,0,800,600);
	stage.addChild(backdrop);
	
	stage.on("stagemousedown", function(evt) {
		//console.log("the canvas was clicked at "+evt.stageX+","+evt.stageY);
		building = true;
		meteor = new Body(evt.stageX, evt.stageY, stage);
	})
	
	stage.on("stagemouseup", function(evt) {
		//console.log("the canvas was unclicked at "+evt.stageX+","+evt.stageY);
		if (building) {
			detach();
			bodyList.push(meteor);
		}
	})
}

function detach() {
	building = false;
	
}