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
        if(this.x > 905) {
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
    this.startX = 420;
    this.startY = 400;
    this.score = 0;
    this.lives = 3;
}

Player.prototype.update = function(dt){

    this.checkForCollision();
    //TODO - if lives is zero or less than zero then restart the game

    if (this.startY < 0){
        this.rePosition();
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.startX, this.startY);
    ctx.fillStyle = "black";
    ctx.font = '33px serif';
    ctx.fillText("Score: " + this.score, 0, 40);
    ctx.fillText("Lives: " + this.lives, 400, 40);
};

Player.prototype.handleInput = function(direction){
    if (direction === 'up' && this.startY > 5){
        this.startY -= 65;
    }
    if (direction === 'down' && this.startY < 385){
        this.startY += 65;
    }
    if (direction === 'left' && this.startX > 50){
        this.startX -= 85;
    }
    if (direction === 'right' && this.startX < 750){
        this.startX += 85;
    }
};

Player.prototype.checkForCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {

        var collisionX = Math.abs(player.startX - allEnemies[i].x);
        var collisionY = Math.abs(player.startY - allEnemies[i].y);

        if(collisionX < 40 && collisionY < 40) {
            this.score-- ;
            this.lives-- ;
            this.rePosition();
        }
    }
};

Player.prototype.rePosition = function(){
    this.startX = 420;
    this.startY = 400;
}

var Heart = function(x,y){
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
};

Heart.prototype.update = function(dt){

    //TODO -


};

Heart.prototype.render = function(){

    ctxHeart.drawImage(Resources.get(this.sprite), this.x, this.y,this.width,this.height);
};

var heart = new Heart(15,115);
var heart1 = new Heart(15+95*2,115);
var heart2 = new Heart(15+95*4,115);
var heart3 = new Heart(15+95*6,115);
var heart4 = new Heart(15+95*8,115);
var heart5 = new Heart(15,(63*6)-15);
var heart6 = new Heart(15+95*2,(63*6)-15);
var heart7 = new Heart(15+95*4,(63*6)-15);
var heart8 = new Heart(15+95*6,(63*6)-15);
var heart9 = new Heart(15+95*8,(63*6)-15);
var allHeart = [heart,heart1,heart2,heart3,heart4,heart5,heart6,heart7,heart8,heart9];



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var numberOfEnemies = 8;
var i=0;
while (i < 8){
    var startX_Bug = -500;
    startX_Bug = startX_Bug + 100;
    for (var i2 = 0; i2 < 2; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,100)
        i++;
    }
    //i = allEnemies.length;
    startX_Bug = -400;
    for (var i2 = 2; i2 < 5; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,(100+63))
        i++
    }
    startX_Bug = -700;
    //i = allEnemies.length;
    for (var i2 = 5; i2 < 8; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,(100+63+63))
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
