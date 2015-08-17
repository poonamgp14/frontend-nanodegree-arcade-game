// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 250 + 1);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

        this.x += dt * this.speed;
        if(this.x > 505) {
            this.x = Math.random() * -1000;
        }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.startX = 200;
    this.startY = 385;
}

Player.prototype.update = function(dt){

    this.checkForCollision();

    if (this.startY < 50){
        this.rePosition();
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.startX, this.startY);
};

Player.prototype.handleInput = function(direction){
    if (direction === 'up' && this.startY > 50){
        this.startY -= 80;
    }
    if (direction === 'down' && this.startY < 385){
        this.startY += 80;
    }
    if (direction === 'left' && this.startX > 50){
        this.startX -= 100;
    }
    if (direction === 'right' && this.startX < 350){
        this.startX += 100;
    }
};

Player.prototype.checkForCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var collisionX = Math.abs(player.startX - allEnemies[i].x);
        var collisionY = Math.abs(player.startY - allEnemies[i].y);

        if(collisionX < 20 && collisionY < 20) {
            this.rePosition();
        }
    }
};

Player.prototype.rePosition = function(){
    this.startX = 200;
    this.startY = 385;
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var numberOfEnemies = 12;
var i=0;
while (i < 11){
    var startX_Bug = -500;
    startX_Bug = startX_Bug + 100;
    for (var i2 = 0; i2 < 4; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,220)
        i++;
    }
    //i = allEnemies.length;
    startX_Bug = -400;
    for (var i2 = 4; i2 < 8; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,140)
        i++
    }
    startX_Bug = -700;
    //i = allEnemies.length;
    for (var i2 = 8; i2 < 11; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,60)
        i++;
    }
    //i = allEnemies.length;

};






var player = new Player();


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
