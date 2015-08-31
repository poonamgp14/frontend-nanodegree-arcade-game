"use strict";

/*SUPER CLASS / constructor for the Game Characters object
*The game has five characters- player, bug enemies,cactus enemy,
* heart and gem and all of them share same properties like x,y,
*width and height. The render method is also shared among all
*game characters except gem object. Gem has its own render method
*since gem appears only when all Hearts are collected by player
*/
var GameChar = function(x,y,w,h){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
};

GameChar.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,this.width,this.height);
};

/*SUB CLASS for player, bug enemies,cactus enemy,
* heart and gem with the shared methods and properties(shared with
*super class) and extra methods and properties
*/

/*Enemy sub-class invokes GameChar constructor using
* call method with passing 'this' as first argument. This first
*argument will set the reference to the current
*object(i.e Enemy Object). Invoking GameChar() without
*call() would set 'this' reference to GameChar objects
*To prevent this, GameChar() is invoke with call()
*/
var Enemy = function(x,y,w,h) {
    GameChar.call(this,x,y,60,80);
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * 250 + 1);
};

/*The below code would led the instances of enemy object
*delegate to GameChar constructor function for the properties
*not found in Enemy constructor function.
*Here, Enemy.Prototype is being created as a brand new object
(that is overwritten) which delegates to GameChar.prototype
*for failed lookups or shared properties!
*/
Enemy.prototype = Object.create(GameChar.prototype);

//Reset the constructor of enemy instances from GameChar to Enemy
Enemy.prototype.constructor = Enemy;

/*
*
*Unique methods for enemy instances
*
*/
Enemy.prototype.update = function(dt) {
    /*dt parameter ensure the game runs at the same speed for
    all computers.*/

    this.x += dt * this.speed;
    if(this.x > 905) {
        this.x = Math.random() * - 1000;
    }
};

/*PLAYER CLASS AND ITS METHODS
*Player sub-class invokes GameChar constructor using
* call method with passing 'this' as first argument.
*/
var Player = function(){
    GameChar.call(this,420,400,40,60);
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lives = 2;
    this.game_over = false;
    this.isGemCollected = false;
};

//shared properties between GameChar and Player function
//and let the Player.prototype to delegate to GameChar.prototype
Player.prototype = Object.create(GameChar.prototype);

//Reset the constructor of player instances from GameChar to Player
Player.prototype.constructor = Player;

