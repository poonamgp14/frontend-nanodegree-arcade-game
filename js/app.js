var isCollision = false;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 250 + 1);
    this.width = 70;
    this.height = 30;
}

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

        this.x += dt * this.speed;
        if(this.x > 905) {
            this.x = Math.random() * -1000;
        }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}
//PLAYER CLASS AND ITS METHODS
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 420;
    this.y = 400;
    this.score = 0;
    this.lives = 3;
    this.width = 20;
    this.height = 40;
}

Player.prototype.update = function(dt){

    //this.checkForCollision();
    this.enemyCollision();
    //TODO - if lives is zero or less than zero then restart the game

    if (this.y < 0){
        this.rePosition();
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "black";
    ctx.font = '33px serif';
    ctx.fillText("Score: " + this.score, 0, 40);
    ctx.fillText("Lives: " + this.lives, 400, 40);
};

Player.prototype.handleInput = function(direction){
    if (direction === 'up' && this.y > 5){
        this.y -= 65;
    }
    if (direction === 'down' && this.y < 385){
        this.y += 65;
    }
    if (direction === 'left' && this.x > 50){
        this.x -= 65;
    }
    if (direction === 'right' && this.x < 750){
        this.x += 65;
    }
};

Player.prototype.enemyCollision = function(){
    var collEnemy = checkForCollision(allEnemies,player);
    if (collEnemy){
        this.score-- ;
        this.lives-- ;
        isCollision = false;
        //console.log("yes,collision occured with enemy");
        this.rePosition();
    }

};

Player.prototype.rePosition = function(){
    this.x = 420;
    this.y = 400;
}

//HEART CLASS AND ITS METHODS
var Heart = function(x,y){
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
};

Heart.prototype.update = function(dt){
    this.heartCollision();

    //TODO -setinterval function for pounding of heart
};

Heart.prototype.render = function(){

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.width,this.height);
};

Heart.prototype.heartCollision = function(){
    var collHeart = checkForCollision(allHeart,player);
    if (collHeart){
        player.score++ ;
        player.lives++ ;
        isCollision = false;
        //do something
    }
};



// player object
var player = new Player();


//creating heart object
//TODO - CREATE A LOOP FOR HEART INSTANCES
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

//


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

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


var checkForCollision = function(arrayOfObj,anotherObj) {
    for (var i = 0; i < arrayOfObj.length; i++) {

        //var collisionX = Math.abs(anotherObj.x - arrayOfObj[i].x);
        //var collisionY = Math.abs(anotherObj.y - arrayOfObj[i].y);

        if (anotherObj.x < arrayOfObj[i].x + arrayOfObj[i].width
            && anotherObj.x + anotherObj.width  > arrayOfObj[i].x
            && anotherObj.y < arrayOfObj[i].y + arrayOfObj[i].height
            && anotherObj.y + anotherObj.height > arrayOfObj[i].y) {
        //if((collisionX < 40 && collisionY < 40)){
                console.log("yes!"+ arrayOfObj[i] +" collided wid "+ "player")
                //console.log(distance);
                return isCollision = true;


        }
    }
};

//function measureDistance(x1,y1,x2,y2){
//    var dist = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
//    return dist
//}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
