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
    this.game_over = false;
    this.isGemCollected = false;
}

Player.prototype.update = function(dt){

    this.enemyCollision();

    if (this.y < 0){
        this.rePosition();
    }
    if (player.lives <= 0){
            this.game_over = true;
            reset();
        }

};

Player.prototype.render = function(){
    //console.log("yes,called render method for player")
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
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
    //console.log('yes,called rePosition method');
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
    for (var i = 0; i < allHeart.length; i++) {
        var collisionX = Math.abs(player.x - allHeart[i].x);
        var collisionY = Math.abs(player.y - allHeart[i].y);

        if(collisionX <= 40 && (collisionY > 90 && collisionY <= 105)){
                //console.log("yes!"+ allHeart[i] +" collided wid "+ "player")
                var heartPos = i;
                allHeart.splice(heartPos,1);
                player.score++ ;
                player.lives++ ;
        }
    }
};

//Gem CLASS AND ITS METHODS
var Gem = function(){
    this.sprite = 'images/Gem-Orange.png';
    this.x = 770;
    this.y = 480;
    this.width = 60;
    this.height = 60;
};

Gem.prototype.update = function(dt){
    this.gemCollision();

    //TODO -setinterval function for pounding of heart
};

Gem.prototype.render = function(){

    if (allHeart.length === 0){
            //console.log("now its zero length");
            ctx.drawImage(Resources.get(this.sprite),this.x, this.y,this.width,this.height);

        }
};

Gem.prototype.gemCollision = function(){
        var collisionX = Math.abs(player.x - gem.x);
        var collisionY = Math.abs(player.y - gem.y);

        if(collisionX < 40 && collisionY <=80 ){
                player.score++ ;
                player.isGemCollected = true;
                reset();

                //player.score = player.score + 50;
        }
};

// Cactus Enemies our player must avoid
var cactusEnemy = function(x,y) {
    this.sprite = 'images/cactus.png';
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
}

cactusEnemy.prototype.update = function(dt) {
    this.cactusCollision();

};

cactusEnemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.width,this.height);

}

cactusEnemy.prototype.cactusCollision = function(){
        for (var i = 0; i < allCactus.length; i++) {

            var collisionX = Math.abs(player.x - allCactus[i].x);
            var collisionY = Math.abs(player.y - allCactus[i].y);

            if(collisionX < 40 && (collisionY > 90 && collisionY <= 105)){
                //console.log("collided with cactus");
                player.score-- ;
                player.lives--;
                player.rePosition();


                //player.score = player.score + 50;
        }
    }
};




// Now instantiate your objects.



//gem object
var gem = new Gem();


// player object
var player = new Player();

//creating cactus object
//TODO - CREATE A LOOP FOR HEART INSTANCES

function initCactusArr() {
    var cactus0 = new cactusEnemy(15+95,115);
    var cactus1 = new cactusEnemy(15+95*3,115);
    var cactus2 = new cactusEnemy(15+95*5,115);
    var cactus3 = new cactusEnemy(15+95*7,115);
    var cactus4 = new cactusEnemy(15+95,(63*6)-15);
    var cactus5 = new cactusEnemy(15+95*3,(63*6)-15);
    var cactus6 = new cactusEnemy(15+95*5,(63*6)-15);
    var cactus7 = new cactusEnemy(15+95*7,(63*6)-15);
    //var arrayHeart
    //var numberOfHeart = 10;
    var cactusArry = [cactus0,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,cactus7];
    return cactusArry;
};

var allCactus = initCactusArr();


//creating heart object
//TODO - CREATE A LOOP FOR HEART INSTANCES

function initHeartArr() {
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
    //var arrayHeart
    //var numberOfHeart = 10;
    var heartArry = [heart,heart1,heart2,heart3,heart4,heart5,heart6,heart7,heart8,heart9];
    return heartArry;
};

var allHeart = initHeartArr();



// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var numberOfEnemies = 10;
var i=0;
while (i < 10){
    var startX_Bug = -500;
    startX_Bug = startX_Bug + 100;
    for (var i2 = 0; i2 < 2; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,100)
        i++;
    }
    startX_Bug = -400;
    for (var i2 = 2; i2 < 5; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,(100+63))
        i++
    }
    startX_Bug = -700;
    for (var i2 = 5; i2 < 8; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,(100+63+63))
        i++;
    }
    startX_Bug = 100;
    for (var i2 = 8; i2 < 10; i2++){
        allEnemies[i2] = new Enemy(startX_Bug,(100+63+63+63+63))
        i++;
    }

};


var checkForCollision = function(arrayOfObj,anotherObj) {
    for (var i = 0; i < arrayOfObj.length; i++) {
    var collisionX = Math.abs(anotherObj.x - arrayOfObj[i].x);
        var collisionY = Math.abs(anotherObj.y - arrayOfObj[i].y);
        if((collisionX < 40 && collisionY < 40)){
                //console.log("yes!"+ arrayOfObj[i] +" collided wid "+ "player")
                return isCollision = true;


        }
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