/*
*
*Unique methods for player instances
*
*/
Player.prototype.update = function(dt){

    this.bugCollision();

    if(this.y < 0){
        this.rePosition();
    }
    if(this.lives <= 0){
        this.game_over = true;
        player.rePosition();
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = 'white';
    ctx.font = '33px serif';
    ctx.fillText('Score: ' + this.score, 0, 40);
    ctx.fillText('Lives: ' + this.lives, 400, 40);
};

Player.prototype.handleInput = function(direction){
    if (direction === 'up' && this.y > 5){
        this.y -= 65;
    }
    if (direction === 'down' && this.y < 385){
        this.y += 65;
    }
    if (direction === 'left' && this.x > 50){
        this.x -= 50;
    }
    if (direction === 'right' && this.x < 750){
        this.x += 50;
    }
};

Player.prototype.bugCollision = function(){
    var len = allEnemies.length;
    for (var i = 0; i < len ; i++) {
        var collisionX = Math.abs(player.x - allEnemies[i].x);
        var collisionY = Math.abs(player.y - allEnemies[i].y);
        if(collisionX < 20 && (collisionY > 70 && collisionY <= 81)){
            this.score-- ;
            this.lives-- ;
            this.rePosition();
        }
    }
};

Player.prototype.rePosition = function(){
    this.x = 420;
    this.y = 400;
    //this resets when number of lives of player is zero
    //and shows the game-over CSS properties which has
    //restart menu
    if (player.game_over){
        $('#game-over').show();
        player.game_over = false;
    }
    //this resets when gem is collected
    //and shows the gem-collected CSS properties which has
    //restart menu
    if (player.isGemCollected){
        $('#gem-collected').show();
        player.isGemCollected = false;
    }
};

//defines the properties of player again on restarting the game
Player.prototype.startAgain= function(){
    player.lives = 2;
    player.score = 0;
    player.render();
};

/*when a player wants to play again after losing all the lives.
*Playing again hides the #game-over CSS properties and
*resets the player properties and fill in all the hearts
*by invoking initheart()
*/
$('.restart').click(function() {
    $('#game-over').hide();
    allHeart = initHeart();
    player.startAgain();
});

/*when a player wants to play again
*after winning the game(gem collection).
*Playing again hides the #gem-collected CSS properties and
*resets the player properties and fill in all the hearts
*by invoking initheart()
*/
$('.play-again').click(function() {
    $('#gem-collected').hide();
    allHeart = initHeart();
    player.startAgain();
});

/*HEART CLASS AND ITS METHODS
*heart sub-class invokes GameChar constructor using
* call method with passing 'this' as first argument.
*/
var Heart = function(x,y){
    GameChar.call(this,x,y,60,60);
    this.sprite = 'images/Heart.png';
};

//shared properties between GameChar and Heart function
//and let the Heart.prototype to delegate to GameChar.prototype
Heart.prototype = Object.create(GameChar.prototype);


//Reset the constructor of player instances from GameChar to Player
Heart.prototype.constructor = Heart;

/*
*
*Unique methods for heart instances
*
*/
Heart.prototype.update = function(dt){
    this.heartCollision();
    //TODO -setinterval function for pounding of heart
};

Heart.prototype.heartCollision = function(){
    var len = allHeart.length;
    for (var i = 0; i < len; i++) {
        var collisionX = Math.abs(player.x - allHeart[i].x);
        var collisionY = Math.abs(player.y - allHeart[i].y);

        if(collisionX <= 40 && (collisionY > 90 && collisionY <=105)){
            len-- ;
            var heartPos = i;
            allHeart.splice(heartPos,1);
            player.score++ ;
        }
        if(allHeart.length === 0){
            player.lives++;
        }
    }
};

/*GEM CLASS AND ITS METHODS
*heart sub-class invokes GameChar constructor using
* call method with passing 'this' as first argument.
*/
var Gem = function(){
    GameChar.call(this,770,480,60,60);
    this.sprite = 'images/Gem-Orange.png';
    this.gemRendered = false;
};

//shared properties between GameChar and Player function
//and let the Player.prototype to delegate to GameChar.prototype
Gem.prototype = Object.create(GameChar.prototype);

//Reset the constructor of player instances from GameChar to Player
Gem.prototype.constructor = Gem;

/*
*
*Unique methods for gem instances
*
*/
Gem.prototype.update = function(dt){
    this.gemCollision();

    //TODO:-setinterval function for pounding of heart
};

//gem has its own render methods and thus would not
//delegate to GameChar.prototype for render method
Gem.prototype.render = function(){

    if (allHeart.length === 0){
        ctx.drawImage(Resources.get(this.sprite),this.x, this.y,this.width,this.height);
        this.gemRendered = true;
    }
};

Gem.prototype.gemCollision = function(){
    if(this.gemRendered){
        var collisionX = Math.abs(player.x - gem.x);
        var collisionY = Math.abs(player.y - gem.y);

        if(collisionX < 40 && collisionY <=80 ){
            this.gemRendered = false;
            player.score++ ;
            player.isGemCollected = true;
            player.rePosition();
        }
    }
};

/*Cactus Enemies our player must avoid
* cactusEnemy sub-class invokes GameChar constructor using
* call method with passing 'this' as first argument.
*/
var cactusEnemy = function(x,y) {
    GameChar.call(this,x,y,60,60);
    this.sprite = 'images/cactus.png';
};
//shared properties between GameChar and cactusEnemy function
//and let the cactusEnemy.prototype to delegate to GameChar.prototype
cactusEnemy.prototype = Object.create(GameChar.prototype);

//Reset the constructor of player instances from GameChar to cactusEnemy
cactusEnemy.prototype.constructor = cactusEnemy;

/*
*
*Unique methods for cactusEnemy instances
*
*/

cactusEnemy.prototype.update = function(dt) {
    this.cactusCollision();
};

cactusEnemy.prototype.cactusCollision = function(){
    var len = allCactus.length;
    for (var i = 0; i < len; i++) {

        var collisionX = Math.abs(player.x - allCactus[i].x);
        var collisionY = Math.abs(player.y - allCactus[i].y);

        if(collisionX < 40 && (collisionY > 90 && collisionY <= 105)){
            player.score-- ;
            player.lives--;
            player.rePosition();
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

//creating cactus enemy by invoking spawnobjs() defined below
function initCactus() {
    var cactusArr = [];
    var numberOfcactus = 8;

    //position of cactus on second,fourth,sixth, eigth column
    var incrementArr = [95,95*3,95*5,95*7];

    //places 4 cactus on 2nd row
    spawnObjs(15,115,incrementArr,4,cactusEnemy,cactusArr);

    //places 4 cactus on 6th row
    spawnObjs(15,363,incrementArr,4,cactusEnemy,cactusArr);

    if (cactusArr.length === numberOfcactus){
        return cactusArr;
    }
    else{
        console.log('Sorry, length of allCactus is not ' + numberOfcactus );
    }
}


//creating heart object by invoking spawnobjs() defined below
function initHeart() {
    var heartArr = [];
    var numberOfHeart = 10;

    //position of heart on first,third, fifth, seventh,9th column
    var incrementArr = [0,95*2,95*4,95*6,95*8];


    // five hearts on 2nd row
    spawnObjs(15,115,incrementArr,5,Heart,heartArr);

    //five hearts on 6th row
    spawnObjs(15,363,incrementArr,5,Heart,heartArr);

    if (heartArr.length === numberOfHeart){
        return heartArr;
    }
    else{
        console.log('Sorry, length of allHeart is not ' + numberOfHeart);
    }
}

//creating bugs enemey by invoking spawnobjs() defined below
function initEnemy(){
    var enemyArr = [];
    var numberOfEnemies = 10;
    //bugs on 3rd row(height of each row is 63)
    spawnObjs(-500,(30+63*2),100,2,Enemy,enemyArr);

    //bugs on 4th row
    spawnObjs(-400,(30+63*3),100,3,Enemy,enemyArr);

    //bugs on 5th row
    spawnObjs(-700,(30+63*4),100,3,Enemy,enemyArr);

    //bugs on 7th row
    spawnObjs(100,(30+63*6),100,2,Enemy,enemyArr);
    //return enemyArr;
    if (enemyArr.length === numberOfEnemies){
        return enemyArr;
    }
    else{
        console.log('Sorry, length of allEnemies is not ' + numberOfEnemies);
    }
}

/*This functions creates instances of any object and parameter are
* x and y coridinate for the instances and name of the class for which
* to create instances and OUTPUT is an array of instances of that object
*incrementByOrArr takes array or number which you want to
*increment for x cordinates.
*In my game, I have places heart and cactus at every alternative
*tile in canvas. Thus, incremented with muliples of 95
*(width and heigth of each tile on canvas is 95,63 taken from
*render()in engine.js).And, bugs are increments by 100
*/
function spawnObjs(x,y,incrementByOrArr,numOfObj,className,resultingArr){
    for (var i = 0; i < numOfObj; i++){
        //if x value is incremented by elements defined in array
        if(incrementByOrArr instanceof Array){
            var finalX = x + incrementByOrArr[i];
            resultingArr.push(new className(finalX,y));
        }
        //if x value is incremented by a single number
        else{
            var finalX = x + incrementByOrArr;
            resultingArr.push(new className(finalX,y));
        }
    }

}

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