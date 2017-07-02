'use strict';

var canvas = document.getElementById("stagecanvas");
var stage;
var graphics;

var building = false;
var meteor; //body under construction
var bodyList = [];

var gConst = 1.0;

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
	gravity();
	stage.update();
}

function setUp() {
	var backdrop = new createjs.Shape();
	backdrop.graphics.beginFill("black").rect(0,0,800,600);
	stage.addChild(backdrop);
	
	stage.on("stagemousedown", function(evt) {
		//console.log("stage was clicked at "+evt.stageX+","+evt.stageY);
		building = true;
		meteor = new Body(evt.stageX, evt.stageY, stage);
	})
	
	stage.on("stagemouseup", function(evt) {
		//console.log("stage was unclicked at "+evt.stageX+","+evt.stageY);
		if (building) {
			detach();
		}
	})
}

function detach() {
	building = false;
	meteor.detach();
	bodyList.push(meteor);
}

function gravity() {
	for (var i = 0; i < bodyList.length; i++) {
		for (var j = 0; j < bodyList.length; j++) {
			if (j < i) {
				bodyList[i].attract(bodyList[j]);
			}
		}
	}
}


