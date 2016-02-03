/*
* Udacity front-web nanodegree project 3: Frogger
* Author: Taha Pourjalali
*
*/

var numRows = 6,
	numCols = 5,
	rowHeight = 83,
	colWidth = 101 ;
// helper method for pseudoclassical inheritance
// subClass will inherit from superClass
var inherit = function(subClass,superClass) {
   subClass.prototype = Object.create(superClass.prototype); // delegate to prototype
   subClass.prototype.constructor = subClass; // set constructor on prototype
}

//the super class for Player and Enemy
var Agent = function() {
	this.sprite= "" ; 
	this.x =0 ;
	this.y =0 ;
}
//the update method updates the Agent's location, based on time and the agent's speed. 
Agent.prototype.update = function(dt){console.log("Agent update running \n" );};
//the render method draws the agent on the canvas. 
Agent.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y)  ; 
};
// Enemies our player must avoid
var Enemy = function() {
	Agent.call(this); 
	//the initial y coordinate of all enemies is 2nd row (or somewhere close to it!)
	this.y = 2* rowHeight;
	//the bug png address. 
    this.sprite = 'images/enemy-bug.png';
	//all enemies initially start outside the canvas.
	this.x = -colWidth; 
	//the first pass will be invisible!
	this.speed = 80000 ; 
};
inherit(Enemy, Agent);
//reset function is called when a bug exits the canvas.
Enemy.prototype.reset = function(){
	//place the bug in a random row
	this.y = ( Math.floor(Math.random() *4)+1.5 )* rowHeight;
	//give bug a random speed (though in a defined range)
	this.speed = (Math.random() * 6 +4)* colWidth;
	//place the bug some distance outside canvas. This practically delays the respawn of the bug. 
	this.x =  - (Math.random() *5 +0.5)*  this.speed ; 
} ; 
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	if(this.x >= colWidth * 5){
		this.reset();
		return; 
	}
	this.x += this.speed * dt;
};


var Player = function(){
	Agent.call(this);
	//the player png file
	this.sprite = 'images/char-boy.png'
};
inherit(Player, Agent);
// handleInput method receives user input, allowedKeys (the key which was pressed) and moves the player according to that input..
Player.prototype.handleInput = function(key){
	switch(key){
		case 'left': 
			this.x -= colWidth; 
			break ; 
		case 'right':
			this.x += colWidth;
			break;
		case 'up':
			this.y -= rowHeight; 
			break; 
		case 'down':
			this.y += rowHeight ; 
			break; 
	}
	//the player cannot move off screen
	if(this.y > (numRows -1 )* rowHeight -25){
		this.y = (numRows -1 )* rowHeight -25 ; 
	}
	if(this.x >(numCols -1)*colWidth )
		this.x = (numCols -1)*colWidth  ; 
	if(this.x < 0  )
		this.x =0 ;
};
//the reset function brings the player back to its original location
Player.prototype.reset = function(){
	this.y = (numRows -1 )* rowHeight -25 // a little fine adjustment ; 
	this.x = 2* colWidth ;
}
//update the players position when necessary
Player.prototype.update = function () {
	//did the player reach water?
	if(this.y <= 0){
		this.reset(); 
	}
	
	//collision detection: 
	allEnemies.forEach(function(enemy){
		if(enemy.y < this.y+90 && enemy.y > this.y+ 50)// leave a little room for error
			if(enemy.x > this.x-40 && enemy.x < this.x +40){
				this.reset();
				return;
			}
	}, this);
}
//variables player and allEnemies are used in engine.js
var player = new Player(); 
var allEnemies = [];
//lets have 10 enemies
for (var i = 0 ; i <10; ++i ){
	allEnemies.push(new Enemy());
}


// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
