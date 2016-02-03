/*
The Enemy function, which initiates the Enemy by:
Loading the image by setting this.sprite to the appropriate image in the image folder (already provided)
Setting the Enemy initial location (you need to implement)
Setting the Enemy speed (you need to implement)
The update method for the Enemy
Updates the Enemy location (you need to implement)
Handles collision with the Player (you need to implement)
You can add your own Enemy methods as needed
You will also need to implement the Player class, and you can use the Enemy class as an example on how to get started. At minimum you should implement the following:
The Player function, which initiates the Player by:
Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that)
Setting the Player initial location
The update method for the Player (can be similar to the one for the Enemy)
The render method for the Player (use the code from the render method for the Enemy)
The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
You can add your own Player methods as needed.
Once you have completed implementing the Player and Enemy, you should instantiate them by:
Creating a new Player object
Creating several new Enemies objects and placing them in an array called allEnemies
*/
// pseudoclassical inheritance
// subClass will inherit from superClass
var inherit = function(subClass,superClass) {
   subClass.prototype = Object.create(superClass.prototype); // delegate to prototype
   subClass.prototype.constructor = subClass; // set constructor on prototype
}
var Agent = function() {
	this.sprite= "" ; 
	this.x =0 ;
	this.y =202 ;
}
Agent.prototype.update = function(dt){};

// Enemies our player must avoid
var Enemy = function() {
	Agent.call(this); 
    this.sprite = 'images/enemy-bug.png';
	this.x = -101; 
	this.speed = 800 ; 
};
inherit(Enemy, Agent);
Enemy.prototype.render = function (){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y)  ; 
};
Enemy.prototype.reset = function(){
	this.y = ( Math.floor(Math.random() *5)+1.5 )* 83;
	this.speed = (Math.random() * 8 +4)* 101;
	this.x =  - (Math.random() *5 +0.5)*  this.speed ; 
} ; 
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	if(this.x >= 101 * 5){
		this.reset();
		return; 
	}
	this.x += this.speed * dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
//col * 101, row * 83

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
	
};
inherit(Player, Agent);
Player.prototype.handleInput = function(){
	
};
Player.prototype.render = function(){}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(); 
var allEnemies = [];
for (var i = 0 ; i < 8; ++i ){
	allEnemies.push(new Enemy());
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
