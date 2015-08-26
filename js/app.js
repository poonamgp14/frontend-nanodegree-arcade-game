//TODO -  READ ABOUT IT!!!
"use strict";

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
    this.lives = 2;
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
        }
        if (allHeart.length === 0){
            //console.log("now its zero length");
            player.lives++;
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
                console.log("yes,collided with gem")
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

//cactus object
var allCactus = initCactus();

//heart object
var allHeart = initHeart();

//bugs object
var allEnemies = initEnemy();

//creating cactus enemy
function initCactus() {
    var cactusArr = [];
    var numberOfcactus = 8;
    var incrementArr = [95,95*3,95*5,95*7];
    spawnObjs(15,115,incrementArr,4,cactusEnemy,cactusArr);
    spawnObjs(15,363,incrementArr,4,cactusEnemy,cactusArr);

    if (cactusArr.length === numberOfcactus){
        return cactusArr;
    }
    else{
        console.log("Sorry, length of allCactus is not " + numberOfcactus );
    }
};


//creating heart object
function initHeart() {
    var heartArr = [];
    var numberOfHeart = 10;
    var incrementArr = [0,95*2,95*4,95*6,95*8];
    spawnObjs(15,115,incrementArr,5,Heart,heartArr);
    spawnObjs(15,363,incrementArr,5,Heart,heartArr);

    if (heartArr.length === numberOfHeart){
        return heartArr;
    }
    else{
        console.log("Sorry, length of allHeart is not " + numberOfHeart);
    }
};

//creating bugs enemey
function initEnemy(){
    var enemyArr = [];
    var numberOfEnemies = 10;
    spawnObjs(-500,100,100,2,Enemy,enemyArr);
    spawnObjs(-400,163,100,3,Enemy,enemyArr);
    spawnObjs(-700,226,100,3,Enemy,enemyArr);
    spawnObjs(100,350,100,2,Enemy,enemyArr);

    if (enemyArr.length === numberOfEnemies){
        return enemyArr;
    }
    else{
        console.log("Sorry, length of allEnemies is not " + numberOfEnemies);
    }
};

//creating objects
function spawnObjs(x,y,incrementByOrArr,numOfObj,className,resultingArr){
    for (var i = 0; i < numOfObj; i++){
        if(incrementByOrArr instanceof Array){
            var finalX = x + incrementByOrArr[i];
            resultingArr.push(new className(finalX,y));
        }
        else {
            var finalX = x + incrementByOrArr;
            resultingArr.push(new className(finalX,y));
        }
    }

};

//checks for collision
var checkForCollision = function(arrayOfObj,anotherObj) {
    for (var i = 0; i < arrayOfObj.length; i++) {
    var collisionX = Math.abs(anotherObj.x - arrayOfObj[i].x);
        var collisionY = Math.abs(anotherObj.y - arrayOfObj[i].y);
        if((collisionX < 40 && collisionY < 40)){
                return isCollision = true;
        }
    }
};

//event functions
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
